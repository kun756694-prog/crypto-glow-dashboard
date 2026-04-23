import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";

type PairType = "forex_major" | "jpy_pair" | "xauusd";

const PIP_VALUE_PER_LOT: Record<PairType, number> = {
  // USD-quoted standard lot pip values (approx, USD per pip per 1.0 lot)
  forex_major: 10, // EUR/USD, GBP/USD, etc.
  jpy_pair: 9.3, // ~ varies, common reference
  xauusd: 10, // 1 pip = $0.10, 1 lot = 100oz → $10/pip (with pip = 0.1)
};

export const LotSizeCalculator = () => {
  const [balance, setBalance] = useState<string>("10000");
  const [riskPct, setRiskPct] = useState<string>("1");
  const [stopPips, setStopPips] = useState<string>("20");
  const [pair, setPair] = useState<PairType>("forex_major");

  const result = useMemo(() => {
    const bal = parseFloat(balance);
    const risk = parseFloat(riskPct);
    const sl = parseFloat(stopPips);
    if ([bal, risk, sl].some((n) => isNaN(n) || n <= 0)) return null;
    const riskUsd = bal * (risk / 100);
    const pipValue = PIP_VALUE_PER_LOT[pair];
    const lots = riskUsd / (sl * pipValue);
    return {
      riskUsd,
      lots,
      microLots: lots * 100,
      units: lots * 100_000,
    };
  }, [balance, riskPct, stopPips, pair]);

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-base">Lot Size Calculator</h3>
          <p className="text-xs text-muted-foreground">Risk-based position sizing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Account Balance (USD)
          </label>
          <Input
            type="number"
            inputMode="decimal"
            value={balance}
            min={0}
            onChange={(e) => setBalance(e.target.value)}
            className="mt-1 tabular-nums"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Risk %
          </label>
          <Input
            type="number"
            inputMode="decimal"
            value={riskPct}
            min={0}
            step={0.1}
            onChange={(e) => setRiskPct(e.target.value)}
            className="mt-1 tabular-nums"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Stop Loss (pips)
          </label>
          <Input
            type="number"
            inputMode="decimal"
            value={stopPips}
            min={0}
            onChange={(e) => setStopPips(e.target.value)}
            className="mt-1 tabular-nums"
          />
        </div>
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">
            Instrument
          </label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value as PairType)}
            className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="forex_major">Forex Major (EUR/USD, GBP/USD…)</option>
            <option value="jpy_pair">JPY Pair (USD/JPY…)</option>
            <option value="xauusd">XAU/USD (Gold)</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Risk Amount" value={result ? `$${result.riskUsd.toFixed(2)}` : "—"} />
        <Stat
          label="Lot Size"
          value={result ? result.lots.toFixed(3) : "—"}
          highlight
        />
        <Stat label="Mini / Micro" value={result ? `${result.microLots.toFixed(1)} micro` : "—"} />
        <Stat
          label="Units"
          value={result ? result.units.toLocaleString("en-US", { maximumFractionDigits: 0 }) : "—"}
        />
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground/90 italic border-t border-border/50 pt-2">
        Pip values use standard USD-account approximations. Always verify with your broker before trading.
      </p>
    </div>
  );
};

const Stat = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className={`rounded-lg p-3 border ${highlight ? "border-primary/40 bg-primary/10" : "border-border bg-muted/20"}`}>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`mt-1 text-sm font-bold tabular-nums ${highlight ? "text-primary" : ""}`}>
      {value}
    </p>
  </div>
);
