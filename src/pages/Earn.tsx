import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MainNav } from "@/components/MainNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteFooter } from "@/components/SiteFooter";
import { TradingViewChart } from "@/components/toolbox/TradingViewChart";
import { Gift, Star, Sparkles } from "lucide-react";

/* ── localStorage helpers ── */
const POINTS_KEY = "earn_total_points";
const CLICKS_KEY = "earn_daily_clicks";

interface DailyClicks {
  date: string; // YYYY-MM-DD
  counts: Record<string, number>;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyClicks(): DailyClicks {
  try {
    const raw = localStorage.getItem(CLICKS_KEY);
    if (raw) {
      const parsed: DailyClicks = JSON.parse(raw);
      if (parsed.date === todayStr()) return parsed;
    }
  } catch {}
  return { date: todayStr(), counts: {} };
}

function saveDailyClicks(dc: DailyClicks) {
  localStorage.setItem(CLICKS_KEY, JSON.stringify(dc));
}

function getSavedPoints(): number {
  try {
    return parseInt(localStorage.getItem(POINTS_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function savePoints(p: number) {
  localStorage.setItem(POINTS_KEY, String(p));
}

/* ── Reward button config ── */
const REWARD_BUTTONS = [
  {
    id: "daily-bonus",
    label: "Claim Daily Bonus",
    url: "https://www.profitablecpmratenetwork.com/ziadeax47?key=280244817897c83ce7c6542678cc971d",
    points: 5,
    icon: Gift,
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]",
  },
  {
    id: "premium-reward",
    label: "Premium Reward",
    url: "https://omg10.com/4/10958497",
    points: 10,
    icon: Star,
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.4)]",
  },
  {
    id: "surprise-gift",
    label: "Surprise Gift",
    url: "https://omg10.com/4/10958858",
    points: 10,
    icon: Sparkles,
    gradient: "from-cyan-400 to-blue-600",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.4)]",
  },
];

const MAX_CLICKS_PER_DAY = 3;

/* ── Main page ── */
const Earn = () => {
  const [surveyLoaded, setSurveyLoaded] = useState(false);
  const [points, setPoints] = useState(getSavedPoints);
  const [dailyClicks, setDailyClicks] = useState<DailyClicks>(getDailyClicks);

  // Also fetch server-side points for display (use higher of local vs server)
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-points", {
          method: "GET",
        });
        if (!error && data && typeof data.total === "number") {
          setPoints((prev) => {
            const best = Math.max(prev, data.total);
            savePoints(best);
            return best;
          });
        }
      } catch (e) {
        console.error("Failed to fetch points:", e);
      }
    };
    fetchPoints();
  }, []);

  const handleRewardClick = useCallback(
    (id: string, url: string, rewardPoints: number) => {
      const dc = getDailyClicks();
      const used = dc.counts[id] ?? 0;

      if (used >= MAX_CLICKS_PER_DAY) {
        toast.info("Limit reached. Come back tomorrow!");
        return;
      }

      // Open link
      window.open(url, "_blank", "noopener,noreferrer");

      // Update clicks
      dc.counts[id] = used + 1;
      saveDailyClicks(dc);
      setDailyClicks({ ...dc });

      // Update points
      const newPoints = points + rewardPoints;
      savePoints(newPoints);
      setPoints(newPoints);

      toast.success(`+${rewardPoints} points earned! 🎉`);
    },
    [points],
  );

  const getClicksUsed = (id: string) => dailyClicks.counts[id] ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">
          Earn Rewards
        </h1>

        {/* Point Balance */}
        <div className="glass-card p-6 mb-8 text-center max-w-md mx-auto">
          <p className="text-sm text-muted-foreground mb-1">Your Point Balance</p>
          <p className="text-4xl font-bold text-primary">
            {points.toLocaleString()}
          </p>
        </div>

        {/* Reward Buttons */}
        <section className="mb-12 max-w-lg mx-auto grid gap-5">
          {REWARD_BUTTONS.map((btn) => {
            const used = getClicksUsed(btn.id);
            const limitReached = used >= MAX_CLICKS_PER_DAY;
            const Icon = btn.icon;

            return (
              <button
                key={btn.id}
                disabled={limitReached}
                onClick={() => handleRewardClick(btn.id, btn.url, btn.points)}
                className={`relative w-full rounded-xl p-5 text-white font-semibold text-lg transition-all duration-300
                  bg-gradient-to-r ${btn.gradient} ${btn.glow}
                  hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100
                  flex items-center gap-4`}
              >
                <div className="rounded-full bg-white/20 p-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <span className="block">{btn.label}</span>
                  <span className="text-xs font-normal opacity-80">
                    {limitReached
                      ? "Limit Reached. Come back tomorrow!"
                      : `+${btn.points} pts · ${MAX_CLICKS_PER_DAY - used} left today`}
                  </span>
                </div>
              </button>
            );
          })}
        </section>

        {/* CPX Research Survey Wall */}
        <section className="mb-12 glass-card p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Complete Surveys &amp; Earn
          </h2>

          {!surveyLoaded && (
            <div className="flex items-center justify-center py-16 text-muted-foreground animate-pulse">
              Loading Surveys...
            </div>
          )}

          <iframe
            src="https://offers.cpx-research.com/index.php?app_id=32780&ext_user_id=founder_hein&username=heinlay"
            title="CPX Research Surveys"
            width="100%"
            height="1500px"
            frameBorder="0"
            className={`w-full rounded-lg ${surveyLoaded ? "" : "hidden"}`}
            onLoad={() => setSurveyLoaded(true)}
          />
        </section>

        {/* Withdraw Rewards */}
        <WithdrawRewards />

        {/* Live Exchange Rates */}
        <div className="mb-12 glass-card p-4">
          <h2 className="text-xl font-semibold mb-6 text-primary">
            18+ Countries Live Exchange Rates
          </h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=1,2,3,4,5,7,8,9,10,11,12,13,650,2111,2114,2138,44321,10125"
              width="100%"
              height="500"
              frameBorder="0"
              className="w-full"
              title="Live Currency Cross Rates"
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Includes: MYR (Malaysia), MMK (Myanmar), THB, SGD, CNY, and more.
          </p>
        </div>

        {/* TradingView Chart */}
        <div className="glass-card p-4 mb-12">
          <h2 className="text-xl font-semibold mb-4 text-primary font-mono">
            XAU / USD - Gold Spot
          </h2>
          <TradingViewChart
            symbol="OANDA:XAUUSD"
            title="XAU/USD"
            containerId="tv-xauusd"
            height={450}
          />
        </div>

        {/* Roadmap */}
        <section className="glass-card p-6 mb-10">
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            Project Roadmap
          </h2>
          <div className="space-y-4">
            <div className="p-3 border-b border-border text-muted-foreground">
              <span className="text-green-500 font-bold">Phase 1:</span> Launch
              Community Tools (Live)
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary text-foreground">
              <span className="text-primary font-bold">Phase 2:</span> Early
              Registration &amp; Airdrops (Active)
            </div>
            <div className="p-3 text-muted-foreground">
              <span className="font-bold">Phase 3:</span> Token Private Sale
              (Coming Soon)
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

const WithdrawRewards = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [points, setPoints] = useState("");
  const [network, setNetwork] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter your wallet address.");
      return;
    }
    const pts = parseInt(points, 10);
    if (isNaN(pts) || pts < 5000) {
      toast.error("Minimum 5,000 points required to redeem.");
      return;
    }
    if (!network) {
      toast.error("Please select a network.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-withdrawal", {
        body: {
          wallet_address: walletAddress.trim(),
          points: pts,
          network,
        },
      });

      if (error) {
        toast.error("Something went wrong. Please try again.");
        console.error("Withdrawal error:", error);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Request sent! We will process your payment to your wallet within 24 hours.");
      setWalletAddress("");
      setPoints("");
      setNetwork("");
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      console.error("Withdrawal error:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mb-12 glass-card p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-6 text-primary">
        💰 Withdraw Rewards
      </h2>
      <div className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Wallet Address
          </label>
          <Input
            placeholder="Enter your BTC or SOL wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
            maxLength={100}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Points to Redeem <span className="text-xs">(Min: 5,000)</span>
          </label>
          <Input
            type="number"
            placeholder="5000"
            min={5000}
            max={1000000}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Network
          </label>
          <Select value={network} onValueChange={setNetwork}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bitcoin-mainnet">Bitcoin (Mainnet)</SelectItem>
              <SelectItem value="solana-sobtc">Solana (soBTC)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {submitting ? "Submitting..." : "Submit Withdrawal"}
        </Button>
      </div>
    </section>
  );
};

export default Earn;
