import { AlertCircle, Linkedin, Sparkles } from "lucide-react";
import { CoinCard } from "@/components/CoinCard";
import { UsdMmkRate } from "@/components/UsdMmkRate";
import { CryptoNews } from "@/components/CryptoNews";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MainNav } from "@/components/MainNav";
import { PriceTicker } from "@/components/PriceTicker";
import { PromotedCoins } from "@/components/PromotedCoins";
import { SiteFooter } from "@/components/SiteFooter";
import { useCryptoData } from "@/hooks/useCryptoData";

const Index = () => {
  const { coins, fng, loading, fngLoading, error, lastUpdated } = useCryptoData();

  return (
    <div className="min-h-screen relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-glow opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Crypto<span className="neon-text">Pulse</span>
              </h1>
              <p className="text-xs text-muted-foreground">Live prices & sentiment, beautifully tracked</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <MainNav />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
{lastUpdated
                ? `Updated ${lastUpdated.toLocaleString('en-GB', {
                    timeZone: 'Asia/Yangon',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}`
                : "Connecting..."}
            </div>
          </div>
        </header>

        {/* Ticker */}
        <div className="mb-8">
          {coins.length > 0 ? (
            <PriceTicker coins={coins} />
          ) : (
            <div className="glass rounded-full h-11 animate-pulse" />
          )}
        </div>

        {error && coins.length === 0 ? (
          <div className="glass-card p-8 flex flex-col items-center text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-destructive mb-3" />
            <h2 className="text-lg font-semibold">Couldn't reach CoinGecko</h2>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
            <p className="text-xs text-muted-foreground mt-4">Retrying automatically every minute…</p>
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Coins grid */}
              <section className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5" aria-label="Cryptocurrency prices">
                {coins.map((coin, i) => (
                  <>
                    <CoinCard key={coin.id} coin={coin} />
                    {i === 0 && <UsdMmkRate key="usd-mmk" />}
                  </>
                ))}
              </section>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <FearGreedWidget data={fng} loading={fngLoading} />
              </aside>
            </div>

            <PromotedCoins />

            <CryptoNews />
          </>
        )}

        {/* Footer CTA */}
        <div className="mt-14 mb-4 flex flex-col items-center gap-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-glow hover:scale-105 active:scale-95 transition-transform"
          >
            <Linkedin className="w-4 h-4" />
            Hire me for Graphic Design
          </a>
          <p className="text-[11px] text-muted-foreground text-center max-w-md">
            Data from CoinGecko & Alternative.me. For informational purposes only — not financial advice.
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Index;
