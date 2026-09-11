import { useState, type FC, type MouseEvent } from "react";
import { Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  description?: string;
  source?: string;
  author?: string;
  imageUrl?: string;
  date?: string;
  url?: string;
}

const NewsCard: FC<NewsCardProps> = ({
  title,
  description,
  source,
  author,
  imageUrl,
  date,
  url,
}) => {
  const [saved, setSaved] = useState(false);

  const openArticle = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleSave = (e: MouseEvent) => {
    e.stopPropagation();
    setSaved((s) => !s);
  };

  return (
    <article
      onClick={openArticle}
      className="card-hover group flex cursor-pointer gap-4 rounded-2xl border border-border/70 bg-muted/20 p-4"
    >
      {imageUrl && (
        <div className="hidden h-24 w-28 shrink-0 overflow-hidden rounded-xl sm:block">
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="line-clamp-2 text-[15px] font-medium leading-snug">{title}</h3>
        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="truncate text-xs text-muted-foreground">
            {author && <span className="font-medium text-foreground">{author} · </span>}
            {source && <span>{source}</span>}
            {date && <span> · {date}</span>}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={saved ? "Unsave" : "Save"} onClick={toggleSave}>
              <Bookmark className={cn("h-4 w-4", saved && "fill-foreground")} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Open article" onClick={(e) => { e.stopPropagation(); openArticle(); }}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
