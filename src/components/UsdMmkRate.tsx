import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, DollarSign, RefreshCw } from "lucide-react";

interface RateState {
  rate: number | null;
  prev: number | null;
  updated: Date | null;
  loading: boolean;
  error: string | null;
}

const ENDPOINT = "https://open.er-api.com/v6/latest/USD";
const REFRESH_MS = 5 * 60_000;

export const UsdMmkRate = () => {
  const [state, setState] = useState<RateState>({
    rate: null,
    prev: null,
    updated: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const mmk = data?.rates?.MMK;
        if (typeof mmk !== "number") throw new Error("MMK rate unavailable");
        if (cancelled) return;
        setState((prev) => ({
          rate: mmk,
          prev: prev.rate,
          updated: new Date(),
          loading: false,
          error: null,
        }));
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Failed to load rate";
        setState((prev) => ({ ...prev, loading: false, error: msg }));
      }
    };

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const { rate, prev, updated, loading, error } = state;
  const diff = rate !== null && prev !== null ? rate - prev : 0;
  const positive = diff >= 0;
  const pctChange = rate !== null && prev !== null && prev !== 0 ? (diff / prev) * 100 : null;

  return (
    <article className="glass-card p-5 sm:p-6 group relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <header className="flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
            <div className="relative w-10 h-10 rounded-full ring-1 ring-border bg-gradient-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base leading-tight">USD / MMK</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Reference Rate</p>
          </div>
        </div>
        {pctChange !== null && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}
          >
            {positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(pctChange).toFixed(2)}%
          </div>
        )}
      </header>

      <div className="mt-4">
        {loading && rate === null ? (
          <div className="h-9 w-40 rounded bg-muted/40 animate-pulse" />
        ) : error && rate === null ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <p className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums">
            {rate?.toLocaleString("en-US", { maximumFractionDigits: 2 })}{" "}
            <span className="text-base text-muted-foreground font-medium">MMK</span>
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          For Forex Traders · 1 USD ={" "}
          {rate ? rate.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—"} MMK
        </p>
      </div>

      <footer className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3" />
          {updated
            ? updated.toLocaleTimeString("en-GB", {
                timeZone: "Asia/Yangon",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "—"}
        </span>
        <span className="text-foreground/70">exchangerate-api.com</span>
      </footer>

      <p className="mt-3 text-[11px] text-muted-foreground/90 italic border-t border-border/50 pt-2">
        Rate is for reference only, not for trading.
      </p>
    </article>
  );
};
