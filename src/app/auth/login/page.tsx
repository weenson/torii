import Image from "next/image";
import Link from "next/link";
import BackButton from "./back-button";
import { fetchAniList } from "@/lib/anilist/client";
import { ANIME_LIST } from "@/lib/anilist/queries";
import { AnimeListType } from "@/types/anime";

export default async function LoginPage() {
  const res = await fetchAniList<AnimeListType>(ANIME_LIST, {
    sort: ["TRENDING_DESC"],
  });
  const data = res.Page.media;

  const randomAnime = data[Math.floor(Math.random() * data.length)];
  const title = randomAnime.title.english ?? randomAnime.title.romaji;
  const cover =
    randomAnime.coverImage?.extraLarge ??
    randomAnime.bannerImage ??
    "/images/logo.svg";

  return (
    <main className="flex flex-col justify-center py-8 md:py-0 md:min-h-[calc(100dvh-12rem)]">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_2fr] md:gap-0">
        <div className="flex flex-col items-start justify-center gap-4 px-6 md:px-16">
          <BackButton />
          <Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
          <h2 className="text-lg font-bold text-primary-text">
            Sign in to your account
          </h2>
          <Link
            href="/api/auth/login"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-text transition-colors hover:bg-dark-red"
          >
            <Image
              src="/images/anilist.svg"
              alt="Anilist"
              width={20}
              height={20}
            />
            <span className="text-sm font-bold">Log in with Anilist</span>
          </Link>
          <p className="text-xs text-muted-text">
            This site does not <u>collect any user data</u>. Anilist is used
            only for <u>authentication</u>.
          </p>
        </div>

        <div className="relative mx-6 h-56 overflow-hidden rounded-lg md:mx-0 md:h-[min(80vh,40rem)] md:rounded-none">
          <div className="absolute inset-0 z-10 bg-linear-to-b from-background/40 via-transparent to-background/60 md:bg-linear-to-r md:from-background md:via-background/70 md:to-background/20" />
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </main>
  );
}
