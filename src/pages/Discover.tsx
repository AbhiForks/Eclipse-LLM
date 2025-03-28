
import { Globe } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

// Import refactored components
import NewsCategories from "@/components/discover/NewsCategories";
import NewsLoader from "@/components/discover/NewsLoader";
import FeaturedNews from "@/components/discover/FeaturedNews";
import NewsGrid from "@/components/discover/NewsGrid";
import { useNewsData } from "@/hooks/useNewsData";

const Discover = () => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { 
    newsItems, 
    isLoading, 
    isFetchingMore, 
    hasMore, 
    activeCategory, 
    loadMoreRef, 
    handleCategoryChange 
  } = useNewsData();

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <Sidebar onToggle={setSidebarCollapsed} />
      <main className={`flex-1 ${isMobile ? 'pl-0' : (sidebarCollapsed ? 'pl-16' : 'pl-64')}`}>
        <ScrollArea className="h-screen">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <Globe className="mr-3 text-[#d946ef]" size={24} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d946ef] to-[#d946ef] bg-clip-text text-transparent">Discover</h1>
            </div>
            
            <NewsCategories 
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            {isLoading ? (
              <NewsLoader />
            ) : (
              <div className="space-y-6">
                {/* Featured news (first item) */}
                {newsItems.length > 0 && (
                  <FeaturedNews news={newsItems[0]} />
                )}
                
                {/* News grid */}
                <NewsGrid 
                  newsItems={newsItems.slice(1)} 
                  isFetchingMore={isFetchingMore}
                  hasMore={hasMore}
                  loadMoreRef={loadMoreRef}
                  category={activeCategory}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Discover;
