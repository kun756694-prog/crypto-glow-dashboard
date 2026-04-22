import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";

const Terms = () => {
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
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Terms of <span className="neon-text">Service</span>
            </h1>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>By using this site, you agree this is not financial advice.</p>
            <p>
              Crypto Pulse provides market data and related content for informational and educational purposes only.
              Nothing on this site constitutes financial, investment, tax, or legal advice.
            </p>
            <p>
              Market data is aggregated from public third-party sources and may be inaccurate, delayed, or incomplete.
              You are solely responsible for any decisions you make based on information presented here.
            </p>
            <p>
              The site is provided on an "as is" basis without warranties of any kind. We are not liable for any
              losses or damages arising from use of this site.
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

export default Terms;
