import AppShell from "@/components/AppShell";
import NewsCategories from "@/components/discover/NewsCategories";
import FeaturedNews from "@/components/discover/FeaturedNews";
import NewsGrid from "@/components/discover/NewsGrid";
import NewsLoader from "@/components/discover/NewsLoader";
import { useNewsData } from "@/hooks/useNewsData";

const Discover = () => {
  const {
    newsItems,
    isLoading,
    isFetchingMore,
    hasMore,
    activeCategory,
    loadMoreRef,
    handleCategoryChange,
  } = useNewsData();

  const [featured, ...rest] = newsItems;

  return (
    <AppShell
      header={
        <div className="shrink-0 border-b border-border/60 bg-background px-4 py-4 sm:px-6">
          <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">Discover</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">AI news and research, curated daily</p>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
        <NewsCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        {isLoading ? (
          <NewsLoader />
        ) : (
          <>
            {featured && <FeaturedNews news={featured} />}
            <NewsGrid
              newsItems={rest}
              isFetchingMore={isFetchingMore}
              hasMore={hasMore}
              loadMoreRef={loadMoreRef}
              category={activeCategory}
            />
          </>
        )}
      </div>
    </AppShell>
  );
};

export default Discover;
