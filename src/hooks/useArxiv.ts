import { useCallback, useEffect, useState } from "react";

export interface ArxivPaper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  published: string;
  absUrl: string;
  pdfUrl: string;
}

export const ARXIV_CATS = [
  { id: "cs.AI", label: "AI" },
  { id: "cs.CL", label: "NLP" },
  { id: "cs.LG", label: "ML" },
  { id: "cs.CV", label: "Vision" },
  { id: "cs.RO", label: "Robotics" },
];

const BACKUP: ArxivPaper[] = [
  {
    id: "1706.03762",
    title: "Attention Is All You Need",
    authors: ["Vaswani et al."],
    summary:
      "The transformer architecture — dispensing with recurrence and convolutions entirely — that underpins virtually every modern LLM.",
    published: "2017-06-12",
    absUrl: "https://arxiv.org/abs/1706.03762",
    pdfUrl: "https://arxiv.org/pdf/1706.03762",
  },
  {
    id: "1810.04805",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: ["Devlin et al."],
    summary:
      "Masked language modeling plus next-sentence prediction; the blueprint for bidirectional pre-training.",
    published: "2018-10-11",
    absUrl: "https://arxiv.org/abs/1810.04805",
    pdfUrl: "https://arxiv.org/pdf/1810.04805",
  },
  {
    id: "2005.14165",
    title: "Language Models are Few-Shot Learners",
    authors: ["Brown et al."],
    summary:
      "GPT-3: scaling to 175B parameters unlocks in-context few-shot learning across dozens of NLP tasks.",
    published: "2020-05-28",
    absUrl: "https://arxiv.org/abs/2005.14165",
    pdfUrl: "https://arxiv.org/pdf/2005.14165",
  },
];

const text = (el: Element | null | undefined) =>
  (el?.textContent ?? "").replace(/\s+/g, " ").trim();

const parseAtom = (xml: string): ArxivPaper[] => {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const entries = Array.from(doc.getElementsByTagName("entry"));
  return entries
    .map((e) => {
      const rawId = text(e.getElementsByTagName("id")[0]);
      const id = rawId.split("/abs/")[1]?.split("v")[0] ?? rawId;
      const links = Array.from(e.getElementsByTagName("link"));
      const pdf =
        links.find((l) => l.getAttribute("title") === "pdf")?.getAttribute("href") ??
        `https://arxiv.org/pdf/${id}`;
      return {
        id,
        title: text(e.getElementsByTagName("title")[0]),
        authors: Array.from(e.getElementsByTagName("author")).map((a) =>
          text(a.getElementsByTagName("name")[0]),
        ),
        summary: text(e.getElementsByTagName("summary")[0]),
        published: (text(e.getElementsByTagName("published")[0]) || "").slice(0, 10),
        absUrl: `https://arxiv.org/abs/${id}`,
        pdfUrl: pdf,
      };
    })
    .filter((p) => p.title);
};

export const useArxiv = () => {
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("cat:cs.AI");
  const [submitted, setSubmitted] = useState("cat:cs.AI");

  const search = useCallback((q: string) => {
    setSubmitted(q.trim() || "cat:cs.AI");
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsLoading(true);
      try {
        const api =
          `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(submitted)}` +
          `&start=0&max_results=15&sortBy=submittedDate&sortOrder=descending`;
        const proxied = `https://api.allorigins.win/get?url=${encodeURIComponent(api)}`;
        const res = await fetch(proxied);
        if (!res.ok) throw new Error("proxy failed");
        const { contents } = (await res.json()) as { contents: string };
        const parsed = parseAtom(contents);
        if (!cancelled) setPapers(parsed.length > 0 ? parsed : BACKUP);
      } catch {
        if (!cancelled) setPapers(BACKUP);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [submitted]);

  return { papers, isLoading, query, setQuery, search };
};
