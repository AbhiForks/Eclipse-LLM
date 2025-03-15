
import { FC, FormEvent, useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, CornerRightUp } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { motion } from "framer-motion";

interface ChatInputProps {
  className?: string;
}

const ChatInput: FC<ChatInputProps> = ({ className = "" }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isGenerating } = useChat();

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
    <div className={`bg-background p-4 border-t border-border/30 ${className}`}>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="relative flex items-end bg-card rounded-xl border border-border/50 cosmic-shadow overflow-hidden">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message DeepSeek..."
            className="flex-1 min-h-[50px] max-h-[120px] px-4 py-3 bg-transparent resize-none focus:outline-none"
            disabled={isGenerating}
          />
          <div className="flex items-center space-x-2 py-3 pr-4">
            <button 
              type="button"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Paperclip size={16} />
            </button>
            <button 
              type="button"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Mic size={16} />
            </button>
            <motion.button 
              type="submit"
              disabled={!message.trim() || isGenerating}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full text-white bg-gradient-cosmic-alt 
                         hover:opacity-90 transition-all
                         ${(!message.trim() || isGenerating) 
                           ? "opacity-50 cursor-not-allowed" 
                           : "opacity-100"}`}
            >
              {message.trim() ? <Send size={16} /> : <CornerRightUp size={16} />}
            </motion.button>
          </div>
        </div>
        <div className="text-xs text-center mt-2 text-muted-foreground">
          DeepSeek can make mistakes. Verify important information.
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
