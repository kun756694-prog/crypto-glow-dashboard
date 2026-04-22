import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-gradient-glow opacity-60" />

      <div className="relative max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <MainNav />
        </header>

        <article className="glass-card p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Privacy <span className="neon-text">Policy</span>
            </h1>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              We do not collect personal data. We use localStorage only for watchlist feature.
            </p>
            <p>
              Crypto Pulse is a read-only market data dashboard. We do not ask for names, emails, wallet addresses, or
              any other personally identifiable information in order to use the site.
            </p>
            <p>
              <span className="text-foreground font-medium">localStorage usage:</span> Your browser stores your
              personal watchlist preferences locally on your device. This data never leaves your browser and is not
              transmitted to our servers.
            </p>
            <p>
              <span className="text-foreground font-medium">Third-party data:</span> Market data is fetched from public
              APIs (CoinGecko, Alternative.me). Advertising may be served by Google AdSense, which may set cookies
              under its own privacy policy.
            </p>
            <p className="text-xs pt-4 border-t border-border/40">
              Questions? Reach us at{" "}
              <a href="mailto:hello@cryptopulse.com" className="text-primary hover:underline">
                hello@cryptopulse.com
              </a>
              .
            </p>
          </div>
        </article>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Privacy;
