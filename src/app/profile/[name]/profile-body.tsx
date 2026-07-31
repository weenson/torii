"use client";
import { useState } from "react";
import { UserAnimeListType } from "@/types/anime";
import ProfileAnimeTab from "./profile-anime-tab";
import { Search, Play, Trash, Clock, Check, LucideIcon } from "lucide-react";

type MediaListEntry =
  UserAnimeListType["MediaListCollection"]["lists"][number]["entries"][number];

type ProfileBodyProps = {
  watching: MediaListEntry[];
  completed: MediaListEntry[];
  planning: MediaListEntry[];
  dropped: MediaListEntry[];
};

export default function ProfileBody({
  watching,
  completed,
  planning,
  dropped,
}: ProfileBodyProps) {
  const [currentTab, setCurrentTab] = useState(watching);
  const [searchTerm, setSearchTerm] = useState("");

  const tabs: { label: string; icon: LucideIcon; value: MediaListEntry[] }[] = [
    {
      label: "Watching",
      icon: Play,
      value: watching,
    },
    {
      label: "Planned",
      icon: Clock,
      value: planning,
    },
    {
      label: "Completed",
      icon: Check,
      value: completed,
    },
    {
      label: "Dropped",
      icon: Trash,
      value: dropped,
    },
  ];

  const filteredAnime = currentTab.filter((anime) => {
    const title = anime.media.title.english ?? anime.media.title.romaji ?? "";
    return title.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4">
      <aside className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            className="w-full text-sm p-2 pl-9 rounded-md border border-border text-primary-text"
            placeholder="Search lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="text-muted-text flex flex-col gap-4">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              onClick={() => setCurrentTab(tab.value)}
              className={
                currentTab === tab.value
                  ? `cursor-pointer hover:bg-primary rounded-lg px-2 py-3 transition-colors bg-primary text-primary-text`
                  : `cursor-pointer hover:bg-card rounded-lg px-2 py-3 transition-colors`
              }
            >
              <span className="mr-2 flex items-center gap-2">
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </span>
            </li>
          ))}
        </ul>
      </aside>
      <section className="text-primary-text">
        <ProfileAnimeTab list={filteredAnime} />
      </section>
    </div>
  );
}
