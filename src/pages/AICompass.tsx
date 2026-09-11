import { ArrowUpRight, CalendarDays, Compass } from "lucide-react";
import AppShell from "@/components/AppShell";
import FeaturedNews from "@/components/discover/FeaturedNews";
import NewsCard from "@/components/NewsCard";
import NewsLoader from "@/components/discover/NewsLoader";
import { useNewsData } from "@/hooks/useNewsData";

const SOURCES = [
  {
    name: "NeatPrompts AI News",
    body: "Daily AI news digest and prompt drops",
    url: "https://www.neatprompts.com",
  },
  {
    name: "SingularityHub",
    body: "Long-form science and exponential tech",
    url: "https://singularityhub.com",
  },
  {
    name: "Google News · AI topic",
    body: "Live AI topic feed with per-publisher paths",
    url: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB",
  },
];

const AICompass = () => {
  const { newsItems, isLoading } = useNewsData("tech");
  const [featured, ...rest] = newsItems;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <AppShell
      header={
        <div className="shrink-0 border-b border-border/60 bg-background px-4 py-4 sm:px-6">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" /> {today}
          </p>
          <h1 className="mt-1 flex items-center gap-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            <Compass className="h-5 w-5" /> AI Compass
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Your daily orientation in AI</p>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-6">
        {isLoading ? (
          <NewsLoader />
        ) : (
          <>
            {featured && <FeaturedNews news={featured} />}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {rest.slice(0, 6).map((n) => (
                <NewsCard
                  key={n.id}
                  title={n.title}
                  description={n.description}
                  source={n.source}
                  imageUrl={n.imageUrl}
                  date={n.date}
                  url={n.url}
                />
              ))}
            </div>
          </>
        )}

        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Go to the source
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {SOURCES.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4"
              >
                <span>
                  <span className="block font-medium">{s.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{s.body}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
};

export default AICompass;
