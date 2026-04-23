import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

const CURRENCIES = ["USD", "MMK", "EUR", "THB", "SGD"] as const;
type Currency = (typeof CURRENCIES)[number];

interface RatesPayload {
  base: Currency;
  rates: Record<string, number>;
  fetchedAt: number;
}

const ENDPOINT = (base: string) => `https://open.er-api.com/v6/latest/${base}`;
const CACHE_MS = 5 * 60_000;

export const CurrencyConverter = () => {
  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("MMK");
  const [amount, setAmount] = useState<string>("1");
  const [data, setData] = useState<RatesPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (data && data.base === from && Date.now() - data.fetchedAt < CACHE_MS) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(ENDPOINT(from));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        setData({ base: from, rates: json.rates ?? {}, fetchedAt: Date.now() });
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load rates");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [from, data]);

  const converted = useMemo(() => {
    if (!data) return null;
    const rate = data.rates[to];
    const amt = parseFloat(amount);
    if (!rate || isNaN(amt)) return null;
    return amt * rate;
  }, [amount, data, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-base">Multi-Currency Converter</h3>
          <p className="text-xs text-muted-foreground">USD · MMK · EUR · THB · SGD</p>
        </div>
        {loading && <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">From</label>
          <div className="mt-1 flex gap-2">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value as Currency)}
              className="h-10 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Input
              type="number"
              inputMode="decimal"
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
              className="tabular-nums"
            />
          </div>
        </div>

        <button
          onClick={swap}
          aria-label="Swap currencies"
          className="h-10 w-10 mx-auto rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4 text-primary" />
        </button>

        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">To</label>
          <div className="mt-1 flex gap-2">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value as Currency)}
              className="h-10 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex-1 h-10 rounded-md border border-input bg-muted/30 px-3 flex items-center text-sm tabular-nums font-semibold">
              {converted !== null
                ? converted.toLocaleString("en-US", { maximumFractionDigits: 4 })
                : "—"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>
          1 {from} ={" "}
          <span className="text-foreground font-medium tabular-nums">
            {data?.rates?.[to]?.toLocaleString("en-US", { maximumFractionDigits: 6 }) ?? "—"}
          </span>{" "}
          {to}
        </span>
        <span>exchangerate-api.com</span>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      <p className="mt-3 text-[11px] text-muted-foreground/90 italic border-t border-border/50 pt-2">
        Reference rates only — not for live trading execution.
      </p>
    </div>
  );
};
