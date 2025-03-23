
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Globe, Zap, DollarSign, Newspaper, Music, Trophy, 
  ChevronRight, BookOpen, Bookmark, ThumbsUp, Loader2,
  Filter, Search
} from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

// News categories
const categories = [
  { id: "for-you", label: "For You", icon: <ThumbsUp size={16} /> },
  { id: "top", label: "Top", icon: <Zap size={16} /> },
  { id: "tech", label: "Tech & Science", icon: <Globe size={16} /> },
  { id: "finance", label: "Finance", icon: <DollarSign size={16} /> },
  { id: "arts", label: "Arts & Culture", icon: <Music size={16} /> },
  { id: "sports", label: "Sports", icon: <Trophy size={16} /> }
];

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  imageUrl: string;
  date: string;
  category: string;
  url: string;
}

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState("for-you");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // API endpoint and key
  const API_KEY = "c5ac9c9e7fd845a8846d895a573591ea";
  const BASE_URL = "https://newsapi.org/v2";

  const getCategoryQuery = (category: string) => {
    switch(category) {
      case "tech": return "technology";
      case "finance": return "business";
      case "arts": return "entertainment";
      case "sports": return "sports";
      case "top": return "";
      default: return "general";
    }
  };

  const fetchNews = useCallback(async (reset = false) => {
    const currentPage = reset ? 1 : page;
    
    if (reset) {
      setIsLoading(true);
      setNewsItems([]);
      setPage(1);
      setHasMore(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const categoryQuery = getCategoryQuery(activeCategory);
      let endpoint = `${BASE_URL}/top-headlines?apiKey=${API_KEY}&language=en&page=${currentPage}&pageSize=10`;
      
      if (categoryQuery) {
        endpoint += `&category=${categoryQuery}`;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.status === 'ok' && data.articles) {
        const newArticles = data.articles.map((article: any, index: number) => ({
          id: `${currentPage}-${index}-${Date.now()}`,
          title: article.title || "No title available",
          description: article.description || "No description available",
          source: article.source?.name || "Unknown Source",
          imageUrl: article.urlToImage || `https://placehold.co/600x400/272727/ffffff?text=News`,
          date: article.publishedAt ? new Date(article.publishedAt).toRelativeTime() : "Recently",
          category: categoryQuery || "general",
          url: article.url
        }));
        
        setNewsItems(prevItems => reset ? newArticles : [...prevItems, ...newArticles]);
        setHasMore(currentPage * 10 < data.totalResults);
        
        if (!reset) {
          setPage(prev => prev + 1);
        }
      } else {
        console.error('Failed to fetch news:', data);
        toast({
          title: "Unable to fetch latest news",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
        
        // If the API fails, use backup data
        if (reset) {
          setNewsItems(getBackupNewsData(activeCategory));
        }
        
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      
      if (reset) {
        setNewsItems(getBackupNewsData(activeCategory));
        toast({
          title: "Connection error",
          description: "Using cached news instead. Please check your internet connection.",
          variant: "destructive",
        });
      }
      
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [activeCategory, page, toast]);

  // Initial fetch when category changes
  useEffect(() => {
    fetchNews(true);
  }, [activeCategory]);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    if (isLoading || isFetchingMore) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        fetchNews();
      }
    };
    
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '100px'
    });
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, isFetchingMore, hasMore, fetchNews]);

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <Sidebar />
      <main className={`flex-1 ${isMobile ? 'pl-0' : 'pl-16'}`}>
        <ScrollArea className="h-screen">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <Globe className="mr-3 text-[#d946ef]" size={24} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d946ef] to-[#d946ef] bg-clip-text text-transparent">Discover</h1>
            </div>
            
            <Tabs defaultValue="for-you" className="mb-6" onValueChange={setActiveCategory}>
              <TabsList className="bg-[#1e1e1e] p-1 overflow-x-auto w-full flex space-x-1 scrollbar-none">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-[#d946ef] data-[state=active]:text-white"
                  >
                    {category.icon}
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-[#d946ef] animate-spin mb-4" />
                <p className="text-gray-400">Loading latest news...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Featured news (first item) */}
                {newsItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#333333] shadow-lg"
                  >
                    <div className="relative aspect-video w-full">
                      <img 
                        src={newsItems[0].imageUrl} 
                        alt={newsItems[0].title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-2xl font-bold text-white mb-2">{newsItems[0].title}</h2>
                        <p className="text-gray-300 mb-3 line-clamp-2">{newsItems[0].description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{newsItems[0].source} • {newsItems[0].date}</span>
                          <div className="flex items-center gap-3">
                            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                              <Bookmark size={16} className="text-white" />
                            </button>
                            <a href={newsItems[0].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d946ef]/90 text-white text-sm hover:bg-[#d946ef] transition-colors">
                              <BookOpen size={14} />
                              <span>Read</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* News grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newsItems.slice(1).map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + (index % 10) * 0.05 }}
                    >
                      <NewsCard 
                        title={news.title}
                        description={news.description}
                        source={news.source}
                        imageUrl={news.imageUrl}
                        date={news.date}
                        onClick={() => window.open(news.url, '_blank')}
                        hasActions
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Loader for infinite scrolling */}
                <div ref={loadMoreRef} className="py-8 flex justify-center">
                  {isFetchingMore && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 text-[#d946ef] animate-spin" />
                      <p className="text-sm text-gray-400">Loading more stories...</p>
                    </div>
                  )}
                  
                  {!hasMore && newsItems.length > 0 && (
                    <p className="text-sm text-gray-500">No more stories to load</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

// Add a relative time formatter method to Date prototype
declare global {
  interface Date {
    toRelativeTime(): string;
  }
}

Date.prototype.toRelativeTime = function() {
  const now = new Date();
  const diffMs = now.getTime() - this.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return this.toLocaleDateString();
};

// Backup news data in case API fails
const getBackupNewsData = (category: string): NewsItem[] => {
  const techNews = [
    {
      id: '1',
      title: "Meta Maneuvers to Block Tell-All Document Release",
      description: "According to reports, Meta has launched aggressive legal measures to block former employee Sarah Wynn-Williams from promoting her memoir 'Careless People.'",
      source: "Tech News Daily",
      imageUrl: "https://placehold.co/400x200/3a1c71/ffffff?text=Meta",
      date: "2 hours ago",
      category: "tech",
      url: "https://example.com/article1"
    },
    {
      id: '2',
      title: "AI Scientist Generates First Peer-Reviewed Research Paper",
      description: "An AI system called ResearchGPT has authored a scientific paper that passed peer review without human intervention, raising questions about the future of academic publishing.",
      source: "Science Today",
      imageUrl: "https://placehold.co/400x200/662d8c/ffffff?text=AI",
      date: "5 hours ago",
      category: "tech",
      url: "https://example.com/article2"
    },
    {
      id: '3',
      title: "New Quantum Computing Breakthrough Challenges Encryption",
      description: "Scientists at MIT have demonstrated a quantum algorithm that could potentially break widely used cryptographic protocols, increasing calls for quantum-resistant security.",
      source: "Future Tech",
      imageUrl: "https://placehold.co/400x200/862d9c/ffffff?text=Quantum",
      date: "Yesterday",
      category: "tech",
      url: "https://example.com/article3"
    }
  ];

  const financeNews = [
    {
      id: '4',
      title: "Fed Maintains Interest Rates Despite Inflation Concerns",
      description: "The Federal Reserve has decided to maintain current interest rates despite growing inflation concerns, citing steady economic growth and employment figures.",
      source: "Economic Times",
      imageUrl: "https://placehold.co/400x200/403d65/ffffff?text=Finance",
      date: "3 hours ago",
      category: "finance",
      url: "https://example.com/article4"
    },
    {
      id: '5',
      title: "Cryptocurrency Market Sees $100B Surge After Regulatory Clarity",
      description: "Major cryptocurrencies experienced a significant price rally following new regulatory guidelines that provided clearer frameworks for institutional investors.",
      source: "Crypto News",
      imageUrl: "https://placehold.co/400x200/5d3a9c/ffffff?text=Crypto",
      date: "1 day ago",
      category: "finance",
      url: "https://example.com/article5"
    },
    {
      id: '6',
      title: "Tech Giant Announces Record-Breaking Quarterly Earnings",
      description: "Apple has reported its highest quarterly revenue ever, exceeding analyst expectations with $97.3 billion in revenue driven by strong iPhone and Services growth.",
      source: "Market Watch",
      imageUrl: "https://placehold.co/400x200/2e1c51/ffffff?text=Tech",
      date: "Yesterday",
      category: "finance",
      url: "https://example.com/article6"
    }
  ];

  if (category === 'tech') return techNews;
  if (category === 'finance') return financeNews;
  return [...techNews, ...financeNews];
};

export default Discover;
