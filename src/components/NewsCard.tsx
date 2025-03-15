
import { motion } from "framer-motion";
import { FC } from "react";
import { Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  description?: string;
  source?: string;
  imageUrl?: string;
  date?: string;
  hasActions?: boolean;
  onClick?: () => void;
}

const NewsCard: FC<NewsCardProps> = ({ 
  title, 
  description,
  source, 
  imageUrl, 
  date = new Date().toLocaleDateString(),
  hasActions = false,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex flex-col overflow-hidden rounded-xl bg-card/70 border border-border/30 shadow-md transition-all duration-300 cursor-pointer h-full"
      onClick={onClick}
    >
      {imageUrl && (
        <div className="w-full h-32 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
      )}
      
      <div className="flex flex-col p-4 flex-1">
        <h3 className="text-base font-medium line-clamp-2 mb-2 text-white/90">{title}</h3>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            {source && <p className="text-xs text-primary">{source}</p>}
            {date && <p className="text-xs text-muted-foreground">{date}</p>}
          </div>
          
          {hasActions && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary/20">
                <Bookmark size={14} className="text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary/20">
                <ExternalLink size={14} className="text-primary" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-500/10 opacity-0"
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default NewsCard;
