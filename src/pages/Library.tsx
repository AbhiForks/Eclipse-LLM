
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Search, LibraryBig, Clock, Star, FilterX, FolderOpen, MessageSquare, CalendarDays, Check } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Library = () => {
  const { conversations, setCurrentConversation } = useChat();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const isMobile = useIsMobile();
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    conversation => conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group conversations by date
  const groupedConversations = filteredConversations.reduce((groups, conversation) => {
    // Creating mock dates for demo purposes
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 10)); // Random date within last 10 days
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    if (!groups[dateString]) {
      groups[dateString] = [];
    }
    
    groups[dateString].push(conversation);
    return groups;
  }, {} as Record<string, typeof conversations>);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className={`flex-1 ${isMobile ? 'pl-0' : 'pl-16'}`}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <LibraryBig className="mr-3 text-primary" size={24} />
            <h1 className="text-2xl font-bold text-gradient">Library</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30 border-border/30 focus-visible:ring-primary/30"
              />
            </div>
            
            <Tabs defaultValue="all" onValueChange={setFilter} className="w-full md:w-auto">
              <TabsList className="bg-muted/30 w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-initial">All</TabsTrigger>
                <TabsTrigger value="starred" className="flex-1 md:flex-initial">Starred</TabsTrigger>
                <TabsTrigger value="recent" className="flex-1 md:flex-initial">Recent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <div className="bg-muted/20 p-4 rounded-full mb-4">
                <FilterX size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No conversations found</h3>
              <p className="text-muted-foreground max-w-md">
                {searchTerm ? 
                  "We couldn't find any conversations matching your search. Try a different term." : 
                  "You haven't had any conversations yet. Start a new chat to begin."}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedConversations).map(([date, convos]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays size={16} className="text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">{date}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {convos.map((conversation) => (
                      <motion.div
                        key={conversation.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                          setCurrentConversation(conversation.id);
                          window.location.href = "/";
                        }}
                        className="bg-card/70 border border-border/30 rounded-xl p-4 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between mb-2">
                          <div className="bg-primary/20 rounded-full p-1.5">
                            <MessageSquare size={16} className="text-primary" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-muted/30">
                              <Star size={14} className="text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-muted/30">
                              <Clock size={14} className="text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium mb-1 truncate">{conversation.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {conversation.messages.length > 1 
                            ? conversation.messages[1]?.content?.slice(0, 100) + "..." 
                            : "No messages yet"}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>
                            {new Date().toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit', 
                              hour12: true 
                            })}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{conversation.messages.length} messages</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Library;
