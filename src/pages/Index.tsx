import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Compass, Lightbulb, MessagesSquare } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import AppShell from "@/components/AppShell";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

const SUGGESTIONS = [
  { icon: MessagesSquare, title: "Ask anything", body: "Get clear explanations for complex topics" },
  { icon: Compass, title: "Find information", body: "Search for facts, data, and resources" },
  { icon: Lightbulb, title: "Create", body: "Brainstorm ideas, drafts, and more" },
];

const ChatUI = () => {
  const { currentConversation, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [currentConversation?.messages.length]);

  if (!currentConversation) {
    return <div className="flex h-full items-center justify-center text-muted-foreground">Loading…</div>;
  }

  const isFresh = currentConversation.messages.length <= 1;

  return (
    <div className="flex h-full flex-col">
      <ChatHeader title={currentConversation.title} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
          {isFresh ? (
            <div className="flex flex-col items-center gap-8 py-8 text-center sm:py-14">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                What do you want to know?
              </motion.h1>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                {SUGGESTIONS.map(({ icon: Icon, title, body }, i) => (
                  <motion.button
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    onClick={() => sendMessage(title === "Ask anything" ? "Explain something fascinating in science." : title === "Find information" ? "What are the biggest AI breakthroughs right now?" : "Give me 5 creative project ideas.")}
                    className="card-hover flex flex-col gap-2 rounded-2xl border border-border/70 bg-muted/20 p-4 text-left"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-medium">{title}</span>
                    <span className="text-sm text-muted-foreground">{body}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {currentConversation.messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </div>
      </div>
      <ChatInput />
    </div>
  );
};

const Index = () => (
  <AppShell>
    <ChatUI />
  </AppShell>
);

export default Index;
