import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  // Lightweight SEO: per-route title + meta description without extra deps
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Blog — Forex, Crypto & Risk Management Guides | Crypto Pulse";

    const desc =
      "In-depth bilingual articles (English & Burmese) on Forex trading, crypto security, currency pairs, and risk management for beginners.";
    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-gradient-glow opacity-60" />

      <div className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold tracking-tight text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <MainNav />
        </header>

        <section className="glass-card p-6 sm:p-10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Crypto Pulse <span className="neon-text">Blog</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Practical guides on Forex, crypto security, and risk management — written in both
            English and Burmese (မြန်မာ) so traders can learn in the language they think in.
          </p>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="glass-card p-6 group hover:border-primary/40 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {post.readMinutes} min read
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                {post.en.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {post.en.description}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-3 italic line-clamp-1">
                {post.my.title}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                Read article
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Blog;
