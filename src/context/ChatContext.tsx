
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

// Types for our messages and context
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isGenerating: boolean;
  createNewConversation: () => void;
  setCurrentConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  generateResponse: (message: Message) => Promise<void>;
  renameConversation: (id: string, newTitle: string) => void;
  deleteConversation: (id: string) => void;
  shareConversation: (id: string) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Mock LLM response function (in a real app, this would call an API)
const mockGenerateResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock responses based on message content
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return "👋 Hello! I'm Eclipse, your AI assistant. How can I help you today?";
  } else if (message.toLowerCase().includes("help")) {
    return "I'd be happy to help! I can answer questions, provide information, assist with tasks, or just chat. What do you need assistance with?";
  } else if (message.toLowerCase().includes("feature") || message.toLowerCase().includes("do")) {
    return "I can help with a wide range of tasks including answering questions, writing and editing text, translating languages, summarizing content, creative writing, code assistance, and much more. Is there something specific you're looking for?";
  } else {
    return "Thanks for your message. I'm Eclipse, an AI assistant here to help you with information, tasks, or just conversation. Feel free to ask me anything!";
  }
};

// Provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversationState] = useState<Conversation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Initialize with a default conversation
  useEffect(() => {
    if (conversations.length === 0) {
      const initialConversation: Conversation = {
        id: generateId(),
        title: "New Conversation",
        messages: [
          {
            id: generateId(),
            role: "assistant",
            content: "Hi, I'm Eclipse.\n\nHow can I help you today?",
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations([initialConversation]);
      setCurrentConversationState(initialConversation);
    }
  }, [conversations.length]);

  // Create a new conversation
  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "New Conversation",
      messages: [
        {
          id: generateId(),
          role: "assistant",
          content: "Hi, I'm Eclipse.\n\nHow can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prevConversations => [...prevConversations, newConversation]);
    setCurrentConversationState(newConversation);
  }, []);

  // Set current conversation by ID
  const setCurrentConversation = useCallback((id: string) => {
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setCurrentConversationState(conversation);
    }
  }, [conversations]);

  // Rename conversation
  const renameConversation = useCallback((id: string, newTitle: string) => {
    if (!newTitle.trim()) {
      toast({
        title: "Error",
        description: "Conversation title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === id 
          ? { ...conv, title: newTitle, updatedAt: new Date() } 
          : conv
      )
    );
    
    if (currentConversation?.id === id) {
      setCurrentConversationState(prev => 
        prev ? { ...prev, title: newTitle, updatedAt: new Date() } : prev
      );
    }
    
    toast({
      title: "Conversation renamed",
      description: `Conversation renamed to "${newTitle}"`,
    });
  }, [currentConversation, toast]);

  // Delete conversation
  const deleteConversation = useCallback((id: string) => {
    setConversations(prevConversations => 
      prevConversations.filter(conv => conv.id !== id)
    );
    
    if (currentConversation?.id === id) {
      const remainingConversations = conversations.filter(conv => conv.id !== id);
      if (remainingConversations.length > 0) {
        setCurrentConversationState(remainingConversations[0]);
      } else {
        createNewConversation();
      }
    }
    
    toast({
      title: "Conversation deleted",
      description: "The conversation has been removed",
    });
  }, [currentConversation, conversations, createNewConversation, toast]);

  // Share conversation
  const shareConversation = useCallback((id: string) => {
    // In a real app, this would generate a shareable link or open a modal
    // For demo purposes, we'll just show a toast
    toast({
      title: "Conversation shared",
      description: "A shareable link has been copied to your clipboard",
    });
  }, [toast]);

  // Send a new message
  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversation) return;

    // Create new user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Create placeholder for assistant response
    const assistantMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    // Update conversation with both messages
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage, assistantMessage],
      updatedAt: new Date(),
    };

    // Update state
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === currentConversation.id ? updatedConversation : conv
      )
    );
    setCurrentConversationState(updatedConversation);

    // Generate assistant response
    await generateResponse(assistantMessage);
  }, [currentConversation]);

  // Generate a response for the assistant
  const generateResponse = useCallback(async (message: Message) => {
    if (!currentConversation) return;
    
    try {
      setIsGenerating(true);
      
      // Get the last user message to respond to
      const userMessages = currentConversation.messages.filter(msg => msg.role === "user");
      const lastUserMessage = userMessages[userMessages.length - 1];
      
      // Generate response
      const responseContent = await mockGenerateResponse(lastUserMessage.content);
      
      // Update the assistant message with the response
      const updatedMessages = currentConversation.messages.map(msg => 
        msg.id === message.id 
          ? { ...msg, content: responseContent, isLoading: false } 
          : msg
      );
      
      const updatedConversation = {
        ...currentConversation,
        messages: updatedMessages,
        updatedAt: new Date(),
      };
      
      // Update conversations state
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === currentConversation.id ? updatedConversation : conv
        )
      );
      setCurrentConversationState(updatedConversation);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Update message to show error
      const updatedMessages = currentConversation.messages.map(msg => 
        msg.id === message.id 
          ? { 
              ...msg, 
              content: "I'm sorry, I encountered an error while processing your request.", 
              isLoading: false 
            } 
          : msg
      );
      
      const updatedConversation = {
        ...currentConversation,
        messages: updatedMessages,
        updatedAt: new Date(),
      };
      
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === currentConversation.id ? updatedConversation : conv
        )
      );
      setCurrentConversationState(updatedConversation);
    } finally {
      setIsGenerating(false);
    }
  }, [currentConversation]);

  // Context value
  const value = {
    conversations,
    currentConversation,
    isGenerating,
    createNewConversation,
    setCurrentConversation,
    sendMessage,
    generateResponse,
    renameConversation,
    deleteConversation,
    shareConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
