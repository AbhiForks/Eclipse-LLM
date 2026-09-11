import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EclipseLogo from "@/components/EclipseLogo";

/** Centered auth shell for Clerk SignIn/SignUp + Login. */
const AuthLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="relative flex min-h-dvh flex-col bg-background text-foreground">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,hsl(var(--foreground)/0.08),transparent_70%)]"
    />
    <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <Link to="/home" aria-label="Eclipse home">
        <EclipseLogo size={28} />
      </Link>
      <Button variant="ghost" size="sm" asChild>
        <Link to="/home" className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
      </Button>
    </div>
    <main className="relative flex flex-1 items-center justify-center px-4 pb-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        </div>
        {children}
      </div>
    </main>
  </div>
);

export default AuthLayout;
