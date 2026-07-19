"use client";

import { useState, useEffect } from "react";
import type { AnimeByID } from "@/types/anime";
import StaffTab from "./tabs/staff-tab";
import CharacterTab from "./tabs/character-tab";
import EpisodesTab from "./tabs/episodes-tab";
import RelatedTab from "./tabs/related-tab";
import {
  formatAverageScore,
  formatDate,
  formatStatusAndType,
  formatTime,
} from "@/lib/anilist/format";

export default function AnimeDetailBody({ anime }: { anime: AnimeByID }) {
  const animeTags = anime.tags
    ?.slice()
    .sort((a, b) => b.rank - a.rank)
    .map((tag) => tag.name)
    .slice(0, 5)
    .join(", ");

  const airingAt = anime.nextAiringEpisode?.airingAt ?? null;
  const calcTime = () => {
    if (airingAt === null) return null;
    return Math.max(0, airingAt - Math.floor(Date.now() / 1000));
  };

  const [currentTime, setCurrentTime] = useState<number | null>(calcTime);

  useEffect(() => {
    if (airingAt === null) return;

    const id = setInterval(() => {
      setCurrentTime(calcTime());
    }, 1000);

    return () => clearInterval(id);
  }, [airingAt]);

  const airingTimeFormatted =
    currentTime !== null ? formatTime(currentTime) : null;

  const infoPanel = [
    {
      title: "WEBSITE",
      value: anime.externalLinks?.[0]?.site ? (
        <a
          href={anime.externalLinks?.[0]?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-primary-text hover:text-primary-text/80"
        >
          {anime.externalLinks?.[0]?.site}
        </a>
      ) : (
        "N/A"
      ),
    },
    {
      title: "TYPE",
      value: anime.format?.toLocaleUpperCase(),
    },
    {
      title: "STATUS",
      value: formatStatusAndType(anime.status),
    },
    {
      title: "SCORE",
      value: formatAverageScore(anime.averageScore),
    },
    {
      title: "START DATE",
      value: anime.startDate ? formatDate(anime.startDate) : "N/A",
    },
    {
      title: "END DATE",
      value: anime.endDate ? formatDate(anime.endDate) : "N/A",
    },
    {
      title: "EPISODES",
      value: anime.episodes
        ? anime.episodes + " " + (anime.episodes === 1 ? "ep" : "eps")
        : "N/A",
    },
    {
      title: "DURATION",
      value: anime.duration ? anime.duration + " mins" : "N/A",
    },
    {
      title: "SOURCE",
      value: formatStatusAndType(anime.source),
    },
    {
      title: "STUDIO",
      value: anime.studios?.nodes.map((studio) => studio.name).join(", "),
    },
    {
      title: "THEMES",
      value: animeTags,
    },
  ];

  type Tab = "trailer" | "related" | "staff" | "characters" | "episode";
  const tabs: { id: Tab; label: string }[] = [
    { id: "trailer", label: "Trailer" },
    { id: "related", label: "Related" },
    { id: "staff", label: "Staff" },
    { id: "characters", label: "Characters" },
    { id: "episode", label: "Episodes" },
  ];

  const [activeTab, setActiveTab] = useState<Tab>("trailer");

  return (
    <main className="text-primary-text">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-10">
        <div className="order-2 w-full md:order-1 md:w-auto">
          {anime.nextAiringEpisode && (
            <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-success bg-success/15 p-3 text-xs font-bold text-success sm:mb-6 sm:p-4 sm:text-sm">
              <p className="shrink-0">Next Ep</p>
              <p className="truncate text-right">{airingTimeFormatted}</p>
            </div>
          )}
          <div className="w-full rounded-lg border border-border bg-card p-4 md:w-56">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {infoPanel.map((item) => (
                <li key={item.title} className="min-w-0">
                  <p className="text-xs text-muted-text sm:text-sm">{item.title}</p>
                  <p className="wrap-break-word text-xs font-medium sm:text-sm">
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="order-1 min-w-0 md:order-2">
          <div className="mb-4 flex w-full gap-1 overflow-x-auto rounded-lg bg-card p-1.5 sm:mb-6 sm:gap-1 sm:overflow-hidden sm:p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 shrink-0 cursor-pointer rounded-md px-2 py-2 text-center text-xs font-bold transition-colors sm:rounded-lg sm:py-2 sm:text-sm
                        ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-text"
                            : "bg-card text-muted-text hover:bg-primary hover:text-primary-text"
                        }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="min-w-0">
            {activeTab === "trailer" &&
              (anime.trailer?.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                  title="Trailer"
                  className="aspect-video max-w-6xl mx-auto rounded-lg"
                  allowFullScreen
                />
              ) : (
                <p className="text-sm text-muted-text">No trailer available.</p>
              ))}
            {activeTab === "related" && <RelatedTab relations={anime.relations}/>}
            {activeTab === "staff" && <StaffTab staff={anime.staff} />}
            {activeTab === "characters" && <CharacterTab characters={anime.characters} /> }
            {activeTab === "episode" && <EpisodesTab streamingEpisodes={anime.streamingEpisodes} /> }
          </div>
        </div>
      </div>
    </main>
  );
}
