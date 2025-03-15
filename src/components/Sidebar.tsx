
import { useState } from "react";
import { Menu, Plus, MessagesSquare, Settings, LogOut, User, CheckSquare, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import Logo from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { conversations, currentConversation, createNewConversation, setCurrentConversation, deleteConversation } = useChat();
  const { toast } = useToast();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const handleSignOut = () => {
    // In a real app, this would log the user out
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div 
      className={`transition-all duration-300 flex flex-col h-screen bg-gradient-to-b from-black to-purple-950/40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
        {!isCollapsed && <Logo className="ml-2" />}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 rounded-lg hover:bg-purple-900/30 transition-colors duration-200 text-purple-300"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="p-2">
        <button 
          onClick={createNewConversation}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } w-full gap-2 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white transition-all duration-200`}
        >
          <Plus size={20} />
          {!isCollapsed && <span>New Chat</span>}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="relative"
              onMouseEnter={() => setHoveredId(conversation.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                onClick={() => setCurrentConversation(conversation.id)}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                } gap-2 p-2 rounded-lg truncate transition-all duration-200 ${
                  currentConversation?.id === conversation.id
                    ? "bg-purple-900/40 text-white"
                    : "hover:bg-purple-900/20 text-purple-300"
                }`}
              >
                <MessagesSquare size={18} />
                {!isCollapsed && (
                  <span className="truncate">{conversation.title}</span>
                )}
              </button>
              
              {!isCollapsed && hoveredId === conversation.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1"
                >
                  <button
                    onClick={() => deleteConversation(conversation.id)}
                    className="p-1 rounded-md text-red-400 hover:bg-red-900/20 transition-colors"
                    title="Delete conversation"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentConversation(conversation.id)}
                    className="p-1 rounded-md text-green-400 hover:bg-green-900/20 transition-colors"
                    title="Select conversation"
                  >
                    <CheckSquare size={16} />
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-2 border-t border-purple-500/20 space-y-1">
        <Link to="/login">
          <button 
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-start"
            } w-full gap-2 p-2 rounded-lg hover:bg-purple-900/30 text-purple-300 hover:text-white transition-all duration-200`}
          >
            <User size={18} />
            {!isCollapsed && <span>Account</span>}
          </button>
        </Link>
        <button 
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } w-full gap-2 p-2 rounded-lg hover:bg-purple-900/30 text-purple-300 hover:text-white transition-all duration-200`}
        >
          <Settings size={18} />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } w-full gap-2 p-2 rounded-lg hover:bg-purple-900/30 text-purple-300 hover:text-white transition-all duration-200`}
            >
              <LogOut size={18} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="bg-purple-950/90 border border-purple-500/30 text-white backdrop-blur-md">
            <DropdownMenuItem onClick={handleSignOut} className="hover:bg-purple-900/40 cursor-pointer">
              Confirm Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
