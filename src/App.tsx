import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";

const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Loading = lazy(() => import("./pages/Loading"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Discover = lazy(() => import("./pages/Discover"));
const Library = lazy(() => import("./pages/Library"));
const AICompass = lazy(() => import("@/pages/AICompass"));

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
const demoMode = import.meta.env.VITE_DEMO_MODE === "true";

const RoutesView = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/loading" element={<Loading />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
    <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
    <Route path="/chat" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
    <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
    <Route path="/ai-compass" element={<ProtectedRoute><AICompass /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  const inner = (
    <TooltipProvider>
      <Toaster />
      <ChatProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <RoutesView />
          </Suspense>
        </BrowserRouter>
      </ChatProvider>
    </TooltipProvider>
  );

  // Demo mode or missing key: run without Clerk so localhost works
  if (demoMode || !clerkPubKey) {
    if (!clerkPubKey && !demoMode) {
      console.warn("Missing VITE_CLERK_PUBLISHABLE_KEY — running in demo mode. Set VITE_DEMO_MODE=true to silence.");
    }
    return inner;
  }

  return <ClerkProvider publishableKey={clerkPubKey}>{inner}</ClerkProvider>;
};

export default App;
