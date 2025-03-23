
import { useState } from "react";
import { Home, Globe, Library, Settings, User, Plus, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import Logo from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Check if we're on a route that uses ChatContext
  const isChatRoute = location.pathname === '/chat' || location.pathname === '/library';
  
  // Create a safe context accessor
  const chatContext = (() => {
    try {
      return useChat();
    } catch (e) {
      // Return default values for routes without ChatProvider
      return {
        conversations: [],
        currentConversation: null,
        createNewConversation: () => {
          toast({
            title: "Chat feature unavailable",
            description: "Please go to the Chat section to start a conversation",
          });
        },
        setCurrentConversation: () => {},
        deleteConversation: () => {},
      };
    }
  })();
  
  const { createNewConversation } = chatContext;
  
  const handleSignOut = () => {
    // In a real app, this would log the user out
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setShowMobileMenu(!showMobileMenu);
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Globe, label: "Discover", path: "/discover" },
    { icon: Library, label: "Library", path: "/library" },
  ];

  // Vertical sidebar for desktop
  const renderDesktopSidebar = () => (
    <div className={`fixed left-0 top-0 bottom-0 bg-[#121212] flex flex-col items-center py-4 z-50 transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-16'}`}>
      <div className="mb-8 cursor-pointer" onClick={toggleSidebar}>
        <Logo variant="minimal" size={32} />
      </div>
      
      <Button 
        onClick={createNewConversation}
        className="w-10 h-10 bg-[#d946ef] rounded-full flex items-center justify-center mb-8"
      >
        <Plus size={20} />
      </Button>
      
      <div className="flex-1 flex flex-col items-center gap-8">
        {navItems.map((item) => (
          <Link 
            key={item.label}
            to={item.path}
            className={`p-2 rounded-lg ${
              location.pathname === item.path 
                ? "text-[#d946ef]" 
                : "text-gray-400 hover:text-white"
            } transition-colors`}
          >
            <item.icon size={20} />
          </Link>
        ))}
      </div>
      
      <div className="mt-auto flex flex-col items-center gap-4 pb-4">
        <Button variant="ghost" size="icon" className="rounded-lg w-10 h-10 text-gray-400 hover:text-white">
          <User size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-lg w-10 h-10 text-gray-400 hover:text-white">
          <Settings size={20} />
        </Button>
      </div>
    </div>
  );

  // Mobile menu button and sheet
  const renderMobileMenu = () => (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </Button>
      
      {showMobileMenu && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        >
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-64 bg-[#121212] p-4"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-8">
              <Logo size={32} onClick={toggleSidebar} />
            </div>
            
            <Button 
              onClick={() => {
                createNewConversation();
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-2 mb-6 bg-[#d946ef]"
            >
              <Plus size={18} />
              <span>New Chat</span>
            </Button>
            
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                    location.pathname === item.path 
                      ? "text-[#d946ef]" 
                      : "text-gray-400 hover:text-white"
                  } transition-colors`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-start gap-3 text-gray-400 hover:text-white" 
              >
                <User size={18} />
                <span>Account</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-start gap-3 text-gray-400 hover:text-white"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );

  return (
    <>
      {isMobile ? renderMobileMenu() : renderDesktopSidebar()}
    </>
  );
};

export default Sidebar;
