import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2 text-muted-text"
        aria-hidden="true"
      />
      <input
        type="search"
        name="search"
        placeholder="Find Your Favorite Anime..."
        className="h-8 w-120 rounded-lg border border-border bg-background py-3 pr-4 pl-10 text-xs text-primary-text placeholder:text-muted-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
