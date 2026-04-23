import { lazy, Suspense } from "react";
import { Wrench } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CurrencyConverter } from "@/components/toolbox/CurrencyConverter";
import { LotSizeCalculator } from "@/components/toolbox/LotSizeCalculator";
import { LazyMount } from "@/components/toolbox/LazyMount";

// Defer the heavy iframe widgets via code-splitting so they don't bloat
// the toolbox bundle until the user actually scrolls to them.
const EconomicCalendar = lazy(() =>
  import("@/components/toolbox/EconomicCalendar").then((m) => ({ default: m.EconomicCalendar })),
);
const TradingViewChart = lazy(() =>
  import("@/components/toolbox/TradingViewChart").then((m) => ({ default: m.TradingViewChart })),
);

const WidgetFallback = ({ height }: { height: number }) => (
  <div
    className="glass-card w-full flex items-center justify-center text-xs text-muted-foreground animate-pulse"
    style={{ height }}
  >
    Loading widget…
  </div>
);

const Toolbox = () => {
  return (
    <div className="min-h-screen relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-glow opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Forex &amp; Trading <span className="neon-text">Toolbox</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Pro-grade calculators, calendars & live charts — lazy-loaded for speed
              </p>
            </div>
          </div>
          <MainNav />
        </header>

        {/* Calculators — instant, lightweight */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8"
          aria-label="Forex calculators"
        >
          <CurrencyConverter />
          <LotSizeCalculator />
        </section>

        {/* Heavy widgets — deferred until scrolled into view */}
        <section className="grid grid-cols-1 gap-5 mb-8" aria-label="Economic calendar">
          <LazyMount minHeight={560} fallback={<WidgetFallback height={560} />}>
            <Suspense fallback={<WidgetFallback height={560} />}>
              <EconomicCalendar />
            </Suspense>
          </LazyMount>
        </section>

        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8"
          aria-label="Live market charts"
        >
          <LazyMount minHeight={500} fallback={<WidgetFallback height={500} />}>
            <Suspense fallback={<WidgetFallback height={500} />}>
              <TradingViewChart
                symbol="OANDA:XAUUSD"
                title="XAU / USD — Gold Spot"
                containerId="tv-xauusd"
                height={460}
              />
            </Suspense>
          </LazyMount>
          <LazyMount minHeight={500} fallback={<WidgetFallback height={500} />}>
            <Suspense fallback={<WidgetFallback height={500} />}>
              <TradingViewChart
                symbol="BINANCE:BTCUSDT"
                title="BTC / USD — Bitcoin"
                containerId="tv-btcusd"
                height={460}
              />
            </Suspense>
          </LazyMount>
        </section>

        <p className="text-[11px] text-muted-foreground text-center max-w-xl mx-auto">
          All tools and embedded widgets are for informational and educational use only — not
          financial advice. Verify pip values and rates with your broker before trading.
        </p>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Toolbox;
