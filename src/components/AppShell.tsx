import { Link, useLocation } from "react-router-dom";
import { Compass, Home, LibraryBig, Menu, Plus, Telescope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import EclipseLogo from "@/components/EclipseLogo";

const NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/chat", label: "Chat", icon: Plus },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/library", label: "Library", icon: LibraryBig },
  { to: "/ai-compass", label: "AI Compass", icon: Telescope },
];

export const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-white/10 font-medium text-foreground"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

/** Responsive app shell. Sidebar is a flex child — no ml-64 margin hacks. */
const AppShell = ({ children, header }: AppShellProps) => (
  <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 md:flex">
      <div className="flex h-16 items-center px-5">
        <Link to="/home" aria-label="Eclipse home">
          <EclipseLogo />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <SidebarNav />
      </div>
      <div className="border-t border-border/60 p-3">
        <Button className="w-full gap-2" asChild>
          <Link to="/chat">
            <Plus className="h-4 w-4" /> New chat
          </Link>
        </Button>
      </div>
    </aside>
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 px-3 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-14 items-center px-4">
              <EclipseLogo />
            </div>
            <SidebarNav />
          </SheetContent>
        </Sheet>
        <Link to="/home" aria-label="Eclipse home" className="md:hidden">
          <EclipseLogo size={26} />
        </Link>
        <div className="ml-auto md:hidden">
          <Button size="sm" asChild>
            <Link to="/chat">
              <Plus className="h-4 w-4" /> New
            </Link>
          </Button>
        </div>
      </div>
      {header}
      <main className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">{children}</main>
    </div>
  </div>
);

export default AppShell;
