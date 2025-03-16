
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/Sidebar";
import ChatUI from "@/components/chat/ChatUI";

// Main layout component that wraps everything
const Index = () => {
  const isMobile = useIsMobile();
  
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
