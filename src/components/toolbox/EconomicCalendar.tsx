import { useEffect, useRef } from "react";

/**
 * TradingView Economic Calendar widget — embedded via their official
 * embed script. Loaded only when this component mounts (LazyMount handles that).
 */
export const EconomicCalendar = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: 540,
      locale: "en",
      importanceFilter: "0,1",
      countryFilter:
        "ar,au,br,ca,cn,de,eu,fr,gb,hk,in,id,it,jp,kr,mx,nz,ru,sa,ch,sg,za,tr,us",
    });
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="font-semibold text-sm">Economic Calendar</h3>
          <p className="text-[11px] text-muted-foreground">High-impact macro events</p>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          TradingView
        </span>
      </div>
      <div className="tradingview-widget-container rounded-lg overflow-hidden" ref={ref} />
    </div>
  );
};
