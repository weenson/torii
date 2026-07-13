import Badge from "@/components/ui/badge";
import ReadMore from "./read-more";
import {
  cleanDescription,
  formatStatusAndType,
  formatSeason,
} from "@/lib/anilist/format";
import type { AnimeByID } from "@/types/anime";
import { Calendar, Tv } from "lucide-react";

export default function AnimeDetailHero({ anime }: { anime: AnimeByID }) {
  const title = anime.title.english ?? anime.title.romaji;
  const bannerImage = anime.bannerImage ?? anime.coverImage?.extraLarge ?? "";
  const coverImage = anime.coverImage?.extraLarge ?? "";
  const status = formatStatusAndType(anime.status);
  const type = formatStatusAndType(anime.format);
  const season = formatSeason(anime.season, anime.seasonYear);
  const description = cleanDescription(anime.description);
  const genres = anime.genres;

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
          </div>
        </div>
      </section>
    </>
  );
}
