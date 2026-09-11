import { motion } from "framer-motion";
import { BookOpen, Bookmark } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NewsItem } from "./NewsUtils";

const FeaturedNews = ({ news }: { news: NewsItem }) => {
  const [saved, setSaved] = useState(false);
  const openArticle = () => {
    if (news.url) window.open(news.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-muted/20"
      onClick={openArticle}
    >
      <div className="relative aspect-[16/8] w-full overflow-hidden sm:aspect-[16/6]">
        <img
          src={news.imageUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6">
          <h2 className="text-balance text-xl font-semibold leading-tight sm:text-2xl">{news.title}</h2>
          <p className="line-clamp-2 max-w-2xl text-sm text-muted-foreground">{news.description}</p>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="truncate text-xs text-muted-foreground">{news.source} · {news.date}</span>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                aria-label={saved ? "Unsave" : "Save"}
                onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
              >
                <Bookmark className={cn("h-4 w-4", saved && "fill-foreground")} />
              </Button>
              <Button size="sm" className="gap-1.5" onClick={(e) => { e.stopPropagation(); openArticle(); }}>
                <BookOpen className="h-4 w-4" /> Read
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedNews;
