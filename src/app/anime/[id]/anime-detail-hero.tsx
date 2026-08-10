"use client";

import { useState } from "react";
import Badge from "@/components/ui/badge";
import ReadMore from "./read-more";
import {
  cleanDescription,
  formatStatusAndType,
  formatSeason,
  toFuzzyDate,
  fromFuzzyDate,
} from "@/lib/anilist/format";
import type { AnimeByID, MediaListEntryType } from "@/types/anime";
import { Calendar, Tv, PlusIcon, Loader2, PencilIcon } from "lucide-react";
import Modal from "@/components/ui/modal";

export default function AnimeDetailHero({
  anime,
  mediaList,
  isLoggedIn,
}: {
  anime: AnimeByID;
  mediaList: MediaListEntryType["MediaList"] | null;
  isLoggedIn: boolean;
}) {
  const title = anime.title.english ?? anime.title.romaji;
  const bannerImage = anime.bannerImage ?? anime.coverImage?.extraLarge ?? "";
  const coverImage = anime.coverImage?.extraLarge ?? "";
  const status = formatStatusAndType(anime.status);
  const type = formatStatusAndType(anime.format);
  const season = formatSeason(anime.season, anime.seasonYear);
  const description = cleanDescription(anime.description);
  const genres = anime.genres;
  const episodes = anime.episodes;

  const [isOpen, setIsOpen] = useState(false);
  const [entry, setEntry] = useState(mediaList);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaId: anime.id,
          status: form.get("status"),
          score: Number(form.get("score")),
          progress: Number(form.get("progress")),
          notes: form.get("notes") || null,
          startedAt: toFuzzyDate(form.get("startDate")),
          completedAt: toFuzzyDate(form.get("endDate")),
          repeat: Number(form.get("totalRewatches") || 0),
        }),
      });
      if (res.ok) {
        setEntry(await res.json());
        setIsOpen(false);
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!entry?.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry?.id }),
      });
      if (res.ok) {
        setEntry(null);
        setIsOpen(false);
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden md:h-72">
        <img src={bannerImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20" />
      </section>

      <section className="relative px-4">
        <div className="-mt-24 flex flex-col gap-8 md:-mt-32 md:flex-row md:items-end md:gap-10">
          <div className="mx-auto shrink-0 md:mx-0">
            <img
              src={coverImage}
              alt={title}
              className="h-64 w-44 rounded-xl border border-border object-cover shadow-2xl md:h-80 md:w-56"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 pb-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{status}</Badge>
              <Badge variant="outline">
                <Tv className="mr-1.5 h-3.5 w-3.5" />
                {type}
              </Badge>
              <Badge variant="outline">
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                {season}
              </Badge>
            </div>

            <h1 className="text-3xl font-black text-primary-text md:text-4xl">
              <span className="inline-block bg-linear-to-r from-light-red to-primary-text bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                {genres?.map((genre) => (
                  <div key={genre}>
                    <Badge>{genre}</Badge>
                  </div>
                ))}
              </div>
              <h2 className="mb-3 text-lg font-bold text-primary-text">
                Synopsis
              </h2>
              <ReadMore text={description} />
            </div>
            <div>
              {isLoggedIn && (
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-text cursor-pointer"
                >
                  {entry?.id ? (
                    <>
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit List Entry</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-4 w-4" />
                      <span>Add to List</span>
                    </>
                  )}
                </button>
              )}
              <Modal open={isOpen} onOpenChange={setIsOpen} title={title}>
                <form
                  key={entry?.id ?? "new"}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 text-primary-text"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="status"
                        className="text-xs font-medium text-muted-text"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        defaultValue={entry?.status ?? "CURRENT"}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      >
                        <option value="CURRENT">Watching</option>
                        <option value="PLANNING">Planning</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="DROPPED">Dropped</option>
                        <option value="PAUSED">Paused</option>
                        <option value="REPEATING">Rewatching</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="score"
                        className="text-xs font-medium text-muted-text"
                      >
                        Score
                      </label>
                      <input
                        type="number"
                        id="score"
                        name="score"
                        min={0}
                        max={100}
                        defaultValue={entry?.score ?? 0}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="progress"
                        className="text-xs font-medium text-muted-text"
                      >
                        Progress
                      </label>
                      <input
                        type="number"
                        id="progress"
                        name="progress"
                        min={0}
                        max={episodes ?? 1}
                        defaultValue={entry?.progress ?? 0}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="startDate"
                        className="text-xs font-medium text-muted-text"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        defaultValue={
                          entry?.startedAt ? fromFuzzyDate(entry.startedAt) : ""
                        }
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="endDate"
                        className="text-xs font-medium text-muted-text"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        defaultValue={
                          entry?.completedAt
                            ? fromFuzzyDate(entry.completedAt)
                            : ""
                        }
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="totalRewatches"
                        className="text-xs font-medium text-muted-text"
                      >
                        Total Rewatches
                      </label>
                      <input
                        type="number"
                        id="totalRewatches"
                        name="totalRewatches"
                        min={0}
                        defaultValue={entry?.repeat ?? 0}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="text-xs font-medium text-muted-text"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="Optional notes..."
                      defaultValue={entry?.notes ?? ""}
                      className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex justify-between gap-2 border-t border-border pt-4">
                    <div>
                      {entry?.id && (
                        <button
                          type="button"
                          onClick={handleDelete}
                          className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm text-muted-text transition-colors hover:bg-muted"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      )}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm text-muted-text transition-colors hover:bg-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-primary/90"
                      >
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
