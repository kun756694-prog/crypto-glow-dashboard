// CoinGecko API helpers

export const COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
] as const;

export type CoinId = (typeof COINS)[number]["id"];

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
}

const API_BASE = "https://api.coingecko.com/api/v3";

export async function fetchMarkets(): Promise<MarketCoin[]> {
  const ids = COINS.map((c) => c.id).join(",");
  const url = `${API_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko error ${res.status}`);
  return res.json();
}

export interface FearGreed {
  value: number;
  value_classification: string;
  timestamp: string;
}

export async function fetchFearGreed(): Promise<FearGreed> {
  const res = await fetch("https://api.alternative.me/fng/?limit=1");
  if (!res.ok) throw new Error(`FNG error ${res.status}`);
  const json = await res.json();
  const d = json.data?.[0];
  return {
    value: Number(d.value),
    value_classification: d.value_classification,
    timestamp: d.timestamp,
  };
}

export function formatPrice(n: number): string {
  if (n >= 1) return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 6 });
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
}
