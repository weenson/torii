import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/layout/footer'
import { fetchAniList } from '@/lib/anilist/client'
import { SEASONAL_ANIME, HERO_ANIME_LIST, ANIME_LIST } from '@/lib/anilist/queries'
import { AnimeListType } from '@/types/anime'
import { getCurrentSeason } from '@/lib/anilist/format'
import HeroCarousel from './hero-carousel'
import CoverCarousel from './cover-carousel'
import SideAnimeList from './side-anime-list'

export default async function DashboardPage() {
  const { season, year } = getCurrentSeason();
  const [heroData, seasonalData, popularData, recentlyAddedData] = await Promise.all([
    fetchAniList<AnimeListType>(HERO_ANIME_LIST),
    fetchAniList<AnimeListType>(SEASONAL_ANIME, { season, year }),
    fetchAniList<AnimeListType>(ANIME_LIST, { sort: ["POPULARITY_DESC"] }),
    fetchAniList<AnimeListType>(ANIME_LIST, { sort: ["UPDATED_AT_DESC"] }),
  ]);
  const heroAnime = heroData.Page.media;
  const seasonalAnime = seasonalData.Page.media;
  const popularAnime = popularData.Page.media;
  const recentlyAddedAnime = recentlyAddedData.Page.media;
  return (
    <main>
      <section>
        <HeroCarousel anime={heroAnime} />  
      </section>

      <section className="px-4 py-16">
        <div>
          <div className="grid gap-6 lg:grid-cols-[3fr_320px]">
            <div className="min-w-0">
              <CoverCarousel title={`${season} ${year}`} anime={seasonalAnime} />
              <CoverCarousel title="RECENTLY ADDED" anime={recentlyAddedAnime} />
            </div>
          <div className="flex max-h-[calc(100vh-5rem)] w-full flex-col rounded-xl border border-border p-4">
            <h3 className="mb-4 shrink-0 text-lg font-bold text-primary-text">
                POPULAR ANIME
              </h3>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <SideAnimeList anime={popularAnime} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </main>
  )
}