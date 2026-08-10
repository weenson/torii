import AnimeDetailHero from "./anime-detail-hero";
import AnimeDetailBody from "./anime-detail-body";
import { fetchAniList } from "@/lib/anilist/client";
import {
  GET_ANIME_BY_ID,
  USER_INFO,
  GET_MEDIA_LIST_ENTRY,
} from "@/lib/anilist/queries";
import { AnimeByIDType, UserInfoType, MediaListEntryType } from "@/types/anime";
import getIsLoggedIn from "@/lib/anilist/auth";
import { notFound } from "next/navigation";
import CoverCarousel from "@/components/anime/cover-carousel";
import AppNavBar from "@/components/ui/navbar/app-navbar";

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isLoggedIn = await getIsLoggedIn();
  const { id } = await params;
  const numericID = Number(id);

  if (Number.isNaN(numericID)) notFound();

  const userData = isLoggedIn.IsLoggedIn
    ? await fetchAniList<UserInfoType>(
        USER_INFO,
        undefined,
        undefined,
        isLoggedIn.token,
        undefined,
      )
    : null;

  const [animeData, mediaListData] = await Promise.all([
    fetchAniList<AnimeByIDType>(
      GET_ANIME_BY_ID,
      { id: numericID },
      undefined,
      undefined,
      true,
      "Media",
    ),
    isLoggedIn.IsLoggedIn && userData?.Viewer.id
      ? await fetchAniList<MediaListEntryType>(
          GET_MEDIA_LIST_ENTRY,
          { mediaId: numericID, userId: userData.Viewer.id },
          undefined,
          isLoggedIn.token,
          true,
          "MediaList",
        )
      : null,
  ]);

  if (!animeData.Media) notFound();

  const anime = animeData.Media;
  const mediaList = mediaListData?.MediaList;
  const recommendations =
    anime.recommendations?.nodes
      .map((item) => item.mediaRecommendation)
      .filter((item) => item !== null) ?? [];

  return (
    <main className="flex flex-col gap-6">
      <AppNavBar overlay />
      <section>
        <AnimeDetailHero
          anime={anime}
          isLoggedIn={isLoggedIn.IsLoggedIn}
          mediaList={mediaList ?? null}
        />
      </section>
      <section className="px-4">
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
