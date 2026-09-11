import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Edit,
  FileText,
  FilterX,
  LibraryBig,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Search,
  Trash2,
} from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { useArxiv, ARXIV_CATS } from "@/hooks/useArxiv";
import AppShell from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ChatsTab = () => {
  const { conversations, setCurrentConversation, renameConversation, deleteConversation } =
    useChat();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const filtered = conversations.filter((c) => {
    if (!c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filter === "recent") return new Date(c.updatedAt).getTime() >= weekAgo;
    return true;
  });

  const grouped = filtered.reduce(
    (groups, c) => {
      const key = new Date(c.updatedAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      (groups[key] ??= []).push(c);
      return groups;
    },
    {} as Record<string, typeof conversations>,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all" className="flex-1 md:flex-initial">All</TabsTrigger>
            <TabsTrigger value="recent" className="flex-1 md:flex-initial">Recent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/40">
            <FilterX className="h-6 w-6 text-muted-foreground" />
          </span>
          <h3 className="font-medium">No conversations found</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            {searchTerm
              ? "Try a different search term."
              : "Start a new chat to begin your library."}
          </p>
          <Button
            onClick={() => {
              toast({ title: "New conversation", description: "Starting a new chat session" });
              navigate("/chat");
            }}
          >
            New chat
          </Button>
        </div>
      ) : (
        Object.entries(grouped).map(([date, convos]) => (
          <section key={date}>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">{date}</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {convos.map((c) => (
                <motion.article
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setCurrentConversation(c.id);
                    navigate("/chat");
                  }}
                  className="card-hover cursor-pointer rounded-2xl border border-border/70 bg-muted/20 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10">
                      <MessageSquare className="h-4 w-4" />
                    </span>
                    <span className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        aria-label="Rename"
                        onClick={() => {
                          setSelectedId(c.id);
                          setNewTitle(c.title);
                          setRenameOpen(true);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:text-destructive"
                        aria-label="Delete"
                        onClick={() => {
                          setSelectedId(c.id);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </span>
                  </div>
                  <h4 className="truncate font-medium">{c.title}</h4>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {c.messages.length > 1
                      ? `${c.messages[1]?.content?.slice(0, 100)}…`
                      : "No messages yet"}
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(c.updatedAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    <span className="mx-1">·</span> {c.messages.length} messages
                  </p>
                </motion.article>
              ))}
            </div>
          </section>
        ))
      )}

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>Enter a new name for this conversation.</DialogDescription>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New conversation title"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (selectedId && newTitle.trim()) {
                  renameConversation(selectedId, newTitle);
                  setRenameOpen(false);
                }
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this conversation. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedId && deleteConversation(selectedId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ArxivTab = () => {
  const { papers, isLoading, query, setQuery, search } = useArxiv();

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          search(query.startsWith("cat:") || query.startsWith("all:") ? query : `all:${query}`);
        }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search arXiv — try ‘diffusion’, ‘all:transformer’…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Search</Button>
          <Button
            type="button"
            variant="outline"
            className="gap-1.5"
            onClick={() => window.open("https://arxiv.org", "_blank", "noopener,noreferrer")}
          >
            arxiv.org <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {ARXIV_CATS.map((c) => (
          <Button
            key={c.id}
            variant="secondary"
            size="sm"
            onClick={() => {
              setQuery(`cat:${c.id}`);
              search(`cat:${c.id}`);
            }}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <p className="flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Querying arXiv…
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {papers.map((p) => (
            <article
              key={p.id}
              className="card-hover flex flex-col gap-2 rounded-2xl border border-border/70 bg-muted/20 p-4"
            >
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileText className="h-3.5 w-3.5" /> arXiv:{p.id} · {p.published}
              </p>
              <h4 className="font-medium leading-snug">{p.title}</h4>
              <p className="truncate text-xs text-muted-foreground">
                {p.authors.slice(0, 4).join(", ")}
                {p.authors.length > 4 && ` +${p.authors.length - 4} more`}
              </p>
              <p className="line-clamp-3 text-sm text-muted-foreground">{p.summary}</p>
              <div className="mt-auto flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="gap-1.5" asChild>
                  <a href={p.absUrl} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-3.5 w-3.5" /> Abstract
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5" asChild>
                  <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer">
                    PDF <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const Library = () => {
  const [tab, setTab] = useState("chats");

  return (
    <AppShell
      header={
        <div className="shrink-0 border-b border-border/60 bg-background px-4 py-4 sm:px-6">
          <h1 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            <LibraryBig className="h-5 w-5" /> Library
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Chats and research papers, side by side</p>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="chats" className="gap-1.5">
              <MessagesSquare className="h-4 w-4" /> Chats
            </TabsTrigger>
            <TabsTrigger value="arxiv" className="gap-1.5">
              <BookOpen className="h-4 w-4" /> arXiv
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {tab === "chats" ? <ChatsTab /> : <ArxivTab />}
      </div>
    </AppShell>
  );
};

export default Library;
