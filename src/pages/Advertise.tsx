import { Check, MessageCircle, Megaphone, Crown, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";

const WHATSAPP_URL = "https://wa.me/601114614878";

const tiers = [
  {
    name: "Starter",
    price: "$10",
    period: "/week",
    icon: Rocket,
    tagline: "Get noticed fast",
    accent: "from-primary/20 to-transparent",
    features: [
      "Basic listing in Promoted Gems",
      "Coin name & symbol display",
      "Standard placement",
      "1 week exposure",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$30",
    period: "/month",
    icon: Sparkles,
    tagline: "Most popular choice",
    accent: "from-primary/40 to-accent/20",
    features: [
      "Everything in Starter",
      "Verified Badge included",
      "Home page priority slot",
      "30 days exposure",
    ],
    highlighted: true,
  },
  {
    name: "Ultimate",
    price: "$50",
    period: "/month",
    icon: Crown,
    tagline: "Maximum visibility",
    accent: "from-accent/40 to-success/20",
    features: [
      "Everything in Pro",
      "Top banner spot",
      "Social media shoutout",
      "Custom graphic design (by me)",
    ],
    highlighted: false,
  },
];

const Advertise = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <Megaphone className="w-5 h-5 text-primary" />
            <span className="neon-text">Advertise</span>
          </a>
          <MainNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 sm:py-14">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-wider text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Promote your coin
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            List your coin. <span className="neon-text">Reach thousands.</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base">
            Choose a plan that fits your project. Premium placement, verified badges,
            and direct exposure to crypto enthusiasts worldwide.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <article
                key={tier.name}
                className={`relative glass-card p-6 sm:p-7 flex flex-col overflow-hidden transition-transform hover:scale-[1.02] ${
                  tier.highlighted ? "border-primary/50 shadow-glow" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full bg-gradient-to-br ${tier.accent} blur-3xl opacity-70`}
                />

                {tier.highlighted && (
                  <span className="absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground uppercase tracking-wider font-semibold">
                    Popular
                  </span>
                )}

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">{tier.name}</h2>
                  <p className="text-xs text-muted-foreground mt-1">{tier.tagline}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold neon-text">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  className={`relative mt-7 w-full ${
                    tier.highlighted
                      ? "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
                      : ""
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get {tier.name}
                  </a>
                </Button>
              </article>
            );
          })}
        </section>

        {/* WhatsApp CTA */}
        <section className="relative mt-12 overflow-hidden rounded-2xl glass-card p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-20" />
          <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 text-center sm:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Ready to <span className="neon-text">get started?</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Reach out directly on WhatsApp for fast onboarding and custom deals.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow shrink-0"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
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

export default Advertise;
