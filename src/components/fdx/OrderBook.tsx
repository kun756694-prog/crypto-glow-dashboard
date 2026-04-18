import { useEffect, useState } from "react";

interface Order {
  price: number;
  amount: number;
  total: number;
}

const generateOrders = (basePrice: number, side: "buy" | "sell"): Order[] => {
  return Array.from({ length: 8 }).map((_, i) => {
    const offset = (i + 1) * 0.0002 * (Math.random() * 0.6 + 0.7);
    const price = side === "buy" ? basePrice - offset : basePrice + offset;
    const amount = Math.floor(Math.random() * 9000) + 500;
    return { price, amount, total: price * amount };
  });
};

export const OrderBook = ({ price }: { price: number }) => {
  const [buys, setBuys] = useState<Order[]>(() => generateOrders(price, "buy"));
  const [sells, setSells] = useState<Order[]>(() => generateOrders(price, "sell"));

  useEffect(() => {
    const id = setInterval(() => {
      setBuys(generateOrders(price, "buy"));
      setSells(generateOrders(price, "sell"));
    }, 2200);
    return () => clearInterval(id);
  }, [price]);

  const maxAmount = Math.max(...buys.map((o) => o.amount), ...sells.map((o) => o.amount));

  const Row = ({ order, side }: { order: Order; side: "buy" | "sell" }) => {
    const widthPct = (order.amount / maxAmount) * 100;
    const isBuy = side === "buy";
    return (
      <div className="relative grid grid-cols-3 text-xs py-1 px-2 font-mono tabular-nums">
        <div
          className="absolute inset-y-0 right-0 opacity-25"
          style={{
            width: `${widthPct}%`,
            background: isBuy ? "hsl(var(--success))" : "hsl(var(--destructive))",
          }}
        />
        <span className={isBuy ? "text-success relative" : "text-destructive relative"}>
          ${order.price.toFixed(5)}
        </span>
        <span className="text-right text-foreground/80 relative">{order.amount.toLocaleString()}</span>
        <span className="text-right text-muted-foreground relative">${order.total.toFixed(2)}</span>
      </div>
    );
  };

  return (
    <div className="fdx-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wide text-fdx-gold">LIVE ORDER BOOK</h3>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          REAL-TIME
        </span>
      </div>

      <div className="grid grid-cols-3 text-[10px] uppercase tracking-wider text-muted-foreground px-2 pb-2 border-b border-fdx-gold/15">
        <span>Price (USD)</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      {/* Sells (reversed) */}
      <div className="flex flex-col-reverse">
        {sells.map((o, i) => (
          <Row key={`s-${i}`} order={o} side="sell" />
        ))}
      </div>

      {/* Spread */}
      <div className="my-2 py-2 px-2 flex items-center justify-between border-y border-fdx-gold/20 bg-fdx-gold/5">
        <span className="text-xs text-muted-foreground">Spread</span>
        <span className="text-sm font-bold text-fdx-gold">${price.toFixed(5)}</span>
      </div>

      {/* Buys */}
      <div>
        {buys.map((o, i) => (
          <Row key={`b-${i}`} order={o} side="buy" />
        ))}
      </div>
    </div>
  );
};
