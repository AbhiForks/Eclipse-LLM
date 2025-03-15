
import { motion } from "framer-motion";
import { FC } from "react";

interface NewsCardProps {
  title: string;
  source?: string;
  imageUrl?: string;
  date?: string;
  onClick?: () => void;
}

const NewsCard: FC<NewsCardProps> = ({ 
  title, 
  source, 
  imageUrl, 
  date = new Date().toLocaleDateString(),
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/10 backdrop-blur-sm transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {imageUrl && (
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-80" />
        </div>
      )}
      
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h3 className="text-sm font-medium line-clamp-2 text-white/90">{title}</h3>
          {source && <p className="text-xs text-purple-300 mt-1">{source}</p>}
        </div>
        {date && <p className="text-xs text-orange-300/80 mt-1">{date}</p>}
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-orange-500/10 opacity-0"
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default NewsCard;
