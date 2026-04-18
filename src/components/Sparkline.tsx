import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SparklineProps {
  data: number[];
  positive: boolean;
}

export const Sparkline = ({ data, positive }: SparklineProps) => {
  const chartData = data.map((price, i) => ({ i, price }));
  const colorVar = positive ? "var(--success)" : "var(--destructive)";
  const id = `spark-${positive ? "up" : "down"}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`hsl(${colorVar})`} stopOpacity={0.45} />
              <stop offset="100%" stopColor={`hsl(${colorVar})`} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={`hsl(${colorVar})`}
            strokeWidth={2}
            fill={`url(#${id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
