import { Check, Circle, Rocket } from "lucide-react";

const phases = [
  {
    quarter: "Q1 2026",
    title: "Genesis Launch",
    items: ["Token deployment on chain", "Initial DEX offering", "Community launch & airdrop"],
    status: "done" as const,
  },
  {
    quarter: "Q2 2026",
    title: "Ecosystem Expansion",
    items: ["Staking platform v1", "Tier-1 CEX listings", "Strategic partnerships"],
    status: "active" as const,
  },
  {
    quarter: "Q3 2026",
    title: "Utility Rollout",
    items: ["FDX Wallet beta", "NFT marketplace integration", "Cross-chain bridge"],
    status: "upcoming" as const,
  },
  {
    quarter: "Q4 2026",
    title: "Global Adoption",
    items: ["Merchant payment gateway", "DAO governance launch", "Mobile super-app"],
    status: "upcoming" as const,
  },
];

export const Roadmap = () => {
  return (
    <div className="fdx-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <Rocket className="w-4 h-4 text-fdx-gold" />
        <h3 className="text-sm font-semibold tracking-wide text-fdx-gold">ROADMAP 2026</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((p) => {
          const isDone = p.status === "done";
          const isActive = p.status === "active";
          return (
            <div
              key={p.quarter}
              className={`relative rounded-xl p-4 border ${
                isActive
                  ? "border-fdx-gold/50 bg-fdx-gold/5 shadow-[0_0_25px_hsl(var(--fdx-gold)/0.15)]"
                  : "border-fdx-gold/15 bg-fdx-black/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {p.quarter}
                </span>
                {isDone ? (
                  <span className="flex items-center gap-1 text-[10px] text-success">
                    <Check className="w-3 h-3" />
                    Done
                  </span>
                ) : isActive ? (
                  <span className="flex items-center gap-1 text-[10px] text-fdx-gold">
                    <span className="w-1.5 h-1.5 rounded-full bg-fdx-gold animate-pulse" />
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Soon</span>
                )}
              </div>
              <h4 className="text-base font-bold text-foreground mb-3">{p.title}</h4>
              <ul className="space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-foreground/80">
                    <Circle className="w-2 h-2 mt-1 shrink-0 fill-fdx-gold text-fdx-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
