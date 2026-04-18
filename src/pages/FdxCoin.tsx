import { useEffect, useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { FdxLogo } from "@/components/fdx/FdxLogo";
import { OrderBook } from "@/components/fdx/OrderBook";
import { Tokenomics } from "@/components/fdx/Tokenomics";
import { Roadmap } from "@/components/fdx/Roadmap";
import { StakingSection } from "@/components/fdx/StakingSection";
import { BuyDialog } from "@/components/fdx/BuyDialog";

const BASE_PRICE = 0.05;
const CHANGE_24H = 12;

const FdxCoin = () => {
  const [price, setPrice] = useState(BASE_PRICE);

  // Simulate tiny live fluctuation
  useEffect(() => {
    const id = setInterval(() => {
      const drift = (Math.random() - 0.5) * 0.0004;
      setPrice((p) => Math.max(0.001, +(BASE_PRICE + drift).toFixed(6)));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Market Cap", value: "$50.0M" },
      { label: "24h Volume", value: "$8.4M" },
      { label: "Circulating", value: "1.0B FDX" },
      { label: "ATH", value: "$0.062" },
    ],
    [],
  );

  return (
    <div className="min-h-screen fdx-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-fdx-gold/40 flex items-center justify-center bg-fdx-black/60">
              <span className="text-fdx-gold font-black text-sm">FDX</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                FDX <span className="text-fdx-gold">Coin</span>
              </h1>
              <p className="text-xs text-muted-foreground">The future of luxury digital assets</p>
            </div>
          </div>
          <MainNav />
        </header>

        {/* Hero */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FdxLogo size={220} />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
            <span className="bg-gradient-fdx bg-clip-text text-transparent">FDX Coin</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            A premium-grade utility token engineered for staking, governance, and the next era of decentralized finance.
          </p>

          {/* Price */}
          <div className="inline-flex flex-col items-center gap-2 mb-6">
            <div className="text-6xl sm:text-7xl font-black font-mono tabular-nums">
              <span className="bg-gradient-fdx bg-clip-text text-transparent">${price.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 text-success text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              +{CHANGE_24H.toFixed(2)}% (24h)
            </div>
          </div>

          <div className="flex justify-center">
            <BuyDialog price={price} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10">
            {stats.map((s) => (
              <div key={s.label} className="fdx-card p-4 text-center">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-base font-bold text-fdx-gold mt-1">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Order book + Staking */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          <OrderBook price={price} />
          <StakingSection price={price} />
        </section>

        {/* Tokenomics */}
        <section className="mb-8">
          <Tokenomics />
        </section>

        {/* Roadmap */}
        <section className="mb-12">
          <Roadmap />
        </section>

        {/* Footer */}
        <footer className="text-center pb-6">
          <p className="text-[11px] text-muted-foreground max-w-md mx-auto">
            FDX Coin is a demonstration token. Figures shown are simulated for preview purposes only — not financial
            advice.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default FdxCoin;
