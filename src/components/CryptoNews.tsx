import { ArrowUpRight, Newspaper, Zap } from "lucide-react";

interface NewsItem {
  title: string;
  excerpt: string;
  source: string;
  date: string;
  category: "Arbitrum" | "Ethereum" | "DeFi" | "Layer 2";
  url: string;
}

const NEWS: NewsItem[] = [
  {
    title: "Arbitrum One Surpasses $18B in Total Value Locked",
    excerpt:
      "Arbitrum continues to dominate the Layer 2 landscape as institutional liquidity flows into its DeFi ecosystem, cementing its lead over competing rollups.",
    source: "DeFi Llama",
    date: "2d ago",
    category: "Arbitrum",
    url: "https://defillama.com/chain/Arbitrum",
  },
  {
    title: "Ethereum Pectra Upgrade Brings Account Abstraction to Mainnet",
    excerpt:
      "The latest Ethereum hard fork introduces EIP-7702, enabling smart-contract style wallets and dramatically improving UX for everyday users.",
    source: "Ethereum Foundation",
    date: "5d ago",
    category: "Ethereum",
    url: "https://ethereum.org/en/roadmap/pectra/",
  },
  {
    title: "Stylus Goes Live: Rust & C++ Smart Contracts on Arbitrum",
    excerpt:
      "Arbitrum's Stylus upgrade unlocks WASM-based contracts, allowing developers to build with Rust at a fraction of the gas cost of Solidity.",
    source: "Offchain Labs",
    date: "1w ago",
    category: "Layer 2",
    url: "https://arbitrum.io/stylus",
  },
  {
    title: "Arbitrum DAO Approves $215M Gaming Catalyst Program",
    excerpt:
      "A major treasury allocation aims to onboard the next wave of Web3 gaming studios to the Arbitrum ecosystem over the next 24 months.",
    source: "Arbitrum DAO",
    date: "2w ago",
    category: "DeFi",
    url: "https://arbitrumfoundation.medium.com",
  },
];

const categoryStyles: Record<NewsItem["category"], string> = {
  Arbitrum: "bg-primary/15 text-primary border-primary/30",
  Ethereum: "bg-accent/15 text-accent border-accent/30",
  "Layer 2": "bg-success/15 text-success border-success/30",
  DeFi: "bg-warning/15 text-warning border-warning/30",
};

export const CryptoNews = () => {
  return (
    <section className="mt-12" aria-labelledby="news-heading">
      {/* About Arbitrum */}
      <div className="glass-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row gap-5 sm:items-start">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold tracking-tight">Built on Arbitrum</h3>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold">
                Layer 2
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CryptoPulse runs on <span className="text-foreground font-medium">Arbitrum</span>, Ethereum's leading
              optimistic rollup. By settling on Arbitrum, we deliver{" "}
              <span className="text-foreground font-medium">sub-cent transaction fees</span>,{" "}
              <span className="text-foreground font-medium">near-instant confirmations</span>, and the full security
              guarantees of Ethereum mainnet — giving traders and the $FDX community a faster, cheaper, and more
              scalable experience without compromising on decentralization.
            </p>
          </div>
        </div>
      </div>

      {/* News header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
            <Newspaper className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 id="news-heading" className="text-lg sm:text-xl font-bold tracking-tight">
              Latest Crypto News
            </h2>
            <p className="text-xs text-muted-foreground">Arbitrum & Ethereum ecosystem updates</p>
          </div>
        </div>
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {NEWS.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-5 flex flex-col gap-3 hover:border-primary/40 hover:shadow-glow transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border font-semibold ${categoryStyles[item.category]}`}
              >
                {item.category}
              </span>
              <span className="text-[11px] text-muted-foreground">{item.date}</span>
            </div>
            <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{item.excerpt}</p>
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <span className="text-xs text-muted-foreground">{item.source}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
