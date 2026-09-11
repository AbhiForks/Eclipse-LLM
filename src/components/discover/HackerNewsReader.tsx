import { ArrowUpRight, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "./NewsUtils";

const HN = "https://news.ycombinator.com";
const HN_PATHS = [
  { label: "new", href: `${HN}/newest` },
  { label: "ask", href: `${HN}/ask` },
  { label: "show", href: `${HN}/show` },
  { label: "jobs", href: `${HN}/jobs` },
];

const threadUrl = (id: string, fallback: string) => {
  const m = /^hn-(\d+)$/.exec(id);
  return m ? `${HN}/item?id=${m[1]}` : fallback;
};

const domainOf = (u: string) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

interface HackerNewsReaderProps {
  stories: NewsItem[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  onLoadMore: () => void;
}

/** Hacker News, rendered natively inside Discover — every link works. */
const HackerNewsReader = ({
  stories,
  isLoading,
  isFetchingMore,
  hasMore,
  loadMoreRef,
  onLoadMore,
}: HackerNewsReaderProps) => (
  <div className="overflow-hidden rounded-2xl border border-border/70">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-[#ff6600] px-4 py-2.5 text-black">
      <a href={HN} target="_blank" rel="noopener noreferrer" className="font-display text-[15px] font-bold tracking-tight">
        Hacker News
      </a>
      <nav className="flex items-center gap-2 text-[13px]">
        {HN_PATHS.map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-1 py-0.5 transition-colors hover:bg-black/10"
          >
            {p.label}
          </a>
        ))}
      </nav>
      <span className="ml-auto hidden text-xs opacity-70 sm:block">live · no key needed</span>
    </div>

    <ol className="flex flex-col bg-muted/20">
      {stories.map((s, i) => {
        const thread = threadUrl(s.id, s.url);
        const domain = domainOf(s.url);
        return (
          <li
            key={s.id}
            className="flex items-baseline gap-2 border-b border-border/40 px-4 py-2.5 last:border-0"
          >
            <span className="w-6 shrink-0 text-right text-[13px] tabular-nums text-muted-foreground">
              {i + 1}.
            </span>
            <div className="min-w-0">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] leading-snug hover:underline"
              >
                {s.title}
              </a>
              {domain && (
                <span className="ml-1.5 text-xs text-muted-foreground">({domain})</span>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">
                {s.description.split("—")[0].trim()} ·{" "}
                <a
                  href={thread}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  discuss
                </a>
              </p>
            </div>
          </li>
        );
      })}
      {isLoading && stories.length === 0 && (
        <li className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Fetching front page…
        </li>
      )}
    </ol>

    <div ref={loadMoreRef} className="flex items-center justify-center gap-3 bg-muted/20 px-4 py-3">
      {isFetchingMore ? (
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading more…
        </span>
      ) : hasMore && stories.length > 0 ? (
        <Button variant="ghost" size="sm" onClick={onLoadMore} className="gap-1">
          More <ChevronDown className="h-4 w-4" />
        </Button>
      ) : (
        stories.length > 0 && (
          <a
            href={HN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Continue on news.ycombinator.com <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )
      )}
    </div>
  </div>
);

export default HackerNewsReader;
