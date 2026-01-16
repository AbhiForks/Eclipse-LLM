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
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ChatUI = () => {
  const { currentConversation, renameConversation, deleteConversation } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

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

  const handleShare = () => {
    if (currentConversation) {
      toast({
        title: "Share link created",
        description:
          "Link copied to clipboard. Your conversation can now be shared.",
      });
    }
  };

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
      <div className="flex items-center justify-center h-full text-[#F2EDED]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-[#F2EDED]">
      <ChatHeader
        title={currentConversation.title}
        actions={
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRename}
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-[#F2EDED]/10 transition-colors text-[#B8B2B2] hover:text-[#F2EDED]"
              title="Rename conversation"
            >
              <span className="material-icons h-5 w-5">edit</span>
            </Button>
            <Button
              onClick={handleShare}
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-[#F2EDED]/10 transition-colors text-[#B8B2B2] hover:text-[#F2EDED]"
              title="Share conversation"
            >
              <span className="material-icons h-5 w-5">share</span>
            </Button>
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="icon"
              className="p-2 rounded-full hover:bg-[#EF4444]/20 transition-colors text-[#EF4444]"
              title="Delete conversation"
            >
              <span className="material-icons h-5 w-5">delete</span>
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentConversation.messages.length <= 1 ? (
          <WelcomeScreen />
        ) : (
          <>
            {currentConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4">
        <ChatInput />
      </div>
    </div>
  );
};

const WelcomeScreen = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-8">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-[#F2EDED] text-center"
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
          icon={<span className="material-icons">call_split</span>}
          title="Ask anything"
          description="Get detailed explanations for complex topics"
        />
        <SuggestionCard
          icon={<span className="material-icons">search</span>}
          title="Find information"
          description="Search for facts, data, and resources"
        />
        <SuggestionCard
          icon={<span className="material-icons">auto_awesome</span>}
          title="Enhance creativity"
          description="Generate ideas, content, and more"
        />
      </motion.div>
    </div>
  );
};

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
      className="bg-[#0A0A0A] backdrop-blur-md border border-[#B8B2B2]/10 p-4 rounded-xl flex flex-col gap-2 cursor-pointer"
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(242, 237, 237, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rounded-full bg-[#F2EDED]/10 p-2 w-fit text-[#F2EDED]">
        {icon}
      </div>
      <h3 className="font-medium text-[#F2EDED]">{title}</h3>
      <p className="text-sm text-[#B8B2B2]">{description}</p>
    </motion.div>
  );
};

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    <div className="flex h-screen w-full bg-[#000000] text-[#F2EDED] overflow-hidden">
      <GlowOrbs />
      <NoiseOverlay />
      <Sidebar onToggle={handleSidebarToggle} />
      <main
        className={`flex-1 transition-all duration-300 relative z-10 ${
          isMobile ? "w-full" : isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <ChatUI />
      </main>
    </div>
  );
};

export { ChatUI, WelcomeScreen, SuggestionCard };
export default Index;
