import { useEffect, useRef } from "react";

interface Props {
  symbol: string;
  title: string;
  containerId: string;
  height?: number;
}

/**
 * Embeds a TradingView Advanced Chart widget. Script is loaded
 * lazily inside the container so it doesn't block initial render.
 */
export const TradingViewChart = ({ symbol, title, containerId, height = 460 }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "60",
      timezone: "Asia/Yangon",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      backgroundColor: "rgba(15,15,15,1)",
      gridColor: "rgba(255,255,255,0.06)",
      container_id: containerId,
    });
    ref.current.appendChild(script);
  }, [symbol, containerId]);

  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          TradingView · Live
        </span>
      </div>
      <div
        className="tradingview-widget-container rounded-lg overflow-hidden"
        style={{ height }}
        ref={ref}
      >
        <div id={containerId} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
};
