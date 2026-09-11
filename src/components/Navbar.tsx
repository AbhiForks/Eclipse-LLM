import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EclipseLogo from "@/components/EclipseLogo";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/home" aria-label="Eclipse home">
          <EclipseLogo />
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          <Link to="/chat" className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-foreground">Chat</Link>
          <Link to="/discover" className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-foreground">Discover</Link>
          <Link to="/library" className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-foreground">Library</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm" onClick={() => navigate("/chat")} className="gap-1.5">
            Start chatting <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
