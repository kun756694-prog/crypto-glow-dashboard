import { useEffect, useRef } from "react";
import { Megaphone } from "lucide-react";

const ADSTERRA_SCRIPT_SRC =
  "https://pl29320398.profitablecpmratenetwork.com/d6/68/f6/d668f688f5fd439f52d621e3ff1b0289.js";

export const SpecialAds = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = ADSTERRA_SCRIPT_SRC;
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="mt-10" aria-label="Special Ads">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-4 h-4 text-primary" />
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Special <span className="neon-text">Ads</span>
        </h2>
      </div>
      <div
        ref={containerRef}
        className="glass-card p-4 min-h-[90px] relative overflow-hidden"
      />
    </section>
  );
};
