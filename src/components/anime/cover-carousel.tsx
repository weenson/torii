"use client";
import { useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Anime } from "@/types/anime"
import CoverCard from "./cover-card"
import useEmblaCarousel from "embla-carousel-react";

export default function CoverCarousel({title, anime}: {title: string, anime: Anime[]}){
  const [emblaRef, emblaApi] = useEmblaCarousel({dragFree: true});
  
  const scrollToNext = useCallback(() => {emblaApi?.scrollNext()}, [emblaApi]);
  const scrollToPrev = useCallback(() => {emblaApi?.scrollPrev()}, [emblaApi]);
  const arrowButtonClass = "p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors";

  const titleElement = [
    'More like this',
    'Related'
  ]
  
    return(
      <div className='mb-6'>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3 items-center">
            <h2 className="flex items-center gap-3 text-2xl font-black text-primary-text">
              <span className="h-6 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {title}
            </h2>
            {!titleElement.includes(title) && (
              <a href='/browse' className="text-sm text-accent flex items-center gap-1 cursor-pointer hover:underline">
                View All <ArrowRight className="h-4 w-4 text-accent" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
          <button
              type="button"
              onClick={scrollToPrev}
              className={arrowButtonClass}
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollToNext}
              className={arrowButtonClass}
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={emblaRef} className='overflow-hidden'>
          <div className="flex gap-3">
            {anime.map((item) => (
              <div key={item.id} className='flex-[0_0_12rem]'>
                <CoverCard anime={item} />
              </div>
              ))}
          </div>
        </div>
      </div>
  );
}