/**
 * NotFound.tsx
 *
 * 404 error page displayed when a route is not found.
 * Logs the attempted route for debugging purposes.
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * NotFound component
 * Displays a user-friendly 404 error page with navigation options
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
