/**
 * ChatMessage.tsx
 *
 * Component for displaying individual chat messages.
 * Supports user and assistant messages with loading animations.
 */

import type { FC } from "react";
import type { Message } from "@/context/ChatContext";
import { AnimatePresence, motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const isLoading = message.isLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group flex gap-4 p-4 rounded-lg mx-auto ${
        isUser ? "max-w-[60%]" : "max-w-[80%]"
      }`}
      style={{ marginLeft: isUser ? "auto" : "0" }}
    >
      <div
        className={`flex-shrink-0 mt-1 rounded-full h-8 w-8 flex items-center justify-center
        ${isUser ? "bg-[#F2EDED]" : "bg-[#B8B2B2]"}`}
      >
        <span
          className={`material-icons ${isUser ? "text-[#000000]" : "text-[#000000]"}`}
          style={{ fontSize: "16px" }}
        >
          {isUser ? "person" : "auto_awesome"}
        </span>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <div className="prose max-w-none text-[#F2EDED]">
            {message.content.split("\n").map((paragraph, index) => (
              <p key={index} className={index === 0 ? "mt-0" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const LoadingMessage = () => {
  return (
    <AnimatePresence>
      <div className="flex items-center gap-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.6,
              delay,
            }}
            className="h-2 w-2 rounded-full bg-[#F2EDED]"
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ChatMessage;
