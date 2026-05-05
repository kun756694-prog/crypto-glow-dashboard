import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders as baseCorsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

const corsHeaders = {
  ...baseCorsHeaders,
  "Access-Control-Allow-Headers": (baseCorsHeaders["Access-Control-Allow-Headers"] || "") + ", x-admin-secret",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Simple secret-based auth for admin
  const adminSecret = Deno.env.get("ADMIN_SECRET");
  const providedSecret = req.headers.get("x-admin-secret");

  if (!adminSecret || !providedSecret || providedSecret !== adminSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    // Default GET: list all data
    if (req.method === "GET") {
      const [surveyRes, withdrawRes] = await Promise.all([
        supabase.from("survey_results").select("*").order("created_at", { ascending: false }),
        supabase.from("withdrawals").select("*").order("created_at", { ascending: false }),
      ]);

      return new Response(JSON.stringify({
        surveys: surveyRes.data || [],
        withdrawals: withdrawRes.data || [],
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST" && action === "mark-paid") {
      const { id } = await req.json();
      if (!id || typeof id !== "string" || id.length > 50) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID format" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase
        .from("withdrawals")
        .update({ status: "completed" })
        .eq("id", id);

      if (error) {
        return new Response(JSON.stringify({ error: "Failed to update" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Admin error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
