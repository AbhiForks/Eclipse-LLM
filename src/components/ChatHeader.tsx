import { useState, type FC } from "react";
import { MoreVertical, Pencil, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/ChatContext";

interface ChatHeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

const ChatHeader: FC<ChatHeaderProps> = ({ title = "New Conversation", actions }) => {
  const { currentConversation, renameConversation, deleteConversation, shareConversation } = useChat();
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  return (
    <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background px-3 sm:px-5">
      <h1 className="min-w-0 flex-1 truncate text-base font-medium sm:text-lg">{title}</h1>
      <div className="flex shrink-0 items-center gap-1">
        {actions ?? (
          <>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Rename conversation"
              onClick={() => {
                setNewTitle(title);
                setIsRenameOpen(true);
              }}
            >
              <Pencil className="h-[18px] w-[18px]" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share conversation" onClick={() => currentConversation && shareConversation(currentConversation.id)}>
              <Share2 className="h-[18px] w-[18px]" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="More actions">
                  <MoreVertical className="h-[18px] w-[18px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>Change the title of this conversation.</DialogDescription>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Conversation title"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentConversation && newTitle.trim()) {
                renameConversation(currentConversation.id, newTitle);
                setIsRenameOpen(false);
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (currentConversation && newTitle.trim()) {
                  renameConversation(currentConversation.id, newTitle);
                  setIsRenameOpen(false);
                }
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this conversation and all its messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => currentConversation && deleteConversation(currentConversation.id)}
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

export default ChatHeader;
