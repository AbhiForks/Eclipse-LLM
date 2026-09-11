import { Loader2 } from "lucide-react";

const NewsLoader = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
    <Loader2 className="h-8 w-8 animate-spin" />
    <p className="text-sm">Loading latest news…</p>
  </div>
);

export default NewsLoader;
