"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { fetchAniList } from "@/lib/anilist/client";
import { SEARCH_ANIME } from "@/lib/anilist/queries";
import type { SearchAnimeListType, Anime } from "@/types/anime";
import { Search, Dot } from "lucide-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeOutId = setTimeout(async () => {
      setIsLoading(true);
      setCurrentIndex(0);
      try {
        const data = await fetchAniList<SearchAnimeListType>(
          SEARCH_ANIME,
          { search: searchTerm },
          controller.signal,
        );
        setSuggestions(data.Page?.media ?? []);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error(err);
      } finally{  
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeOutId);
      controller.abort();
    };
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
    if (e.key === "Enter" && currentIndex >= 0 && currentIndex < suggestions.length) {
      e.preventDefault();
      router.push(`/anime/${suggestions[currentIndex].id}`);
      setSuggestions([]);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setSearchTerm("");
        setCurrentIndex(0);
        setIsLoading(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative w-full min-w-2xl">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2 text-muted-text"
        aria-hidden="true"
      />
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find Your Favorite Anime Titles..."
        className="h-8 w-full rounded-lg border border-border bg-background py-3 pr-4 pl-10 text-xs text-primary-text placeholder:text-muted-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {searchTerm.trim() && (isLoading || suggestions.length > 0) && (
        <ul className="absolute top-full z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-border bg-card shadow-lg scrollbar-thin-muted">
          {isLoading ? (
            <li className="px-3 py-3 text-xs text-muted-text">Loading...</li>
          ) : (
            suggestions.map((anime, index) => (
              <li key={anime.id}>
                <Link
                  href={`/anime/${anime.id}`}
                  onClick={() => {
                    setSearchTerm("");
                    setSuggestions([]);
                  }}
                  className={`flex items-center gap-3 px-3 py-3 hover:bg-secondary ${currentIndex === index ? 'bg-secondary' : ''}`}
                >
                  {anime.coverImage?.extraLarge && (
                    <img
                      src={anime.coverImage.extraLarge}
                      alt=""
                      className="h-14 w-10 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm text-primary-text">
                      {anime.title.english ?? anime.title.romaji}
                    </p>
                      <div className="text-xs text-muted-text flex items-center gap-1">
                        {anime.format && (
                          <span className="flex items-center">
                            {anime.format}
                            <Dot />
                          </span>
                        )}
                        {anime.status && (
                          <span className="flex items-center">
                            {anime.status}
                            <Dot />
                          </span>
                        )}
                        {anime.season && anime.seasonYear && (
                          <span className="flex items-center">
                            {anime.season} {anime.seasonYear}
                            <Dot />
                          </span>
                        )}
                        {anime.episodes && (
                          <span className="flex items-center">
                            {anime.episodes} episodes
                          </span>
                        )}
                      </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}