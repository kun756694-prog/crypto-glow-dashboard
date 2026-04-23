import { FearGreed } from "@/lib/coingecko";

interface Props {
  data: FearGreed | null;
  loading: boolean;
}

const getColor = (v: number) => {
  if (v < 25) return "hsl(0 84% 60%)";
  if (v < 45) return "hsl(20 90% 55%)";
  if (v < 55) return "hsl(45 100% 55%)";
  if (v < 75) return "hsl(90 70% 50%)";
  return "hsl(142 76% 50%)";
};

export const FearGreedWidget = ({ data, loading }: Props) => {
  const value = data?.value ?? 0;
  const color = getColor(value);
  const angle = (value / 100) * 180 - 90;

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Fear &amp; Greed Index</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Market sentiment, updated daily</p>
        </div>
        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
          Live
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mt-4 min-h-[208px]">
        {loading || !data ? (
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="w-48 h-24 rounded-md bg-muted/20 animate-pulse" />
            <div className="w-16 h-10 rounded bg-muted/20 animate-pulse" />
            <div className="w-24 h-4 rounded bg-muted/20 animate-pulse" />
          </div>
        ) : (
          <>
            <div className="relative w-48 h-24">
              <svg viewBox="0 0 200 110" className="w-full h-full">
                <defs>
                  <linearGradient id="fng-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(0 84% 60%)" />
                    <stop offset="25%" stopColor="hsl(20 90% 55%)" />
                    <stop offset="50%" stopColor="hsl(45 100% 55%)" />
                    <stop offset="75%" stopColor="hsl(90 70% 50%)" />
                    <stop offset="100%" stopColor="hsl(142 76% 50%)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 100 A 85 85 0 0 1 185 100"
                  fill="none"
                  stroke="url(#fng-grad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <g transform={`translate(100 100) rotate(${angle})`}>
                  <line x1="0" y1="0" x2="0" y2="-72" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
                  <circle r="6" fill={color} stroke="hsl(var(--background))" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <div className="text-center mt-1">
              <div className="text-4xl font-bold tabular-nums" style={{ color }}>
                {value}
              </div>
              <div className="text-sm font-medium mt-1" style={{ color }}>
                {data.value_classification}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider mt-2">
        <span>Extreme Fear</span>
        <span>Extreme Greed</span>
      </div>
    </div>
  );
};
