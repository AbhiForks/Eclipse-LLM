
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { SearchIcon, FolderOpenIcon, MessageSquareIcon, CalendarDaysIcon } from "lucide-react";
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
    <div className="flex min-h-screen w-full bg-black text-white">
      <Sidebar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <FolderOpenIcon className="mr-3 text-purple-500" size={24} />
            <h1 className="text-2xl font-bold">History</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#121212] border-gray-800 focus-visible:ring-purple-500"
              />
            </div>
            
            <Tabs defaultValue="all" onValueChange={setFilter} className="w-full md:w-auto">
              <TabsList className="bg-[#121212] w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-initial data-[state=active]:bg-purple-700">All</TabsTrigger>
                <TabsTrigger value="starred" className="flex-1 md:flex-initial data-[state=active]:bg-purple-700">Starred</TabsTrigger>
                <TabsTrigger value="recent" className="flex-1 md:flex-initial data-[state=active]:bg-purple-700">Recent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <div className="bg-[#121212] p-4 rounded-full mb-4">
                <SearchIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No conversations found</h3>
              <p className="text-gray-400 max-w-md">
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
                    <CalendarDaysIcon size={16} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-400">{date}</h3>
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
                        className="bg-[#121212] border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-purple-800 transition-all"
                      >
                        <div className="flex justify-between mb-2">
                          <div className="bg-purple-900/20 rounded-full p-1.5">
                            <MessageSquareIcon size={16} className="text-purple-500" />
                          </div>
                        </div>
                        <h3 className="font-medium mb-1 truncate">{conversation.title}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {conversation.messages.length > 1 
                            ? conversation.messages[1]?.content?.slice(0, 100) + "..." 
                            : "No messages yet"}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
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
