
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/context/ChatContext";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import GlowEffect from "@/components/GlowEffect";
import { ArrowRightIcon, CornerDownLeftIcon, SearchIcon, ZapIcon, ClockIcon, ShareIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Main chat UI component
const ChatUI = () => {
  const { currentConversation, renameConversation, deleteConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Auto-scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const handleDelete = () => {
    if (currentConversation) {
      deleteConversation(currentConversation.id);
      toast({
        title: "Conversation deleted",
        description: "Your conversation has been removed.",
        variant: "destructive"
      });
    }
  };

  if (!currentConversation) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="relative flex flex-col h-screen bg-black overflow-hidden">
      {/* Chat header with conversation options */}
      <div className="relative z-10">
        {isRenaming ? (
          <div className="p-4 flex items-center border-b border-gray-800 bg-[#121212]">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') setIsRenaming(false);
              }}
            />
            <button 
              onClick={handleRename} 
              className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={() => setIsRenaming(false)} 
              className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <ChatHeader 
            title={currentConversation.title}
            actions={
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRename}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400"
                  title="Rename conversation"
                >
                  <ClockIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => {
                    toast({
                      title: "Share link created",
                      description: "Link copied to clipboard.",
                    });
                  }}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400"
                  title="Share conversation"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 rounded-full hover:bg-red-900/30 transition-colors text-red-400"
                  title="Delete conversation"
                >
                  <Trash2Icon className="h-5 w-5" />
                </button>
              </div>
            }
          />
        )}
      </div>
      
      {/* Messages area with fixed scrolling */}
      <div className="flex-1 overflow-y-auto scrollbar-none bg-black">
        {currentConversation.messages.length <= 1 ? (
          <WelcomeScreen />
        ) : (
          <div className="pb-20">
            {currentConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Chat input */}
      <ChatInput className="absolute bottom-0 left-0 right-0" />
    </div>
  );
};

// Welcome screen shown for new conversations
const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 h-full">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        What do you want to know?
      </motion.h1>
      
      <div className="w-full max-w-xl space-y-4">
        <SuggestionCard 
          icon={<CornerDownLeftIcon className="h-5 w-5" />}
          title="Ask anything"
          description="Get detailed explanations for complex topics"
        />
        <SuggestionCard 
          icon={<SearchIcon className="h-5 w-5" />}
          title="Find information"
          description="Search for facts, data, and resources"
        />
      </div>
    </div>
  );
};

// Card component for welcome screen suggestions
const SuggestionCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <motion.div 
      className="bg-[#121212]/70 border border-gray-800 p-4 rounded-xl flex items-center gap-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rounded-full bg-purple-600/20 p-3">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-white text-lg">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

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
