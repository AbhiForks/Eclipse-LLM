
import { useState, useEffect } from "react";
import { Search, Menu, PlusSquare, Settings, User, ChevronRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import Logo from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { conversations, currentConversation, createNewConversation, setCurrentConversation } = useChat();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Detect if we're on a small screen and collapse the sidebar by default
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const handleNewThread = () => {
    createNewConversation();
    if (isMobile) {
      setShowMobileMenu(false);
    }
    toast({
      title: "New thread created",
      description: "Start your new conversation",
    });
  };

  const navItems = [
    { icon: Search, label: "Home", path: "/" },
    { icon: Search, label: "Discover", path: "/discover" },
    { icon: Search, label: "Spaces", path: "/spaces" },
  ];

  // Sidebar content
  const renderSidebarContent = () => (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <Logo size={32} />
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        )}
      </div>
      
      <div className="px-2 py-2">
        <Button 
          onClick={handleNewThread}
          className="w-full flex items-center gap-2 py-2 px-4 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
        >
          <span className="flex items-center gap-2">
            <PlusSquare size={16} />
            <span>New Thread</span>
          </span>
          <span className="ml-auto text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">Ctrl g P</span>
        </Button>
      </div>
      
      <nav className="mt-2 px-2">
        {navItems.map((item) => (
          <Link 
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-md my-1 text-sm transition-colors
                      ${location.pathname === item.path 
                        ? "bg-gray-800 text-white" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
            onClick={() => isMobile && setShowMobileMenu(false)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto">
        <div className="px-3 py-4 border-t border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-between px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md"
          >
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-sm">Profile</span>
            </div>
            <Settings size={16} />
          </Button>
        </div>
      </div>
    </>
  );

  // Mobile menu button
  const renderMobileMenuButton = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      className="fixed top-4 left-4 z-50 md:hidden bg-gray-900/80 text-gray-200" 
      onClick={() => setShowMobileMenu(!showMobileMenu)}
    >
      <Menu size={24} />
    </Button>
  );

  // Desktop sidebar (collapsible)
  const renderDesktopSidebar = () => (
    <>
      <div 
        className={`fixed top-0 left-0 h-full bg-[#121212] transition-all duration-300 z-40 ${
          isCollapsed ? "w-0 opacity-0" : "w-56 opacity-100"
        }`}
      >
        {!isCollapsed && (
          <div className="h-full flex flex-col">
            {renderSidebarContent()}
          </div>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 hidden md:flex bg-gray-900/80 text-gray-200 ${isCollapsed ? "" : "left-[220px]"}`}
      >
        {isCollapsed ? <Menu size={20} /> : <ChevronRight size={20} />}
      </Button>
    </>
  );

  // Mobile sidebar (slide-in)
  const renderMobileSidebar = () => (
    <>
      {renderMobileMenuButton()}
      
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div 
              className="fixed left-0 top-0 h-full w-64 bg-[#121212] shadow-lg"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                {renderSidebarContent()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {isMobile ? renderMobileSidebar() : renderDesktopSidebar()}
    </>
  );
};

export default Sidebar;
