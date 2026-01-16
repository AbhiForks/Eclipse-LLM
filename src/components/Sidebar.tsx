import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import PixelLogo from "./PixelLogo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const chatContext = (() => {
    try {
      return useChat();
    } catch (e) {
      return {
        conversations: [],
        currentConversation: null,
        createNewConversation: () => {
          toast({
            title: "Chat feature unavailable",
            description:
              "Please go to the Chat section to start a conversation",
          });
        },
        setCurrentConversation: () => {},
        deleteConversation: () => {},
      };
    }
  })();

  const { createNewConversation } = chatContext;

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle(!isCollapsed);
  };

  const navItems = [
    { icon: "home", label: "Home", path: "/home", description: "Home page" },
    {
      icon: "public",
      label: "Discover",
      path: "/discover",
      description: "Discover new content",
    },
    {
      icon: "library_books",
      label: "Library",
      path: "/library",
      description: "Your saved content",
    },
    {
      icon: "explore",
      label: "AI Compass",
      path: "/ai-compass",
      isExternal: false,
      description:
        "Subscribe to our daily AI news digest for the latest updates in artificial intelligence.",
    },
  ];

  const handleExternalLink = (url: string, description: string) => {
    toast({
      title: "AI Compass Newsletter",
      description: description,
      duration: 3000,
    });
    window.open(url, "_blank");
  };

  const renderDesktopSidebar = () => (
    <motion.div
      className={`fixed left-0 top-0 bottom-0 bg-[#000000] flex flex-col py-4 z-50 transition-all duration-300 border-r border-[#B8B2B2]/10 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
    >
      <div
        className="px-4 mb-8 cursor-pointer flex items-center justify-center"
        onClick={toggleSidebar}
      >
        <PixelLogo size={32} animated={false} showText={false} />
        {!isCollapsed && (
          <span className="ml-2 text-[#F2EDED] font-semibold">Eclipse</span>
        )}
      </div>

      <div className="flex justify-center mb-8">
        <Button
          onClick={createNewConversation}
          className="w-10 h-10 bg-[#F2EDED] hover:bg-[#F2EDED]/90 text-[#000000] rounded-full flex items-center justify-center"
        >
          <span className="material-icons" style={{ fontSize: "20px" }}>
            add
          </span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center gap-6">
        {navItems.map((item) =>
          item.isExternal ? (
            <TooltipProvider key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() =>
                      handleExternalLink(item.path, item.description)
                    }
                    className={`flex items-center p-2 rounded-lg ${
                      location.pathname === item.path
                        ? "text-[#F2EDED]"
                        : "text-[#B8B2B2] hover:text-[#F2EDED]"
                    } transition-colors`}
                  >
                    <span
                      className="material-icons"
                      style={{ fontSize: "20px" }}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="ml-2">{item.label}</span>}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center p-2 rounded-lg ${
                location.pathname === item.path
                  ? "text-[#F2EDED]"
                  : "text-[#B8B2B2] hover:text-[#F2EDED]"
              } transition-colors`}
            >
              <span className="material-icons" style={{ fontSize: "20px" }}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Link>
          ),
        )}
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 pb-4">
        {user && (
          <div className="flex items-center p-2 rounded-lg text-[#B8B2B2] hover:text-[#F2EDED] transition-colors">
            <img
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="w-8 h-8 rounded-full mr-2"
            />
            {!isCollapsed && (
              <span className="ml-2 text-[#F2EDED]">
                {user.fullName || user.username}
              </span>
            )}
          </div>
        )}
        <Link
          to="/profile"
          className="flex items-center p-2 rounded-lg text-[#B8B2B2] hover:text-[#F2EDED] transition-colors"
        >
          <span className="material-icons" style={{ fontSize: "20px" }}>
            person
          </span>
          {!isCollapsed && <span className="ml-2">Profile</span>}
        </Link>
        <Button
          onClick={handleSignOut}
          className="flex items-center p-2 rounded-lg text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10 transition-colors"
        >
          <span className="material-icons" style={{ fontSize: "20px" }}>
            logout
          </span>
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </motion.div>
  );

  const renderMobileMenu = () => (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-[#F2EDED]"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span className="material-icons" style={{ fontSize: "24px" }}>
          {showMobileMenu ? "close" : "menu"}
        </span>
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
              className="absolute left-0 top-0 bottom-0 w-64 bg-[#000000] p-4 border-r border-[#B8B2B2]/10"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-8">
                <PixelLogo size={32} animated={false} showText={false} />
                <span className="ml-2 text-[#F2EDED] font-semibold">
                  Eclipse
                </span>
              </div>

              <Button
                onClick={createNewConversation}
                className="w-10 h-10 bg-[#F2EDED] hover:bg-[#F2EDED]/90 text-[#000000] rounded-full flex items-center justify-center mb-8"
              >
                <span className="material-icons" style={{ fontSize: "20px" }}>
                  add
                </span>
              </Button>

              <div className="flex flex-col gap-6">
                {navItems.map((item) =>
                  item.isExternal ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        handleExternalLink(item.path, item.description);
                        setShowMobileMenu(false);
                      }}
                      className={`flex items-center p-2 rounded-lg text-[#B8B2B2] hover:text-[#F2EDED] transition-colors`}
                    >
                      <span
                        className="material-icons"
                        style={{ fontSize: "20px" }}
                      >
                        {item.icon}
                      </span>
                      <span className="ml-2">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`flex items-center p-2 rounded-lg ${
                        location.pathname === item.path
                          ? "text-[#F2EDED]"
                          : "text-[#B8B2B2] hover:text-[#F2EDED]"
                      } transition-colors`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <span
                        className="material-icons"
                        style={{ fontSize: "20px" }}
                      >
                        {item.icon}
                      </span>
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  ),
                )}
              </div>

              {user && (
                <div className="mt-auto pt-6 border-t border-[#B8B2B2]/10">
                  <div className="flex items-center p-2 rounded-lg text-[#B8B2B2] hover:text-[#F2EDED] transition-colors">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="ml-2 text-[#F2EDED]">
                      {user.fullName || user.username}
                    </span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    className="flex items-center p-2 rounded-lg text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10 transition-colors mt-4 w-full justify-start"
                  >
                    <span
                      className="material-icons"
                      style={{ fontSize: "20px" }}
                    >
                      logout
                    </span>
                    <span className="ml-2">Sign Out</span>
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return <>{isMobile ? renderMobileMenu() : renderDesktopSidebar()}</>;
};

export default Sidebar;
