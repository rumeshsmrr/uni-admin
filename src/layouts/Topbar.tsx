import { Bell, Search } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-card border-b border-border px-4 h-14">
      {/* Left: Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext" size={16}/>
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-3 py-1.5 rounded-xl bg-muted border border-border w-full text-sm focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="btn btn-soft p-2"><Bell size={18}/></button>
        <div className="h-9 w-9 rounded-full bg-muted"></div>
      </div>
    </header>
  );
}
