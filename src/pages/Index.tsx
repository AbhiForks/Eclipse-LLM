/**
 * Index.tsx
 *
 * Main chat interface page that combines the sidebar and chat UI.
 * Handles conversation management and displays the chat interface.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/context/ChatContext";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import GlowEffect from "@/components/GlowEffect";
import {
  CornerDownLeft,
  Search,
  Zap,
  Clock,
  Share2,
  Trash2,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Main chat UI component
const ChatUI = () => {
  const {
    currentConversation,
    renameConversation,
    deleteConversation,
    shareConversation,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  // Define handleRename function
  const handleRename = () => {
    if (isRenaming && newTitle.trim() && currentConversation) {
      renameConversation(currentConversation.id, newTitle);
      setIsRenaming(false);
      toast({
        title: "Conversation renamed",
        description: "Your conversation has been successfully renamed.",
      });
    } else {
      setIsRenaming(true);
      if (currentConversation) {
        setNewTitle(currentConversation.title);
      }
    }
  };

  // Define handleShare function
  const handleShare = () => {
    if (currentConversation) {
      toast({
        title: "Share link created",
        description:
          "Link copied to clipboard. Your conversation can now be shared.",
      });
    }
  };

  // Define handleDelete function
  const handleDelete = () => {
    if (currentConversation) {
      deleteConversation(currentConversation.id);
      toast({
        title: "Conversation deleted",
        description: "Your conversation has been removed.",
        variant: "destructive",
      });
      navigate("/home");
    }
  };

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ChatHeader
        title={currentConversation.title}
        actions={
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRename}
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-[#2a1b2d] transition-colors text-purple-300"
              title="Rename conversation"
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleShare}
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-[#2a1b2d] transition-colors text-purple-300"
              title="Share conversation"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-red-900/30 transition-colors text-red-400"
              title="Delete conversation"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4">
        {currentConversation.messages.length <= 1 ? (
          <WelcomeScreen />
        ) : (
          <div className="space-y-4">
            {currentConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4">
        <ChatInput />
      </div>
    </div>
  );
};

// Welcome screen shown for new conversations
const WelcomeScreen = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-8">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        What do you want to know?
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <SuggestionCard
          icon={<CornerDownLeft className="h-5 w-5" />}
          title="Ask anything"
          description="Get detailed explanations for complex topics"
        />
        <SuggestionCard
          icon={<Search className="h-5 w-5" />}
          title="Find information"
          description="Search for facts, data, and resources"
        />
        <SuggestionCard
          icon={<Zap className="h-5 w-5" />}
          title="Enhance creativity"
          description="Generate ideas, content, and more"
        />
      </motion.div>
    </div>
  );
};

// Card component for welcome screen suggestions
const SuggestionCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#2a1b2d]/30 to-black backdrop-blur-md border border-[#d946ef]/20 p-4 rounded-xl flex flex-col gap-2"
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rounded-full bg-[#d946ef]/20 p-2 w-fit">{icon}</div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-purple-300">{description}</p>
    </motion.div>
  );
};

// Main layout component that wraps everything
const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check if user has seen loading screen, if not redirect to it
  useEffect(() => {
    const hasSeenLoading = localStorage.getItem("hasSeenLoading");
    if (!hasSeenLoading) {
      navigate("/loading");
    }
  }, [navigate]);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      <Sidebar onToggle={handleSidebarToggle} />
      <main
        className={`flex-1 transition-all duration-300 ${isMobile ? "w-full" : isSidebarCollapsed ? "ml-16" : "ml-64"}`}
      >
        <ChatUI />
      </main>
    </div>
  );
};

// Change one of the default exports to a named export
export { ChatUI, WelcomeScreen, SuggestionCard };
export default Index;
