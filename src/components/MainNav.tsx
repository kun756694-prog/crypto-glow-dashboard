import { NavLink } from "react-router-dom";
import { Sparkles, Coins, Megaphone, Briefcase, Gift, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const MainNav = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5",
      isActive
        ? "bg-primary/15 text-primary border border-primary/30"
        : "text-muted-foreground hover:text-foreground border border-transparent",
    );

  return (
    <nav className="glass rounded-full px-2 py-1.5 flex items-center gap-1">
      <NavLink to="/" end className={linkClasses}>
        <Sparkles className="w-3.5 h-3.5" />
        Dashboard
      </NavLink>
      <NavLink to="/fdx" className={linkClasses}>
        <Coins className="w-3.5 h-3.5" />
        FDX Coin
      </NavLink>
      <NavLink to="/toolbox" className={linkClasses}>
        <Wrench className="w-3.5 h-3.5" />
        Toolbox
      </NavLink>
      <NavLink to="/blog" className={linkClasses}>
        <BookOpen className="w-3.5 h-3.5" />
        Blog
      </NavLink>
      <NavLink to="/advertise" className={linkClasses}>
        <Megaphone className="w-3.5 h-3.5" />
        Advertise
      </NavLink>
      <NavLink to="/investors" className={linkClasses}>
        <Briefcase className="w-3.5 h-3.5" />
        Relations
      </NavLink>
    </nav>
  );
};
