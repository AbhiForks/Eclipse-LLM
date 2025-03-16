
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/Sidebar";
import ChatUI from "@/components/chat/ChatUI";
import { useNavigate } from "react-router-dom";

// Main layout component that wraps everything
const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Check if we've already shown the loading screen this session
  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    if (!hasSeenLoading) {
      navigate("/loading");
      sessionStorage.setItem("hasSeenLoading", "true");
    }
  }, [navigate]);
  
  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ChatUI />
      </main>
    </div>
  );
};

export default Index;
