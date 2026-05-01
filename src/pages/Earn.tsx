import { useState } from "react";
import { toast } from "sonner";
import { MainNav } from "@/components/MainNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteFooter } from "@/components/SiteFooter";
import { TradingViewChart } from "@/components/toolbox/TradingViewChart";

const Earn = () => {
  const [surveyLoaded, setSurveyLoaded] = useState(false);

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
            src="https://offers.cpx-research.com/index.php?app_id=32780&ext_user_id=founder_hein&username=heinlay&email=heinlay010002@gmail.com"
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

export default Earn;
