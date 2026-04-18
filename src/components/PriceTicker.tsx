import { MarketCoin, formatPrice } from "@/lib/coingecko";

interface PriceTickerProps {
  coins: MarketCoin[];
}

export const PriceTicker = ({ coins }: PriceTickerProps) => {
  if (!coins.length) return null;
  const items = [...coins, ...coins]; // duplicate for seamless loop

  return (
    <div className="glass relative overflow-hidden rounded-full py-2.5">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="ticker-track flex gap-8 whitespace-nowrap w-max">
        {items.map((c, idx) => {
          const positive = c.price_change_percentage_24h >= 0;
          return (
            <div key={`${c.id}-${idx}`} className="flex items-center gap-2 text-sm">
              <img src={c.image} alt="" className="w-5 h-5 rounded-full" />
              <span className="font-semibold uppercase tracking-wide text-foreground/90">{c.symbol}</span>
              <span className="tabular-nums text-foreground">{formatPrice(c.current_price)}</span>
              <span className={`tabular-nums text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
                {positive ? "▲" : "▼"} {Math.abs(c.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
