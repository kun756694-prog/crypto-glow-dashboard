import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { MarketCoin, formatCompact, formatPrice } from "@/lib/coingecko";
import { Sparkline } from "./Sparkline";

interface CoinCardProps {
  coin: MarketCoin;
}

export const CoinCard = ({ coin }: CoinCardProps) => {
  const positive = coin.price_change_percentage_24h >= 0;
  const sparkData = coin.sparkline_in_7d?.price ?? [];

  return (
    <article className="glass-card p-5 sm:p-6 group relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <header className="flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
            <img
              src={coin.image}
              alt={`${coin.name} logo`}
              loading="lazy"
              className="relative w-10 h-10 rounded-full ring-1 ring-border"
            />
          </div>
          <div>
            <h3 className="font-semibold text-base leading-tight">{coin.name}</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{coin.symbol}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            positive
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive"
          }`}
        >
          {positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
      </header>

      <div className="mt-4">
        <p className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums">
          {formatPrice(coin.current_price)}
        </p>
      </div>

      <div className="mt-3 -mx-2">
        <Sparkline data={sparkData} positive={positive} />
      </div>

      <footer className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>
          Vol <span className="text-foreground/80 font-medium">${formatCompact(coin.total_volume)}</span>
        </span>
        <span>
          Cap <span className="text-foreground/80 font-medium">${formatCompact(coin.market_cap)}</span>
        </span>
      </footer>
    </article>
  );
};
