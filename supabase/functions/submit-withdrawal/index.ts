import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

const NETWORK_VALUES = ["bitcoin-mainnet", "solana-sobtc"];
const MIN_POINTS = 5000;
const MAX_POINTS = 1_000_000;
const WALLET_REGEX: Record<string, RegExp> = {
  "bitcoin-mainnet": /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,62}$/,
  "solana-sobtc": /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { wallet_address, points, network } = body;

    // Validate network
    if (!network || !NETWORK_VALUES.includes(network)) {
      return new Response(JSON.stringify({ error: "Invalid network. Must be bitcoin-mainnet or solana-sobtc." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate points
    const pts = typeof points === "number" ? points : parseInt(points, 10);
    if (isNaN(pts) || pts < MIN_POINTS || pts > MAX_POINTS || !Number.isInteger(pts)) {
      return new Response(JSON.stringify({ error: `Points must be an integer between ${MIN_POINTS} and ${MAX_POINTS}.` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate wallet address
    const addr = typeof wallet_address === "string" ? wallet_address.trim() : "";
    if (!addr || addr.length > 100 || !WALLET_REGEX[network].test(addr)) {
      return new Response(JSON.stringify({ error: "Invalid wallet address for the selected network." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role to insert (RLS blocks anon SELECT but allows INSERT)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Atomic balance check + insert via DB function
    const { data, error } = await supabase.rpc("atomic_withdraw", {
      p_wallet_address: addr,
      p_points: pts,
      p_network: network,
    });

    if (error) {
      console.error("RPC error:", error);
      return new Response(JSON.stringify({ error: "Failed to submit withdrawal request." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!data?.success) {
      return new Response(JSON.stringify({ error: data?.error || "Withdrawal failed." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
