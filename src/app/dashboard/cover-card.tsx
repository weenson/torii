import Link from 'next/link'

import type { Anime } from '@/types/anime'
import { Play } from 'lucide-react'
import { formatStatusAndType } from '@/lib/anilist/format';

export default function CoverCard({anime}: {anime:Anime}){
const coverImage = anime.coverImage?.extraLarge;
const title = anime.title.english ?? anime.title.romaji;
const status = anime.status;
const type = formatStatusAndType(anime.format);
const seasonYear = anime.seasonYear;
const duration = anime.duration ? `${anime.duration} min` : 'N/A';
const statusPillClass = 
    status === 'FINISHED' ? 'bg-info' : 
    status === 'RELEASING' ? 'bg-success' : 
    status === 'NOT_YET_RELEASED' ? 'bg-warning' : 
    status === 'CANCELLED' ? 'bg-danger' : 
    status === 'HIATUS' ? 'bg-secondary' : 'bg-secondary';

    return (
        <div className='flex flex-col gap-2'>
            <Link href={`/anime/${anime.id}`} className="group relative overflow-hidden h-64 w-48">
                <img 
                    src={coverImage}
                    alt={title} 
                    className='w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300 ease-out'
                />
                <div
                    className="absolute inset-0 bg-background opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-lg">
                    <Play className="h-5 w-5 fill-primary-text text-primary-text" />
                    </div>
                </div>
            </Link>
            <span className='flex items-center gap-2'>
                <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusPillClass}`} aria-hidden="true" />
                <h3 className='text-sm font-bold line-clamp-1 text-primary-text'>{title}</h3>
            </span>
                <div className='flex items-center gap-1'>
                    <span className='text-xs text-muted-text'>{type}</span>
                    <span className='text-xs text-muted-text'>{seasonYear} • {duration}</span>
                </div>
        </div>
    )
}