import { useEffect, useRef, useState, type FC, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  className?: string;
}

const ChatInput: FC<ChatInputProps> = ({ className = "" }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isGenerating } = useChat();

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "0px";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isGenerating) return;
    await sendMessage(message.trim());
    setMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("border-t border-border/60 bg-background p-3 sm:p-4", className)}>
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-muted/30 p-2 pl-4 transition-colors focus-within:border-foreground/30">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message Eclipse…"
            rows={1}
            className="max-h-[160px] min-h-[44px] flex-1 resize-none bg-transparent py-2 text-[15px] placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            disabled={isGenerating}
            aria-label="Message Eclipse"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isGenerating}
            aria-label="Send message"
            className="h-9 w-9 shrink-0 rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Eclipse can make mistakes. Verify important information.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
