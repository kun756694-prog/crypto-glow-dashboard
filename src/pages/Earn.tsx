import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MainNav } from "@/components/MainNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteFooter } from "@/components/SiteFooter";
import { TradingViewChart } from "@/components/toolbox/TradingViewChart";

const Earn = () => {
  const [surveyLoaded, setSurveyLoaded] = useState(false);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      const { data, error } = await supabase
        .from("survey_results")
        .select("points");
      if (!error && data) {
        setTotalPoints(data.reduce((sum, r) => sum + r.points, 0));
      }
    };
    fetchPoints();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Earn Rewards
        </h1>

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

  const handleSubmit = async () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter your Bitcoin wallet address.");
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

    const { error } = await supabase.from("survey_results").insert({
      wallet_address: walletAddress.trim(),
      points: pts,
      network,
    });

    if (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Insert error:", error);
      return;
    }

    toast.success("Request sent! We will process your Bitcoin payment to your wallet within 24 hours.");
    setWalletAddress("");
    setPoints("");
    setNetwork("");
  };

  return (
    <section className="mb-12 glass-card p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-6 text-primary">
        💰 Withdraw Rewards
      </h2>
      <div className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Bitcoin Wallet Address
          </label>
          <Input
            placeholder="Enter your BTC wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-background/50 border-primary/30 focus:border-primary"
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
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Submit Withdrawal
        </Button>
      </div>
    </section>
  );
};

export default Earn;
