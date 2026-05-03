import { Link } from "react-router-dom";
import { Mail, Megaphone } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="relative mt-16 border-t border-border/40">
      {/* Advertisement Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[120px] text-center">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Advertisement</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sponsored content will appear here.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Want to advertise?{" "}
            <a
              href="https://wa.me/601114614878"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-6 sm:p-8">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            <span className="text-foreground font-medium">Disclaimer:</span> Crypto Pulse provides market data for
            informational purposes only and does not constitute financial, investment, or trading advice.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span className="text-border">|</span>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <span className="text-border">|</span>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <span className="text-border">|</span>
              <a
href="mailto:heinlay010002@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>

            <a
href="mailto:heinlay010002@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              heinlay010002@gmail.com
            </a>
          </div>

          <p className="mt-6 pt-6 border-t border-border/40 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Crypto Pulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
