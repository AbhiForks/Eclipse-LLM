import { DollarSign, Music, Terminal, ThumbsUp, Trophy, Zap } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const categories = [
  { id: "for-you", label: "For You", icon: ThumbsUp },
  { id: "top", label: "Top", icon: Zap },
  { id: "tech", label: "Hacker News", icon: Terminal },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "arts", label: "Arts & Culture", icon: Music },
  { id: "sports", label: "Sports", icon: Trophy },
];

interface NewsCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const NewsCategories = ({ activeCategory, onCategoryChange }: NewsCategoriesProps) => (
  <Tabs value={activeCategory} onValueChange={onCategoryChange}>
    <TabsList className="flex w-full justify-start gap-1 overflow-x-auto scrollbar-none">
      {categories.map(({ id, label, icon: Icon }) => (
        <TabsTrigger key={id} value={id} className="flex shrink-0 items-center gap-1.5">
          <Icon className="h-4 w-4" />
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

export default NewsCategories;
