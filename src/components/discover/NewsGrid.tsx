
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { Loader2 } from "lucide-react";

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

interface NewsGridProps {
  newsItems: NewsItem[];
  isFetchingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
}

const NewsGrid = ({ newsItems, isFetchingMore, hasMore, loadMoreRef }: NewsGridProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.map((news, index) => (
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
  );
};

export default NewsGrid;
