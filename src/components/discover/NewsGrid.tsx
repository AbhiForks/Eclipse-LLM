
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGoogleNewsUrl } from "./NewsUtils";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  author?: string;
  imageUrl: string;
  date: string;
  category: string;
  url: string;
  commentCount?: number;
}

interface NewsGridProps {
  newsItems: NewsItem[];
  isFetchingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  category: string;
}

const NewsGrid = ({ newsItems, isFetchingMore, hasMore, loadMoreRef, category }: NewsGridProps) => {
  const openGoogleNews = () => {
    window.open(getGoogleNewsUrl(category), '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {newsItems.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + (index % 10) * 0.05 }}
          >
            <NewsCard 
              title={news.title}
              author={news.author || news.source}
              imageUrl={news.imageUrl}
              date={news.date}
              commentCount={news.commentCount || Math.floor(Math.random() * 100)}
              index={index + 1}
              onClick={() => window.open(news.url, '_blank')}
              hasActions
            />
          </motion.div>
        ))}
      </div>
      
      {/* Google News Link */}
      <div className="flex justify-center my-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-[#d946ef] text-[#d946ef] hover:bg-[#d946ef]/10"
          onClick={openGoogleNews}
        >
          <ExternalLink size={16} />
          More from Google News
        </Button>
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
  );
};

export default NewsGrid;
