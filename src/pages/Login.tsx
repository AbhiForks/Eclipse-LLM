import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/AuthLayout";

const Login = () => (
  <AuthLayout title="Welcome to Eclipse" subtitle="Secure authentication powered by Clerk">
    <div className="grid w-full gap-3">
      <Button size="lg" className="w-full gap-2" asChild>
        <Link to="/sign-in">
          <LogIn className="h-4 w-4" /> Continue to sign in
        </Link>
      </Button>
      <Button size="lg" variant="outline" className="w-full gap-2" asChild>
        <Link to="/sign-up">
          <UserPlus className="h-4 w-4" /> Create account
        </Link>
      </Button>
    </div>
  </AuthLayout>
);

export default Login;
