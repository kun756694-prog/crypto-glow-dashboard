
import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import TradingViewChart from '@/components/toolbox/TradingViewChart';

const Toolbox = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">Multi-Currency Trading Toolbox</h1>
        
        {/* နိုင်ငံစုံ ငွေလဲနှုန်း Widget Section */}
        <div className="mb-12 bg-gray-900 p-6 rounded-xl border border-orange-500/30">
          <h2 className="text-xl font-semibold mb-6 text-orange-400 flex items-center gap-2">
            🌍 Global Exchange Rates (MYR, MMK & 16 More)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* TradingView Market Overview Widget ကို သုံးပြီး နိုင်ငံစုံပြပေးထားခြင်း */}
             <iframe 
                src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=1,2,3,4,5,7,8,9,10,11,12,13,650,2111,2114,2138,44321,10125" 
                width="100%" 
                height="450" 
                frameBorder="0" 
                allowTransparency="true" 
                marginWidth="0" 
                marginHeight="0"
                className="rounded-lg"
             ></iframe>
             <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                <h3 className="text-sm font-bold text-gray-400 mb-4">Quick Conversion Guide</h3>
                <ul className="text-sm space-y-3 text-gray-300">
                  <li className="flex justify-between"><span>USD / MYR (Malaysia)</span> <span className="text-orange-500">Live</span></li>
                  <li className="flex justify-between"><span>USD / MMK (Myanmar)</span> <span className="text-orange-500">Live</span></li>
                  <li className="flex justify-between"><span>USD / THB (Thailand)</span> <span className="text-orange-500">Live</span></li>
                  <li className="flex justify-between"><span>USD / SGD (Singapore)</span> <span className="text-orange-500">Live</span></li>
                  <li className="flex justify-between"><span>USD / CNY (China)</span> <span className="text-orange-500">Live</span></li>
                  <li className="border-t border-gray-800 pt-2">And 13 other major currencies...</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-8 mb-12">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">XAU / USD - Gold Spot</h2>
            <TradingViewChart symbol="OANDA:XAUUSD" height={400} />
          </div>
        </div>

        {/* Roadmap Section */}
        <section style={{ 
          padding: '25px', 
          backgroundColor: '#111', 
          borderRadius: '15px', 
          border: '1px solid #ff9500', 
          marginTop: '40px', 
          marginBottom: '40px'
        }}>
          <h2 style={{ color: '#ff9500', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>🚀 Project Roadmap</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #222' }}>
              <span style={{ color: '#00ff00' }}>✅ Phase 1:</span> Community Launch & Multi-Currency Tools (Live)
            </div>
            <div style={{ padding: '15px', backgroundColor: '#222', borderRadius: '10px', borderLeft: '5px solid #ff9500' }}>
              <span style={{ color: '#ff9500', fontWeight: 'bold' }}>🔵 Phase 2:</span> Early Registration & Airdrops (Active Now)
            </div>
            <div style={{ padding: '10px', opacity: 0.5 }}>⚪ Phase 3: Token Private Sale (Soon)</div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #333' }}>
            <button 
              onClick={() => window.location.href = '/register'}
              style={{ width: '100%', maxWidth: '400px', padding: '16px', backgroundColor: '#ff9500', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}
            >
              Register for Early Access
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Toolbox;
