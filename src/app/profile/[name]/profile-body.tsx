"use client";
import { useState } from "react";
import Image from "next/image";
import { UserAnimeListType } from "@/types/anime";

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
  const [currentTab, setCurrentTab] = useState("");

  return (
    <section className="text-primary-text">
      <ul>
        {watching.map((anime) => (
          <li key={anime.id} className="mb-4">
            <div className="flex flex-row">
              <Image
                src={anime.media.coverImage?.extraLarge ?? ""}
                alt=""
                width={48}
                height={56}
                className="rounded-md"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
