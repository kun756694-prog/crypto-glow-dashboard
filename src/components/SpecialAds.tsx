import { Megaphone } from "lucide-react";

export const SpecialAds = () => {
  return (
    <section className="mt-10" aria-label="Advertisement">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-4 h-4 text-primary" />
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Advertisement
        </h2>
      </div>
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[120px] text-center">
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
    </section>
  );
};
