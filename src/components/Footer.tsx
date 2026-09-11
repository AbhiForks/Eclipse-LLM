import { Link } from "react-router-dom";
import EclipseLogo from "@/components/EclipseLogo";

const Footer = () => (
  <footer className="border-t border-border/60">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <EclipseLogo size={26} />
      <p className="text-sm text-muted-foreground">
        One interface for every frontier model.
      </p>
      <nav className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link to="/chat" className="transition-colors hover:text-foreground">Chat</Link>
        <Link to="/discover" className="transition-colors hover:text-foreground">Discover</Link>
        <Link to="/library" className="transition-colors hover:text-foreground">Library</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
