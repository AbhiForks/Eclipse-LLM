import type { FC } from "react";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import type { Message } from "@/context/ChatContext";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex w-full gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
          isUser
            ? "border-transparent bg-foreground text-background"
            : "border-border bg-muted text-foreground",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={cn(
          "min-w-0 max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[75%]",
          isUser
            ? "rounded-br-md bg-foreground text-background"
            : "rounded-bl-md border border-border/70 bg-muted/40",
        )}
      >
        {message.isLoading ? (
          <span className="flex items-center gap-1.5 py-1" aria-label="Thinking">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-current opacity-60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </span>
        ) : (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
