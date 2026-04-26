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
          {/* Clean Roadmap Section */}
      <section style={{ 
        padding: '25px', 
        backgroundColor: '#111', 
        borderRadius: '15px', 
        border: '1px solid #ff9500', 
        marginTop: '40px', 
        marginBottom: '40px',
        color: '#fff'
      }}>
        <h2 style={{ color: '#ff9500', textAlign: 'center', marginBottom: '20px' }}>🚀 Project Roadmap</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Phase 1 */}
          <div style={{ padding: '10px', borderBottom: '1px solid #333' }}>
            <span style={{ color: '#00ff00' }}>✅ Phase 1:</span> Crypto Trading Tools (Live)
          </div>

          {/* Phase 2 */}
          <div style={{ padding: '10px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '4px solid #ff9500' }}>
            <span style={{ color: '#ff9500', fontWeight: 'bold' }}>🔵 Phase 2:</span> Forex & Crypto Registration (Active Now)
          </div>

          <div style={{ padding: '10px', opacity: 0.5 }}>⚪ Phase 3: Token Private Sale (Soon)</div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => window.location.href = '/register'}
            style={{ width: '100%', padding: '15px', backgroundColor: '#ff9500', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Register for Early Access
          </button>
        </div>
      </section>

      <section style={{ 
        padding: '25px', 
        backgroundColor: '#111', 
        borderRadius: '15px', 
        border: '1px solid #ff9500', 
        marginTop: '40px', 
        marginBottom: '40px',
        color: '#fff',
        boxShadow: '0 4px 15px rgba(255, 149, 0, 0.1)'
      }}>
        <h2 style={{ color: '#ff9500', textAlign: 'center', marginBottom: '20px' }}> Project Roadmap</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
          
          {/* Phase 1 - Linked to Crypto Blog */}
          <div 
            onClick={() => window.location.href = '/blog?category=crypto'} 
            style={{ cursor: 'pointer', padding: '10px', borderRadius: '8px', transition: '0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#222'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ color: '#00ff00' }}> Phase 1:</span> Crypto Trading Tools (Read Details)
          </div>

          {/* Phase 2 - Linked to Forex Blog */}
          <div 
            onClick={() => window.location.href = '/blog?category=forex'} 
            style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '4px solid #ff9500' }}
          >
            <span style={{ color: '#ff9500', fontWeight: 'bold' }}> Phase 2:</span> Forex Market Analysis & Registration (Active)
          </div>

          <div style={{ padding: '10px', opacity: 0.5 }}> Phase 3: Token Private Sale (Soon)</div>
          <div style={{ padding: '10px', opacity: 0.5 }}> Phase 4: Global Listing</div>
        </div>
        
        <button 
          onClick={() => window.location.href = '/register'}
          style={{ width: '100%', padding: '15px', backgroundColor: '#ff9500', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Register for Early Access
        </button>
      </section>

      <section style={{ 
        padding: '25px', 
        backgroundColor: '#111', 
        borderRadius: '15px', 
        border: '1px solid #ff9500', 
        marginTop: '40px', 
        marginBottom: '40px',
        color: '#fff',
        boxShadow: '0 4px 15px rgba(255, 149, 0, 0.1)'
      }}>
        <h2 style={{ color: '#ff9500', textAlign: 'center', marginBottom: '20px' }}> Project Roadmap</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
          <div><span style={{ color: '#00ff00' }}> Phase 1:</span> Community Launch & Free Tools (Live)</div>
          <div style={{ padding: '10px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '4px solid #ff9500' }}>
            <span style={{ color: '#ff9500', fontWeight: 'bold' }}> Phase 2:</span> Early Registration & Airdrops (Active Now)
          </div>
          <div style={{ opacity: 0.5 }}> Phase 3: Token Private Sale for Early Holders (Soon)</div>
          <div style={{ opacity: 0.5 }}> Phase 4: Listing on Crypto Exchanges</div>
        </div>
        
        <div style={{ textAlign: 'center', borderTop: '1px solid #333', paddingTop: '20px' }}>
          <p style={{ marginBottom: '15px', fontSize: '14px' }}>Register to secure your founding member status!</p>
          <button 
            onClick={() => window.location.href = '/register'}
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: '#ff9500', 
              color: '#000', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Register for Early Access
          </button>
        </div>
      </section>
      {/* Roadmap Section End */}

      <SiteFooter />
    </div>
  );
};

export default Toolbox;
