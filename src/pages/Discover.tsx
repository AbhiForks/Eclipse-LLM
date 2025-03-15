
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, Zap, DollarSign, Newspaper, Music, Football, 
  ChevronRight, BookOpen, Bookmark, ThumbsUp
} from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample news data with categories
const newsItems = [
  {
    id: 1,
    title: "Meta Maneuvers to Block Tell-All Document Release",
    description: "According to reports, Meta has launched aggressive legal measures to block former employee Sarah Wynn-Williams from promoting her memoir 'Careless People.'",
    source: "Tech News Daily",
    imageUrl: "https://placehold.co/400x200/3a1c71/ffffff?text=Meta",
    date: "2 hours ago",
    category: "tech"
  },
  {
    id: 2,
    title: "AI Scientist Generates First Peer-Reviewed Research Paper",
    description: "An AI system called ResearchGPT has authored a scientific paper that passed peer review without human intervention, raising questions about the future of academic publishing.",
    source: "Science Today",
    imageUrl: "https://placehold.co/400x200/662d8c/ffffff?text=AI",
    date: "5 hours ago",
    category: "tech"
  },
  {
    id: 3,
    title: "New Quantum Computing Breakthrough Challenges Encryption",
    description: "Scientists at MIT have demonstrated a quantum algorithm that could potentially break widely used cryptographic protocols, increasing calls for quantum-resistant security.",
    source: "Future Tech",
    imageUrl: "https://placehold.co/400x200/862d9c/ffffff?text=Quantum",
    date: "Yesterday",
    category: "tech"
  },
  {
    id: 4,
    title: "Fed Maintains Interest Rates Despite Inflation Concerns",
    description: "The Federal Reserve has decided to maintain current interest rates despite growing inflation concerns, citing steady economic growth and employment figures.",
    source: "Economic Times",
    imageUrl: "https://placehold.co/400x200/403d65/ffffff?text=Finance",
    date: "3 hours ago",
    category: "finance"
  },
  {
    id: 5,
    title: "Cryptocurrency Market Sees $100B Surge After Regulatory Clarity",
    description: "Major cryptocurrencies experienced a significant price rally following new regulatory guidelines that provided clearer frameworks for institutional investors.",
    source: "Crypto News",
    imageUrl: "https://placehold.co/400x200/5d3a9c/ffffff?text=Crypto",
    date: "1 day ago",
    category: "finance"
  },
  {
    id: 6,
    title: "Tech Giant Announces Record-Breaking Quarterly Earnings",
    description: "Apple has reported its highest quarterly revenue ever, exceeding analyst expectations with $97.3 billion in revenue driven by strong iPhone and Services growth.",
    source: "Market Watch",
    imageUrl: "https://placehold.co/400x200/2e1c51/ffffff?text=Tech",
    date: "Yesterday",
    category: "finance"
  }
];

// News categories
const categories = [
  { id: "for-you", label: "For You", icon: <ThumbsUp size={16} /> },
  { id: "top", label: "Top", icon: <Zap size={16} /> },
  { id: "tech", label: "Tech & Science", icon: <Globe size={16} /> },
  { id: "finance", label: "Finance", icon: <DollarSign size={16} /> },
  { id: "arts", label: "Arts & Culture", icon: <Music size={16} /> },
  { id: "sports", label: "Sports", icon: <Football size={16} /> }
];

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState("for-you");
  const isMobile = useIsMobile();

  // Filter news based on active category
  const filteredNews = activeCategory === "for-you" || activeCategory === "top" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className={`flex-1 ${isMobile ? 'pl-0' : 'pl-16'}`}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Globe className="mr-3 text-primary" size={24} />
            <h1 className="text-2xl font-bold text-gradient">Discover</h1>
          </div>
          
          <Tabs defaultValue="for-you" className="mb-6" onValueChange={setActiveCategory}>
            <TabsList className="bg-muted/30 p-1 overflow-x-auto w-full flex space-x-1 scrollbar-none">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {category.icon}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="space-y-6">
            {/* Featured news (first item) */}
            {filteredNews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card/70 rounded-xl overflow-hidden border border-border/30 shadow-lg"
              >
                <div className="relative aspect-video w-full">
                  <img 
                    src={filteredNews[0].imageUrl} 
                    alt={filteredNews[0].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{filteredNews[0].title}</h2>
                    <p className="text-gray-300 mb-3 line-clamp-2">{filteredNews[0].description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{filteredNews[0].source} • {filteredNews[0].date}</span>
                      <div className="flex items-center gap-3">
                        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Bookmark size={16} className="text-white" />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-white text-sm hover:bg-primary transition-colors">
                          <BookOpen size={14} />
                          <span>Read</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Rest of the news grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNews.slice(1).map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <NewsCard 
                    title={news.title}
                    description={news.description}
                    source={news.source}
                    imageUrl={news.imageUrl}
                    date={news.date}
                    onClick={() => console.log(`Opening news: ${news.title}`)}
                    hasActions
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
                <span>View more stories</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
