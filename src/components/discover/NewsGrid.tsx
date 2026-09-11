import { ExternalLink, Loader2 } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { getGoogleNewsUrl } from "./NewsUtils";
import type { NewsItem } from "./NewsUtils";

interface NewsGridProps {
  newsItems: NewsItem[];
  isFetchingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  category: string;
}

const NewsGrid = ({ newsItems, isFetchingMore, hasMore, loadMoreRef, category }: NewsGridProps) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {newsItems.map((news) => (
        <NewsCard
          key={news.id}
          title={news.title}
          description={news.description}
          source={news.source}
          author={news.author}
          imageUrl={news.imageUrl}
          date={news.date}
          url={news.url}
        />
      ))}
    </div>

    <div className="flex justify-center py-2">
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => window.open(getGoogleNewsUrl(category), "_blank", "noopener,noreferrer")}
      >
        <ExternalLink className="h-4 w-4" />
        More from Google News
      </Button>
    </div>

    <div ref={loadMoreRef} className="flex justify-center py-4">
      {isFetchingMore && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading more stories…
        </p>
      )}
      {!hasMore && newsItems.length > 0 && !isFetchingMore && (
        <p className="text-sm text-muted-foreground">You&apos;re all caught up</p>
      )}
    </div>
  </div>
);

export default NewsGrid;
