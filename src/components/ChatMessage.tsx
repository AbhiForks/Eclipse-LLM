
import { FC } from "react";
import { Message } from "@/context/ChatContext";
import { User, Bot } from "lucide-react";
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
      className={`group flex gap-4 p-4 ${isUser ? "bg-primary/5" : ""}`}
    >
      <div className={`flex-shrink-0 mt-1 rounded-full h-8 w-8 flex items-center justify-center
        ${isUser ? "bg-primary/20" : "bg-secondary/20"}`}>
        {isUser ? (
          <User size={16} className="text-primary-light" />
        ) : (
          <Bot size={16} className="text-secondary-light" />
        )}
      </div>
      
      <div className="flex-1">
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <div className="prose prose-invert max-w-none">
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.6,
            delay: 0,
          }}
          className="h-2 w-2 rounded-full bg-primary"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.6,
            delay: 0.2,
          }}
          className="h-2 w-2 rounded-full bg-primary"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.6,
            delay: 0.4,
          }}
          className="h-2 w-2 rounded-full bg-primary"
        />
      </div>
    </AnimatePresence>
  );
};

export default ChatMessage;
