import type { Anime } from "@/types/anime";
import Link from "next/link";
import { formatStatusAndType } from "@/lib/anilist/format";

export default function SideAnimeList({ anime }: { anime:Anime }){
    const coverImage = anime.coverImage?.extraLarge
    const title = anime.title.english ?? anime.title.romaji
    const bannerImage = anime.bannerImage ?? coverImage
    const status = formatStatusAndType(anime.status)
    const type = formatStatusAndType(anime.format)
    const seasonYear = anime.seasonYear
    const duration = anime.duration
    const episodes =
    type === "MOVIE"
      ? duration
        ? `${duration} min`
        : "N/A"
      : anime.episodes
        ? `${anime.episodes} eps`
        : "N/A";

    const statusPillClass = 
        status === 'FINISHED' ? 'bg-info' : 
        status === 'RELEASING' ? 'bg-success' : 
        status === 'NOT_YET_RELEASED' ? 'bg-warning' : 
        status === 'CANCELLED' ? 'bg-danger' : 
        status === 'HIATUS' ? 'bg-secondary' : 'bg-secondary';

    return(
      <Link href={`/anime/${anime.id}`}>
        <div className="group relative overflow-hidden rounded-lg bg-card cursor-pointer">
          <div
            className="absolute inset-0 right-0 w-full overflow-hidden"
            aria-hidden="true"
          >
            <img
              src={bannerImage}
              alt=""
              className="h-full w-full object-cover object-center opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-r from-card via-card/90 to-transparent" />
          </div>
        <div className="relative z-10 flex items-center gap-3">
          <img
            src={coverImage}
            alt={title}
            className="h-24 w-16 shrink-0 rounded-lg object-cover"
          />
          <div>
            <span className='flex items-center gap-2'>
                <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusPillClass}`} aria-hidden="true" />
                <h3 className='text-sm font-bold line-clamp-2 text-primary-text'>{title}</h3>
            </span>
            <div className='flex items-center gap-1 ml-3'>
                <span className='text-xs text-muted-text'>{type}</span>
                <span className='text-xs text-muted-text'>{seasonYear} • {episodes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
    )
}