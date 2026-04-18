import { useEffect, useState } from "react";
import { FearGreed, MarketCoin, fetchFearGreed, fetchMarkets } from "@/lib/coingecko";

const REFRESH_MS = 60_000;

export function useCryptoData() {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [fng, setFng] = useState<FearGreed | null>(null);
  const [loading, setLoading] = useState(true);
  const [fngLoading, setFngLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadMarkets = async (initial = false) => {
      try {
        if (initial) setLoading(true);
        const data = await fetchMarkets();
        if (cancelled) return;
        setCoins(data);
        setError(null);
        setLastUpdated(new Date());
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Failed to load market data";
        setError(msg);
      } finally {
        if (!cancelled && initial) setLoading(false);
      }
    };

    const loadFng = async () => {
      try {
        setFngLoading(true);
        const data = await fetchFearGreed();
        if (cancelled) return;
        setFng(data);
      } catch {
        // non-critical
      } finally {
        if (!cancelled) setFngLoading(false);
      }
    };

    loadMarkets(true);
    loadFng();

    const marketsId = setInterval(() => loadMarkets(false), REFRESH_MS);
    const fngId = setInterval(loadFng, 10 * 60_000);

    return () => {
      cancelled = true;
      clearInterval(marketsId);
      clearInterval(fngId);
    };
  }, []);

  return { coins, fng, loading, fngLoading, error, lastUpdated };
}
