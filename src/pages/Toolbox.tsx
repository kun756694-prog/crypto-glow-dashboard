import React from 'react';
import { MainNav } from '@/components/MainNav';
import { SiteFooter } from '@/components/SiteFooter';
import { TradingViewChart } from '@/components/toolbox/TradingViewChart';

const Toolbox = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">Global Trading Toolbox</h1>
        
        {/* နိုင်ငံစုံငွေလဲနှုန်းဇယား */}
        <div className="mb-12 bg-gray-900 p-4 rounded-xl border border-orange-500/30">
          <h2 className="text-xl font-semibold mb-6 text-orange-400"> 18+ Countries Live Exchange Rates</h2>
          <div className="overflow-hidden rounded-lg border border-gray-800">
            <iframe 
              src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=1,2,3,4,5,7,8,9,10,11,12,13,650,2111,2114,2138,44321,10125" 
              width="100%" 
              height="500" 
              frameBorder="0" 
              className="w-full"
            ></iframe>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center">Includes: MYR (Malaysia), MMK (Myanmar), THB, SGD, CNY, and more.</p>
        </div>

        {/* Chart အပိုင်း */}
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 mb-12">
          <h2 className="text-xl font-semibold mb-4 text-orange-400 font-mono">XAU / USD - Gold Spot</h2>
          <TradingViewChart symbol="OANDA:XAUUSD" title="XAU/USD" containerId="tv-xauusd" height={450} />
        </div>

        {/* Roadmap အပိုင်း */}
        <section className="p-6 bg-[#111] rounded-2xl border border-orange-500 mb-10 shadow-lg shadow-orange-500/10">
          <h2 className="text-2xl font-bold text-orange-500 text-center mb-6"> Project Roadmap</h2>
          <div className="space-y-4">
            <div className="p-3 border-b border-gray-800 text-gray-300">
              <span className="text-green-500 font-bold"> Phase 1:</span> Launch Community Tools (Live)
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-orange-500 text-white">
              <span className="text-orange-500 font-bold"> Phase 2:</span> Early Registration & Airdrops (Active)
            </div>
            <div className="p-3 text-gray-600">
              <span className="font-bold"> Phase 3:</span> Token Private Sale (Coming Soon)
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => window.location.href = '/register'}
              className="w-full max-w-md py-4 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-all text-lg shadow-lg shadow-orange-500/20"
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
