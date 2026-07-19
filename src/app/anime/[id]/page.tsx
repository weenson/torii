import AnimeDetailHero from "./anime-detail-hero";
import AnimeDetailBody from "./anime-detail-body";
import { fetchAniList } from "@/lib/anilist/client";
import { GET_ANIME_BY_ID } from "@/lib/anilist/queries";
import { AnimeByIDType } from "@/types/anime";
import { notFound } from "next/navigation";
import CoverCarousel from "@/components/anime/cover-carousel";
import NavBar from "@/components/ui/navbar";

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericID = Number(id);

  if (Number.isNaN(numericID)) notFound();

  const data = await fetchAniList<AnimeByIDType>(GET_ANIME_BY_ID, {
    id: numericID,
  });
  if (!data.Media) notFound();

  const anime = data.Media;
  const recommendations = 
  anime.recommendations?.nodes
    .map((item) => item.mediaRecommendation)
    .filter((item) => item !== null) ?? [];

  return (
    <main className="flex flex-col gap-6">
        <NavBar overlay />
      <section>
        <AnimeDetailHero anime={anime} />
      </section>
      <section className= "px-4">
        <AnimeDetailBody anime={anime} />
      </section>
    {recommendations.length > 0 && (
      <section className="px-4">
        <CoverCarousel title="More like this" anime={recommendations} />
      </section>
    )}
    </main>
  );
}
