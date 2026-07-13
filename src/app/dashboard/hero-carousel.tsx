"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import HeroBanner from "./hero-banner";
import type { Anime } from "@/types/anime";
import { ArrowLeft, ArrowRight } from "lucide-react";

const arrowButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-primary-text backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export default function HeroCarousel({ anime }: { anime: Anime[] }) {
  const autoplay = useMemo(() => AutoPlay({ delay: 8000, stopOnInteraction: true }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollToNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div>
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex flex-row">
            {anime.map((item) => (
              <div key={item.id} className="flex-[0_0_100%]">
                <HeroBanner anime={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex gap-2 md:bottom-10 md:right-10">
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

      <div className="mt-4 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full ${
              index === selectedIndex
                ? "w-8 bg-primary transition-all duration-300"
                : "w-2 bg-muted transition-all duration-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
