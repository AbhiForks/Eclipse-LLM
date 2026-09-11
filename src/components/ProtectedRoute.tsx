import { useUser } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedInner = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const demoMode = import.meta.env.VITE_DEMO_MODE === "true";
  const hasClerkKey = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  // Demo mode / no key: allow through so localhost works without auth
  if (demoMode || !hasClerkKey) {
    return <>{children}</>;
  }

  return <ProtectedInner>{children}</ProtectedInner>;
};

export default ProtectedRoute;
