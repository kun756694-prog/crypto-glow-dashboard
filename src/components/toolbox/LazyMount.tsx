import { ReactNode, useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** Render placeholder until the section scrolls into view */
  rootMargin?: string;
  minHeight?: number;
  fallback?: ReactNode;
}

/**
 * Defers mounting heavy children (TradingView / Investing iframes) until
 * the user scrolls them into view. Keeps the main dashboard fast.
 */
export const LazyMount = ({
  children,
  rootMargin = "200px",
  minHeight = 400,
  fallback,
}: LazyMountProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible || !ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {visible ? children : fallback ?? (
        <div
          className="glass-card w-full flex items-center justify-center text-xs text-muted-foreground"
          style={{ height: minHeight }}
        >
          Loading widget on scroll…
        </div>
      )}
    </div>
  );
};
