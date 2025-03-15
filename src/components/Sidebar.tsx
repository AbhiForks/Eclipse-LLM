
import { useState } from "react";
import { Menu, Plus, MessagesSquare, Settings, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import Logo from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { conversations, currentConversation, createNewConversation, setCurrentConversation } = useChat();
  const { toast } = useToast();
  
  const handleSignOut = () => {
    // In a real app, this would log the user out
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div 
      className={`transition-all duration-300 flex flex-col h-screen bg-sidebar ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-border/20">
        {!isCollapsed && <Logo className="ml-2" />}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200"
        >
          <Menu size={20} className="text-sidebar-foreground" />
        </button>
      </div>
      
      <div className="p-2">
        <button 
          onClick={createNewConversation}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } w-full gap-2 p-2 rounded-lg bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-all duration-200 cosmic-shadow`}
        >
          <Plus size={20} />
          {!isCollapsed && <span>New Chat</span>}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setCurrentConversation(conversation.id)}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } gap-2 p-2 rounded-lg truncate transition-all duration-200 ${
                currentConversation?.id === conversation.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
              }`}
            >
              <MessagesSquare size={18} />
              {!isCollapsed && (
                <span className="truncate">{conversation.title}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-2 border-t border-border/20 space-y-1">
        <Link to="/login">
          <button 
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-start"
            } w-full gap-2 p-2 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground/80 transition-all duration-200`}
          >
            <User size={18} />
            {!isCollapsed && <span>Account</span>}
          </button>
        </Link>
        <button 
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } w-full gap-2 p-2 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground/80 transition-all duration-200`}
        >
          <Settings size={18} />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } w-full gap-2 p-2 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground/80 transition-all duration-200`}
            >
              <LogOut size={18} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem onClick={handleSignOut}>
              Confirm Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
