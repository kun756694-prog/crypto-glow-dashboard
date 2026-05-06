import { NavLink, useNavigate } from "react-router-dom";
import { Sparkles, Coins, Megaphone, Briefcase, Gift, BookOpen, Shield, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const MainNav = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5",
      isActive
        ? "bg-primary/15 text-primary border border-primary/30"
        : "text-muted-foreground hover:text-foreground border border-transparent",
    );

  return (
    <nav className="glass rounded-full px-2 py-1.5 flex items-center gap-1 flex-wrap">
      <NavLink to="/" end className={linkClasses}>
        <Sparkles className="w-3.5 h-3.5" />
        Dashboard
      </NavLink>
      <NavLink to="/fdx" className={linkClasses}>
        <Coins className="w-3.5 h-3.5" />
        FDX Coin
      </NavLink>
      <NavLink to="/earn" className={linkClasses}>
        <Gift className="w-3.5 h-3.5" />
        Earn
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
      {isAdmin && (
        <NavLink to="/admin" className={linkClasses}>
          <Shield className="w-3.5 h-3.5" />
          Admin
        </NavLink>
      )}
      <div className="ml-auto flex items-center">
        {user ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-muted-foreground hover:text-foreground gap-1.5 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/auth")}
            className="text-primary hover:text-primary/80 gap-1.5 text-xs"
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
