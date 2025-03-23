
import { ThumbsUp, Zap, Globe, DollarSign, Music, Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// News categories
export const categories = [
  { id: "for-you", label: "For You", icon: <ThumbsUp size={16} /> },
  { id: "top", label: "Top", icon: <Zap size={16} /> },
  { id: "tech", label: "Tech & Science", icon: <Globe size={16} /> },
  { id: "finance", label: "Finance", icon: <DollarSign size={16} /> },
  { id: "arts", label: "Arts & Culture", icon: <Music size={16} /> },
  { id: "sports", label: "Sports", icon: <Trophy size={16} /> }
];

interface NewsCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const NewsCategories = ({ activeCategory, onCategoryChange }: NewsCategoriesProps) => {
  return (
    <Tabs defaultValue={activeCategory} className="mb-6" onValueChange={onCategoryChange}>
      <TabsList className="bg-[#1e1e1e] p-1 overflow-x-auto w-full flex space-x-1 scrollbar-none">
        {categories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-[#d946ef] data-[state=active]:text-white"
          >
            {category.icon}
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default NewsCategories;
