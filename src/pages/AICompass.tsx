import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const AICompass = () => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-black">
      <Sidebar onToggle={setSidebarCollapsed} />
      <div 
        className={`flex-1 ${isMobile ? '' : (sidebarCollapsed ? 'ml-16' : 'ml-64')} h-screen overflow-hidden bg-black`}
      >
        <iframe
          src="https://www.neatprompts.com"
          className="w-full"
          style={{
            border: "none",
            height: "calc(100vh + 100px)",
            marginBottom: "-100px",
            position: "relative",
            top: "-10px",
            backgroundColor: "black"
          }}
        />
      </div>
    </div>
  );
};

export default AICompass;