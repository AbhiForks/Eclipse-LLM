
import { Loader2 } from "lucide-react";

const NewsLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 text-[#d946ef] animate-spin mb-4" />
      <p className="text-gray-400">Loading latest news...</p>
    </div>
  );
};

export default NewsLoader;
