import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  LibraryBig,
  Lock,
  Newspaper,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const MODELS = ["Gemini 3 Pro", "Gemini 3 Flash", "GPT-5.2", "Claude 4.5", "Llama 4"];

const FEATURES = [
  { icon: Layers, title: "Every model, one inbox", body: "Switch between frontier models mid-conversation without losing context." },
  { icon: Zap, title: "Streaming that keeps up", body: "Token-by-token responses with instant stop, retry, and regenerate." },
  { icon: LibraryBig, title: "Library, not chaos", body: "Auto-titled threads, full-text search, favorites, and bulk actions." },
  { icon: Newspaper, title: "Discover what's new", body: "A curated AI news feed and daily digest brewed into the sidebar." },
  { icon: Lock, title: "Private by default", body: "SSO auth, per-workspace keys on the server, nothing secret in the bundle." },
  { icon: Sparkles, title: "Polished to the pixel", body: "AMOLED-native theme, keyboard-first, одинаково fast on phone and desktop." },
];

const STATS = [
  { value: "5+", label: "Frontier models" },
  { value: "<100ms", label: "First token*" },
  { value: "100%", label: "Open interface" },
  { value: "24/7", label: "Available" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--foreground)/0.08),transparent_70%)]"
        />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 pb-16 text-center sm:gap-8 sm:px-6 sm:pb-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Multi-model chat, minus the tab hell
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            One beautiful home for every AI you use
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Eclipse puts Gemini, GPT, Claude, and Llama behind a single fast,
            private, AMOLED-native interface — with a library and news feed built in.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button size="lg" onClick={() => navigate("/chat")} className="gap-2">
              Start chatting <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/discover")}>
              Explore Discover
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-2"
          >
            {MODELS.map((m) => (
              <span key={m} className="rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
                {m}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCT STRIP */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-0 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center sm:py-10">
              <span className="font-display text-2xl font-semibold sm:text-3xl">{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <motion.div {...fadeUp} className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for people who live in chat
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything around the conversation — history, discovery, and speed — handled.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <motion.article
              key={title}
              {...fadeUp}
              transition={{ delay: (i % 3) * 0.08 }}
              className="card-hover rounded-2xl border border-border/70 bg-muted/20 p-6"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-1.5 font-medium">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </motion.article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">*on a warm connection with streaming enabled.</p>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-muted/20 px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,hsl(var(--foreground)/0.1),transparent_70%)]" />
          <h2 className="relative font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop juggling five AI tabs
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
            Bring your keys, pick a model, and start your first thread in under a minute.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => navigate("/chat")} className="gap-2">
              Open Eclipse <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/library")}>
              See the library
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
