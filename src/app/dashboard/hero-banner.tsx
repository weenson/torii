import type { Anime } from "@/types/anime";
import { cleanDescription, formatStatusAndType, formatSeason, formatAverageScore } from "@/lib/anilist/format";
import {Clock, Calendar, Tv, Star, Play, Info} from 'lucide-react'
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

export default function HeroBanner({ anime }: { anime: Anime }) {
  const title = anime.title.english ?? anime.title.romaji;
  const image = anime.bannerImage ?? anime.coverImage?.extraLarge ?? "";
  const status = formatStatusAndType(anime.status) ?? "Unknown";
  const season = formatSeason(anime.season, anime.seasonYear);
  const type = formatStatusAndType(anime.format) ?? "Unknown";
  const duration = anime.duration;
  const averageScore = formatAverageScore(anime.averageScore);
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-[50vh] md:h-[60vh] object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-10 flex flex-col gap-3">
        <div>
          <Badge variant="outline">{status}</Badge>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold max-w-3xl">
          <span className="inline-block bg-linear-to-r from-light-red via-light-red to-primary-text bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
          <ul className="flex flex-row gap-x-7 text-primary-text">
            <li><Badge variant="outline"><Tv className="w-4 h-4 mr-2" />{type}</Badge></li>
            <li><Badge variant="outline"><Calendar className="w-4 h-4 mr-2" />{season}</Badge></li>
            <li><Badge variant="outline"><Clock className="w-4 h-4 mr-2" />{duration} mins</Badge></li>
            <li><Badge variant="outline"><Star className="w-4 h-4 mr-2" />{averageScore}</Badge></li>
          </ul>
        <p className="line-clamp-3 text-primary-text max-w-2xl">
          {cleanDescription(anime.description)}
        </p>
        <div className="flex flex-row gap-x-4">
          <Button variant="primary" size="lg">
            <Play fill="currentColor" className="w-5 h-5 mr-1" />
            <span className="font-extrabold">WATCH NOW</span>
        </Button>
        <Button variant="secondary" size="lg">
          <Info className="w-5 h-5 mr-1" />
          <span className="font-extrabold">MORE INFO</span>
        </Button>
      </div>
    </div>
  </div>
);
}