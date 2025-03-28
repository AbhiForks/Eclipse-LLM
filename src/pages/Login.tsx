
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import GlowEffect from "@/components/GlowEffect";

const Login = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleRedirectToClerkSignIn = () => {
    navigate("/sign-in");
  };
  
  const handleRedirectToClerkSignUp = () => {
    navigate("/sign-up");
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground relative flex items-center justify-center">
      <GlowEffect />
      
      <div className="absolute top-6 left-6">
        <Link to="/home">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </div>
      
      <div className="absolute top-6 right-6">
        <Logo size={30} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6"
      >
        <div className="cosmic-card p-6 rounded-xl neo-blur">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome to Eclipse</h1>
            <p className="text-muted-foreground">Sign in to continue your journey</p>
          </div>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-4">
                <Button 
                  className="w-full bg-[#d946ef] hover:bg-[#c026d3]" 
                  onClick={handleRedirectToClerkSignIn}
                >
                  Continue to Sign In
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure authentication powered by Clerk</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="space-y-4">
                <Button 
                  className="w-full bg-[#d946ef] hover:bg-[#c026d3]" 
                  onClick={handleRedirectToClerkSignUp}
                >
                  Continue to Sign Up
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Create your account with Clerk's secure authentication</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
