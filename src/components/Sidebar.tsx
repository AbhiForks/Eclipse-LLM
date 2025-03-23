
import { useState } from "react";
import { Home, Globe, Library, Settings, User, Plus, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import Logo from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Access chat context safely
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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed); // Notify parent component about the toggle state
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Globe, label: "Discover", path: "/discover" },
    { icon: Library, label: "Library", path: "/library" },
  ];

  // Vertical sidebar for desktop
  const renderDesktopSidebar = () => (
    <motion.div
      className={`fixed left-0 top-0 bottom-0 bg-[#121212] flex flex-col py-4 z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      <div className="px-4 mb-8 cursor-pointer flex items-center justify-center" onClick={toggleSidebar}>
        <Logo variant="minimal" size={32} />
        {!isCollapsed && <span className="ml-2 text-white">Eclipse</span>}
      </div>
      
      <div className="flex justify-center mb-8">
        <Button 
          onClick={createNewConversation}
          className="w-10 h-10 bg-[#d946ef] hover:bg-[#c026d3] rounded-full flex items-center justify-center"
        >
          <Plus size={20} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center gap-6">
        {navItems.map((item) => (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex items-center p-2 rounded-lg ${
              location.pathname === item.path 
                ? "text-[#d946ef]" 
                : "text-gray-400 hover:text-white"
            } transition-colors`}
          >
            <item.icon size={20} />
            {!isCollapsed && <span className="ml-2">{item.label}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto flex flex-col items-center gap-4 pb-4">
        <Link to="/profile" className="flex items-center p-2 rounded-lg text-gray-400 hover:text-white transition-colors">
          <User size={20} />
          {!isCollapsed && <span className="ml-2">Profile</span>}
        </Link>
        <Link to="/settings" className="flex items-center p-2 rounded-lg text-gray-400 hover:text-white transition-colors">
          <Settings size={20} />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </Link>
      </div>
    </motion.div>
  );

  // Mobile menu button and sheet
  const renderMobileMenu = () => (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu size={24} />
      </Button>
      
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-64 bg-[#121212] p-4"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-8">
                <Logo variant="minimal" size={32} />
                <span className="ml-2 text-white">Eclipse</span>
              </div>
              
              <Button 
                onClick={createNewConversation}
                className="w-10 h-10 bg-[#d946ef] hover:bg-[#c026d3] rounded-full flex items-center justify-center mb-8"
              >
                <Plus size={20} />
              </Button>
              
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.label}
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg ${
                      location.pathname === item.path 
                        ? "text-[#d946ef]" 
                        : "text-gray-400 hover:text-white"
                    } transition-colors`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <item.icon size={20} />
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {isMobile ? renderMobileMenu() : renderDesktopSidebar()}
    </>
  );
};

export default Sidebar;
