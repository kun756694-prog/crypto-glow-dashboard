import { BadgeCheck, Megaphone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/601114614878";

const promoted = [
  {
    name: "NovaChain",
    symbol: "NOVA",
    tagline: "Next-gen L2 with sub-second finality",
    accent: "from-primary/30 to-primary/5",
  },
  {
    name: "AstraDAO",
    symbol: "ASTRA",
    tagline: "Community-governed yield protocol",
    accent: "from-accent/30 to-accent/5",
  },
  {
    name: "PulseFi",
    symbol: "PLS",
    tagline: "DeFi made simple for everyone",
    accent: "from-success/25 to-success/5",
  },
];

export const PromotedCoins = () => {
  return (
    <section className="mt-10" aria-label="Promoted coins">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            Promoted <span className="neon-text">Coins</span>
          </h2>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Sponsored
        </span>
      </div>

      {/* Promoted slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {promoted.map((coin) => (
          <article
            key={coin.symbol}
            className="glass-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform"
          >
            <div
              className={`pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${coin.accent} blur-2xl opacity-70`}
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow font-bold text-primary-foreground">
                  {coin.symbol.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold leading-tight">{coin.name}</h3>
                    <BadgeCheck
                      className="w-4 h-4 text-primary"
                      aria-label="Verified"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 uppercase tracking-wider">
                Verified
              </span>
            </div>

            <p className="relative text-sm text-muted-foreground mt-4 mb-5">
              {coin.tagline}
            </p>

            <Button
              asChild
              className="relative w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </Button>
          </article>
        ))}
      </div>

      {/* Advertising banner */}
      <div className="relative mt-6 overflow-hidden rounded-2xl glass-card p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-20" />
        <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
              <Megaphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Want to promote your coin here?{" "}
                <span className="neon-text">Get in touch now!</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Reach thousands of crypto enthusiasts. Premium placement, verified badge, and direct exposure.
              </p>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow shrink-0"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              List Your Coin
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
