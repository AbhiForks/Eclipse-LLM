
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/context/ChatContext";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import GlowEffect from "@/components/GlowEffect";
import FloatingParticle from "@/components/FloatingParticle";
import NewsCard from "@/components/NewsCard";
import { CornerDownLeft, Search, Zap, Globe, Share2, Clock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "Meta Maneuvers to Block Tell-All Document Release",
    source: "Tech News Daily",
    imageUrl: "https://placehold.co/100x100/3a1c71/ffffff?text=Meta",
    date: "2 hours ago"
  },
  {
    id: 2,
    title: "AI Scientist Generates First Peer-Reviewed Research Paper",
    source: "Science Today",
    imageUrl: "https://placehold.co/100x100/662d8c/ffffff?text=AI",
    date: "5 hours ago"
  },
  {
    id: 3,
    title: "New Quantum Computing Breakthrough Challenges Encryption",
    source: "Future Tech",
    imageUrl: "https://placehold.co/100x100/862d9c/ffffff?text=Quantum",
    date: "Yesterday"
  }
];

// Main chat UI component
const ChatUI = () => {
  const { currentConversation, renameConversation, deleteConversation, shareConversation } = useChat();
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

  const handleShare = () => {
    if (currentConversation) {
      // In a real app, this would generate a shareable link
      toast({
        title: "Share link created",
        description: "Link copied to clipboard. Your conversation can now be shared.",
      });
    }
  };

  if (!currentConversation) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="relative flex flex-col h-screen">
      {/* Glow and particle effects */}
      <GlowEffect colorScheme="purple-orange" intensity="medium" />
      <FloatingParticle size={4} top="20%" left="10%" duration={15} />
      <FloatingParticle size={6} top="40%" right="15%" duration={25} delay={2} />
      <FloatingParticle size={3} bottom="30%" left="20%" duration={20} delay={5} />
      <FloatingParticle size={5} bottom="20%" right="25%" duration={18} delay={3} />
      <FloatingParticle size={4} top="15%" right="40%" duration={22} delay={7} />
      
      {/* Chat header with conversation options */}
      <div className="relative z-10">
        {isRenaming ? (
          <div className="p-4 flex items-center border-b border-purple-500/20 bg-black/40 backdrop-blur-md">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
                  className="p-2 rounded-full hover:bg-purple-900/30 transition-colors text-purple-300"
                  title="Rename conversation"
                >
                  <Clock className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-purple-900/30 transition-colors text-purple-300"
                  title="Share conversation"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 rounded-full hover:bg-red-900/30 transition-colors text-red-400"
                  title="Delete conversation"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            }
          />
        )}
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
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
  const isMobile = useIsMobile();
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-8">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-gradient"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        What do you want to know?
      </motion.h1>
      
      <motion.div
        className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 mt-6 w-full max-w-3xl`}
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
      
      {/* Recent News Section */}
      <motion.div
        className="w-full max-w-3xl mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center mb-4 text-orange-300">
          <Globe className="mr-2 h-5 w-5" />
          <h2 className="text-lg font-medium">Recent AI News</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {newsItems.map(news => (
            <NewsCard 
              key={news.id}
              title={news.title}
              source={news.source}
              imageUrl={news.imageUrl}
              date={news.date}
              onClick={() => console.log(`Opening news: ${news.title}`)}
            />
          ))}
        </div>
      </motion.div>
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
      className="bg-gradient-to-br from-purple-900/30 to-black backdrop-blur-md border border-purple-500/20 p-4 rounded-xl flex flex-col gap-2"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rounded-full bg-orange-500/20 p-2 w-fit">
        {icon}
      </div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-purple-300">{description}</p>
    </motion.div>
  );
};

// Main layout component that wraps everything
const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <Sidebar />
      <main className={`flex-1 overflow-hidden ${isMobile ? 'ml-0' : 'ml-16'}`}>
        <ChatUI />
      </main>
    </div>
  );
};

export default Index;
