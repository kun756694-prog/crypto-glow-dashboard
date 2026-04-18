import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Public Sale", value: 35, color: "hsl(45 95% 60%)" },
  { name: "Staking Rewards", value: 25, color: "hsl(38 90% 50%)" },
  { name: "Team & Advisors", value: 15, color: "hsl(32 75% 45%)" },
  { name: "Treasury", value: 12, color: "hsl(28 60% 38%)" },
  { name: "Liquidity", value: 8, color: "hsl(48 100% 75%)" },
  { name: "Marketing", value: 5, color: "hsl(20 50% 32%)" },
];

export const Tokenomics = () => {
  return (
    <div className="fdx-card p-6">
      <h3 className="text-sm font-semibold tracking-wide text-fdx-gold mb-1">TOKENOMICS</h3>
      <p className="text-xs text-muted-foreground mb-4">Total Supply: 1,000,000,000 FDX</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="hsl(var(--fdx-black))"
                strokeWidth={2}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--fdx-black))",
                  border: "1px solid hsl(var(--fdx-gold) / 0.3)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-2">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                <span className="text-foreground/90">{d.name}</span>
              </div>
              <span className="font-mono text-fdx-gold">{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
