import { motion } from "framer-motion";
import type { FC } from "react";
import { Bookmark, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  description?: string;
  source?: string;
  author?: string;
  imageUrl?: string;
  date?: string;
  commentCount?: number;
  index?: number;
  hasActions?: boolean;
  onClick?: () => void;
}

const NewsCard: FC<NewsCardProps> = ({
  title,
  description,
  source,
  author,
  imageUrl,
  date = new Date().toLocaleDateString(),
  commentCount = 0,
  index,
  hasActions = false,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex overflow-hidden rounded-xl bg-[#121212] border border-[#333333] shadow-md transition-all duration-300 cursor-pointer h-full"
      onClick={onClick}
    >
      {index !== undefined && (
        <div className="flex items-center justify-center w-10 h-10 bg-[#1e1e1e] text-gray-400 font-medium">
          {index}
        </div>
      )}

      {imageUrl && (
        <div className="w-24 h-24 overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col p-4 flex-1">
        <h3 className="text-base font-medium line-clamp-2 mb-2 text-white/90">
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {author && (
              <p className="text-xs text-[#d946ef] font-medium">{author}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {date && <span>{date}</span>}
              {commentCount > 0 && (
                <div className="flex items-center gap-1">
                  <span>|</span>
                  <MessageSquare size={12} />
                  <span>{commentCount}</span>
                </div>
              )}
            </div>
          </div>

          {hasActions && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-[#d946ef]/20"
              >
                <Bookmark size={14} className="text-[#d946ef]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-[#d946ef]/20"
              >
                <ExternalLink size={14} className="text-[#d946ef]" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#d946ef]/10 to-transparent opacity-0"
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default NewsCard;
