import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  FileText,
  MessageCircle,
  Zap,
  Coins,
  Eye,
  Check,
  Circle,
  Rocket,
  Sparkles,
  Crown,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";

const WHATSAPP_URL = "https://wa.me/601114614878";
const WHITEPAPER_URL = "#";

const metrics = [
  { label: "Current Price", value: "$0.0500", trend: "+12.00%", icon: TrendingUp },
  { label: "Market Cap", value: "$50.0M", trend: "Fully Diluted", icon: Briefcase },
  { label: "Circulating Supply", value: "1.0B FDX", trend: "of 2.0B Max", icon: Coins },
];

const pillars = [
  {
    icon: Zap,
    title: "Scalability",
    desc: "Built on the Ethereum / Arbitrum network for high-speed, low-cost transactions at global scale.",
  },
  {
    icon: Coins,
    title: "Utility",
    desc: "$FDX is the core token powering staking rewards, advertiser payments, and ecosystem governance.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Real-time on-chain data, live order books, and open metrics — every figure verifiable.",
  },
];

const phases = [
  {
    phase: "Phase 1",
    status: "done" as const,
    title: "Foundation",
    items: ["Launch of CryptoPulse Dashboard", "Live Sentiment Index", "Community formation"],
  },
  {
    phase: "Phase 2",
    status: "active" as const,
    title: "Token Economy",
    items: ["$FDX Staking integration", "Yield protocols", "Tier-1 listings"],
  },
  {
    phase: "Phase 3",
    status: "upcoming" as const,
    title: "Expansion",
    items: ["Advertiser Dashboard", "Cross-chain bridges", "Mobile super-app"],
  },
];

const adPlans = [
  {
    name: "Starter",
    price: "$10",
    period: "/week",
    icon: Rocket,
    features: ["Promoted Gems listing", "Standard placement", "1 week exposure"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$30",
    period: "/month",
    icon: Sparkles,
    features: ["Verified Badge", "Home page priority", "30 days exposure"],
    highlighted: true,
  },
  {
    name: "Ultimate",
    price: "$50",
    period: "/month",
    icon: Crown,
    features: ["Top banner spot", "Social shoutout", "Custom design"],
    highlighted: false,
  },
];

const Investors = () => {
  const [livePrice, setLivePrice] = useState(0.05);

  useEffect(() => {
    const id = setInterval(() => {
      const drift = (Math.random() - 0.5) * 0.0004;
      setLivePrice(+(0.05 + drift).toFixed(6));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const scrollToPricing = () => {
    document.getElementById("ad-pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="neon-text">Investor Relations</span>
          </Link>
          <MainNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 sm:py-14 space-y-16 sm:space-y-20">
        {/* 1. Hero */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-wider text-primary mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Investor Relations
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Invest in the Future of <br className="hidden sm:block" />
            <span className="neon-text">$FDX Ecosystem.</span>
          </h1>
          <p className="text-muted-foreground mt-5 text-sm sm:text-lg max-w-2xl mx-auto">
            Building a transparent, real-time financial infrastructure for the next generation of digital assets.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button asChild size="lg" variant="outline" className="glass border-primary/30">
              <a href={WHITEPAPER_URL}>
                <FileText className="w-4 h-4" />
                View Whitepaper
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Contact for Partnership
              </a>
            </Button>
          </div>
        </section>

        {/* 2. Key Metrics */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              const isPrice = i === 0;
              return (
                <article key={m.label} className="glass-card p-6 relative overflow-hidden">
                  <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/15 blur-3xl" />
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success uppercase tracking-wider font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  <p className="text-3xl sm:text-4xl font-extrabold neon-text font-mono tabular-nums mt-1">
                    {isPrice ? `$${livePrice.toFixed(4)}` : m.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{m.trend}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. Investment Pillars */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Investment <span className="neon-text">Pillars</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Three foundations behind every $FDX decision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="glass-card p-6 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. Roadmap */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Roadmap <span className="neon-text">Timeline</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2">From foundation to ecosystem expansion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {phases.map((p) => {
              const isDone = p.status === "done";
              const isActive = p.status === "active";
              return (
                <article
                  key={p.phase}
                  className={`glass-card p-6 ${isActive ? "border-primary/50 shadow-glow" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {p.phase}
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success uppercase tracking-wider font-semibold">
                        <Check className="w-3 h-3" />
                        Done
                      </span>
                    ) : isActive ? (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary uppercase tracking-wider font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        In-Progress
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wider font-semibold">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-3">{p.title}</h3>
                  <ul className="space-y-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Circle className="w-2 h-2 mt-1.5 shrink-0 fill-primary text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* 5. Advertising Partnerships */}
        <section id="ad-pricing" className="max-w-5xl mx-auto scroll-mt-24">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-wider text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Advertising Partnerships
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Promote your project on <span className="neon-text">CryptoPulse</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Three plans built for any growth stage.</p>

            <Button onClick={scrollToPricing} variant="outline" className="glass border-primary/30 mt-5">
              <ArrowRight className="w-4 h-4" />
              View Ad Plans
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {adPlans.map((tier) => {
              const Icon = tier.icon;
              return (
                <article
                  key={tier.name}
                  className={`relative glass-card p-6 flex flex-col overflow-hidden ${
                    tier.highlighted ? "border-primary/50 shadow-glow" : ""
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground uppercase tracking-wider font-semibold">
                      Popular
                    </span>
                  )}

                  <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold neon-text">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>

                  <ul className="mt-5 space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={tier.highlighted ? "default" : "outline"}
                    className={`mt-6 w-full ${
                      tier.highlighted
                        ? "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
                        : ""
                    }`}
                  >
                    <Link to="/advertise">Choose {tier.name}</Link>
                  </Button>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Button asChild variant="link" className="text-primary">
              <Link to="/advertise">
                See full advertising details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* 6. Footer Contact */}
        <section className="relative overflow-hidden rounded-2xl glass-card p-8 sm:p-12 max-w-5xl mx-auto">
          <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-20" />
          <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to <span className="neon-text">get started?</span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Connect directly for partnerships, investments, and custom deals.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow shrink-0"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Contact via WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Investors;
