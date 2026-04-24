import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Languages } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/data/blogPosts";

type Lang = "en" | "my";

const BlogPost = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug);
  const [lang, setLang] = useState<Lang>("en");

  // Per-route SEO: title + meta description, scoped to active language
  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    const active = post[lang];
    document.title = `${active.title} | Crypto Pulse Blog`;

    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", active.description);

    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, [post, lang]);

  if (!post) {
    return (
      <div className="min-h-screen relative flex flex-col">
        <div className="relative max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="glass-card p-10 text-center">
            <h1 className="text-2xl font-bold mb-2">Article not found</h1>
            <p className="text-muted-foreground">
              The post you’re looking for doesn’t exist or has been moved.
            </p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const active = post[lang];
  const publishedLabel = new Date(post.publishedOn).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-gradient-glow opacity-60" />

      <div className="relative max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <Link
            to="/blog"
            className="flex items-center gap-2 font-bold tracking-tight text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <MainNav />
        </header>

        <article className="glass-card p-6 sm:p-10">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {publishedLabel}
            </span>
          </div>

          {/* Language toggle */}
          <div className="flex items-center gap-2 mb-6">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <div className="inline-flex rounded-full border border-border/60 p-0.5 bg-background/40">
              <Button
                type="button"
                size="sm"
                variant={lang === "en" ? "default" : "ghost"}
                className="rounded-full h-7 px-3 text-xs"
                onClick={() => setLang("en")}
              >
                English
              </Button>
              <Button
                type="button"
                size="sm"
                variant={lang === "my" ? "default" : "ghost"}
                className="rounded-full h-7 px-3 text-xs"
                onClick={() => setLang("my")}
              >
                မြန်မာ
              </Button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
            {active.title}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {active.content.intro}
          </p>

          <div className="space-y-8">
            {active.content.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-3 text-foreground">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border/40">
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              {active.content.conclusion}
            </p>
          </div>

          <p className="text-xs pt-6 mt-6 border-t border-border/40 text-muted-foreground">
            Disclaimer: This article is for educational purposes only and does not constitute
            financial, investment, or trading advice.
          </p>
        </article>
      </div>

      <SiteFooter />
    </div>
  );
};

export default BlogPost;
