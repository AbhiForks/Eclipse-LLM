
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/context/ChatContext";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import GlowEffect from "@/components/GlowEffect";
import FloatingParticle from "@/components/FloatingParticle";
import { CornerDownLeft, Search, Zap } from "lucide-react";

// Main chat UI component
const ChatUI = () => {
  const { currentConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  if (!currentConversation) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="relative flex flex-col h-screen">
      {/* Glow and particle effects */}
      <GlowEffect />
      <FloatingParticle size={4} top="20%" left="10%" duration={15} />
      <FloatingParticle size={6} top="40%" right="15%" duration={25} delay={2} />
      <FloatingParticle size={3} bottom="30%" left="20%" duration={20} delay={5} />
      <FloatingParticle size={5} bottom="20%" right="25%" duration={18} delay={3} />
      <FloatingParticle size={4} top="15%" right="40%" duration={22} delay={7} />
      
      {/* Chat header */}
      <ChatHeader title={currentConversation.title} />
      
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
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-8">
      <motion.h1 
        className="text-4xl font-bold text-gradient"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Eclipse
      </motion.h1>
      
      <motion.p
        className="text-xl text-center max-w-xl text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Your personal AI assistant, ready to help with anything you need.
      </motion.p>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-3xl"
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
const SuggestionCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <motion.div 
      className="cosmic-card p-4 flex flex-col gap-2"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rounded-full bg-cosmic-blue/20 p-2 w-fit">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

// Main layout component that wraps everything
const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ChatUI />
      </main>
    </div>
  );
};

export default Index;
