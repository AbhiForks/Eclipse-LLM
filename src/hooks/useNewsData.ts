
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getCategoryQuery, getBackupNewsData } from '@/components/discover/NewsUtils';
import type { NewsItem } from '@/components/discover/NewsUtils';

// API configuration
const API_KEY = 'T0AoAzxxjwdPXLeoYn-6RpKb60oT9XJPJFRMU8I-O2F98vrP';
const BASE_URL = 'https://newsapi.org/v2';

// Add relative time method to Date prototype if not exists
if (!Date.prototype.toRelativeTime) {
  Date.prototype.toRelativeTime = function() {
    const now = new Date();
    const diffMs = now.getTime() - this.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay === 1) return 'Yesterday';
    if (diffDay < 30) return `${diffDay} days ago`;
    
    return this.toLocaleDateString();
  };
}

export const useNewsData = (initialCategory: string = "for-you") => {
  const { toast } = useToast();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

      console.log('Fetching news from:', endpoint);
      
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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return {
    newsItems,
    isLoading,
    isFetchingMore,
    hasMore,
    activeCategory,
    loadMoreRef,
    handleCategoryChange
  };
};
