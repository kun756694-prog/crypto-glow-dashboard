import { useState } from "react";
import { Lock, TrendingUp } from "lucide-react";

const tiers = [
  { days: 30, apy: 8, label: "Flexible" },
  { days: 90, apy: 14, label: "Growth" },
  { days: 180, apy: 22, label: "Premium" },
  { days: 365, apy: 35, label: "Diamond" },
];

export const StakingSection = ({ price }: { price: number }) => {
  const [amount, setAmount] = useState(10000);
  const [tierIdx, setTierIdx] = useState(2);
  const tier = tiers[tierIdx];

  const yearly = amount * (tier.apy / 100);
  const periodReward = (yearly * tier.days) / 365;
  const usdValue = periodReward * price;

  return (
    <div className="fdx-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <Lock className="w-4 h-4 text-fdx-gold" />
        <h3 className="text-sm font-semibold tracking-wide text-fdx-gold">STAKING</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {tiers.map((t, i) => (
          <button
            key={t.days}
            onClick={() => setTierIdx(i)}
            className={`p-3 rounded-lg border text-left transition-all ${
              tierIdx === i
                ? "border-fdx-gold bg-fdx-gold/10 shadow-[0_0_20px_hsl(var(--fdx-gold)/0.2)]"
                : "border-fdx-gold/15 hover:border-fdx-gold/40"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.label}</div>
            <div className="text-lg font-bold text-fdx-gold">{t.apy}%</div>
            <div className="text-[10px] text-muted-foreground">{t.days} days APY</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Stake amount (FDX)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full bg-fdx-black/60 border border-fdx-gold/20 rounded-lg px-3 py-2 text-base font-mono text-foreground focus:outline-none focus:border-fdx-gold/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-fdx-black/40 border border-fdx-gold/15">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Period reward</div>
            <div className="text-lg font-bold text-fdx-gold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {periodReward.toFixed(2)} FDX
            </div>
          </div>
          <div className="p-3 rounded-lg bg-fdx-black/40 border border-fdx-gold/15">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">USD value</div>
            <div className="text-lg font-bold text-foreground">${usdValue.toFixed(2)}</div>
          </div>
        </div>

        <button className="w-full py-3 rounded-lg bg-gradient-fdx text-fdx-black font-bold text-sm shadow-[0_0_25px_hsl(var(--fdx-gold)/0.4)] hover:scale-[1.01] active:scale-[0.99] transition-transform">
          Stake FDX Now
        </button>
      </div>
    </div>
  );
};
