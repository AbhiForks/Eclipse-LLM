
import { motion } from "framer-motion";
import { Bookmark, BookOpen } from "lucide-react";

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

interface FeaturedNewsProps {
  news: NewsItem;
}

const FeaturedNews = ({ news }: FeaturedNewsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#333333] shadow-lg"
    >
      <div className="relative aspect-video w-full">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{news.title}</h2>
          <p className="text-gray-300 mb-3 line-clamp-2">{news.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{news.source} • {news.date}</span>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Bookmark size={16} className="text-white" />
              </button>
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d946ef]/90 text-white text-sm hover:bg-[#d946ef] transition-colors">
                <BookOpen size={14} />
                <span>Read</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedNews;
