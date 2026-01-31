/**
 * ChatHeader.tsx
 *
 * Header component for the chat interface that displays the conversation title
 * and provides actions for renaming, sharing, and deleting conversations.
 */

import { useState, type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import PixelLogo from "./PixelLogo";
import { useChat } from "@/context/ChatContext";

interface ChatHeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  title = "New Conversation",
  actions,
}) => {
  const {
    currentConversation,
    renameConversation,
    deleteConversation,
    shareConversation,
  } = useChat();
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = () => {
    if (currentConversation) {
      renameConversation(currentConversation.id, newTitle);
      setIsRenameDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (currentConversation) {
      deleteConversation(currentConversation.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleShare = () => {
    if (currentConversation) {
      shareConversation(currentConversation.id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#B8B2B2]/10 bg-[#000000]">
      <div className="flex items-center gap-4">
        <PixelLogo size={32} animated={false} showText={false} />
        <h1 className="text-lg font-medium text-[#F2EDED]">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {actions ? (
          actions
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10"
                >
                  <span className="material-icons" style={{ fontSize: "18px" }}>
                    edit
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setNewTitle(title);
                    setIsRenameDialogOpen(true);
                  }}
                >
                  Rename
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10"
              onClick={handleShare}
            >
              <span className="material-icons" style={{ fontSize: "18px" }}>
                share
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10"
                >
                  <span className="material-icons" style={{ fontSize: "18px" }}>
                    delete
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-[#EF4444] focus:text-[#EF4444]"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#B8B2B2] hover:text-[#F2EDED] hover:bg-[#F2EDED]/10"
            >
              <span className="material-icons" style={{ fontSize: "18px" }}>
                settings
              </span>
            </Button>
          </>
        )}
      </div>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>
              Change the title of this conversation.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Conversation title"
            className="mt-2 bg-[#0A0A0A] border-[#B8B2B2]/20 text-[#F2EDED]"
            autoFocus
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRenameDialogOpen(false)}
              className="border-[#B8B2B2]/30 text-[#F2EDED] hover:bg-[#F2EDED]/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              className="bg-[#F2EDED] text-[#000000] hover:bg-[#F2EDED]/90"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this conversation and all its
              messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#B8B2B2]/30 text-[#F2EDED] hover:bg-[#F2EDED]/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90"
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
