
import { FC, FormEvent, useState, useRef, useEffect } from "react";
import { SendIcon, ArrowRightIcon, Globe, Paperclip } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputProps {
  className?: string;
}

const ChatInput: FC<ChatInputProps> = ({ className = "" }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isGenerating } = useChat();
  const isMobile = useIsMobile();

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isGenerating) return;
    
    await sendMessage(message);
    setMessage("");
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`bg-black p-4 ${className}`}>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="relative flex items-center bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 min-h-[50px] max-h-[120px] px-4 py-3 bg-transparent resize-none focus:outline-none text-white"
            disabled={isGenerating}
          />
          
          <div className="flex items-center pr-3">
            <button 
              type="button" 
              className="p-2 text-gray-400 hover:text-gray-300"
            >
              <Globe size={20} />
            </button>
            
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-300"
            >
              <Paperclip size={20} />
            </button>
            
            <motion.button 
              type="submit"
              disabled={!message.trim() || isGenerating}
              whileTap={{ scale: 0.95 }}
              className={`ml-1 p-2 rounded-full flex items-center justify-center ${
                !message.trim() || isGenerating 
                  ? "bg-purple-700/30 text-gray-400" 
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } transition-colors`}
            >
              {message.trim() ? <SendIcon size={18} /> : <ArrowRightIcon size={18} />}
            </motion.button>
          </div>
        </div>
        <div className="text-xs text-center mt-2 text-gray-500">
          Eclipse can make mistakes. Verify important information.
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
