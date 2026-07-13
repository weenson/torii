import Footer from "@/components/layout/footer";
import AnimeDetailHero from "./anime-detail-hero";
import AnimeDetailBody from "./anime-detail-body";
import { fetchAniList } from "@/lib/anilist/client";
import { GET_ANIME_BY_ID } from "@/lib/anilist/queries";
import { AnimeByIDType } from "@/types/anime";
import { notFound } from "next/navigation";

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericID = Number(id);

  if (Number.isNaN(numericID)) notFound();

  const data = await fetchAniList<AnimeByIDType>(GET_ANIME_BY_ID, {
    id: numericID,
  });
  if (!data.Media) notFound();

  const anime = data.Media;

  return (
    <main>
      <section className="mb-6">
        <AnimeDetailHero anime={anime} />
      </section>
      <section className= "px-4">
        <AnimeDetailBody anime={anime} />
      </section>
      <section className="pt-16">
      <Footer />
      </section>
    </main>
  );
}
