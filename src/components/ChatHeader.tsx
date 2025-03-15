
import { FC } from "react";
import { Share, Copy, Settings } from "lucide-react";
import Logo from "./Logo";

interface ChatHeaderProps {
  title?: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ title = "New Conversation" }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/30">
      <div className="flex items-center gap-4">
        <Logo size={32} />
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
          <Copy size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
          <Share size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
