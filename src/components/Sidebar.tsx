import { SidebarNav } from "@/components/AppShell";
import { cn } from "@/lib/utils";

/** Legacy export — layout moved to AppShell. Renders nav list only. */
const Sidebar = ({ className }: { className?: string }) => (
  <div className={cn("w-full", className)}>
    <SidebarNav />
  </div>
);

export default Sidebar;
