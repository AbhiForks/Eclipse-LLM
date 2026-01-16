/**
 * ChatInput.tsx
 *
 * Input component for sending messages in the chat interface.
 * Features auto-resizing textarea, keyboard shortcuts, and loading states.
 *
 * Note: Image upload is not currently supported as Gemini 2.0 Flash
 * does not support image input.
 */

import { FC, FormEvent, useState, useRef, useEffect } from "react";
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`bg-[#000000] p-4 border-t border-[#B8B2B2]/10 ${className}`}
    >
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="relative flex items-end bg-[#0A0A0A] rounded-xl border border-[#B8B2B2]/10 shadow-lg overflow-hidden">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Eclipse..."
            className="flex-1 min-h-[50px] max-h-[120px] px-4 py-3 bg-transparent resize-none text-[#F2EDED] placeholder:text-[#B8B2B2]/40 focus:outline-none"
            disabled={isGenerating}
          />
          <div className="flex items-center space-x-2 py-3 pr-4">
            {!isMobile && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10"
                title="Voice input (coming soon)"
                disabled
              >
                <span className="material-icons" style={{ fontSize: "16px" }}>
                  mic
                </span>
              </Button>
            )}
            <motion.button
              type="submit"
              disabled={!message.trim() || isGenerating}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full bg-[#F2EDED] text-[#000000] 
                         hover:opacity-90 transition-all
                         ${
                           !message.trim() || isGenerating
                             ? "opacity-50 cursor-not-allowed"
                             : "opacity-100"
                         }`}
            >
              <span className="material-icons" style={{ fontSize: "16px" }}>
                {message.trim() ? "send" : "arrow_forward"}
              </span>
            </motion.button>
          </div>
        </div>
        <div className="text-xs text-center mt-2 text-[#B8B2B2]/50">
          Eclipse can make mistakes. Verify important information.
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
