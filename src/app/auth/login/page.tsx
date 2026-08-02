import Image from "next/image";
import BackButton from "./back-button";
import { fetchAniList } from "@/lib/anilist/client";
import { ANIME_LIST } from "@/lib/anilist/queries";
import { AnimeListType } from "@/types/anime";

export default async function LoginPage() {
  const res = await fetchAniList<AnimeListType>(ANIME_LIST);
  const data = res.Page.media;

  const randomAnime = data[Math.floor(Math.random() * data.length)];

  return (
    <main className="flex flex-col justify-center h-screen px-16">
      <div className="grid grid-cols-[1fr_2fr] gap-8">
        <div className="flex flex-col justify-center items-start gap-4">
          <BackButton />
          <Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
          <h2 className="text-primary-text text-lg font-bold">
            Sign in to your account
          </h2>
          <span className="w-full">
            <button className="bg-primary text-primary-text px-3 py-2 rounded-lg flex items-center justify-center w-full gap-2 cursor-pointer">
              <Image
                src="/images/anilist.svg"
                alt="Anilist"
                width={20}
                height={20}
              />
              <p className="text-primary-text text-sm font-bold">
                Log in with Anilist
              </p>
            </button>
          </span>
          <p className="text-muted-text text-xs">
            This site does not <u>collect any user data</u>. Anilist is used
            only for <u>authentication</u>.
          </p>
        </div>
        <div>
          <Image
            src={randomAnime.coverImage?.extraLarge ?? ""}
            alt={randomAnime.title.english ?? randomAnime.title.romaji}
            width={500}
            height={500}
          />
          <h2 className="text-primary-text text-lg font-bold">
            `{randomAnime.title.english}
          </h2>
          <p className="text-muted-text text-xs">{randomAnime.description}</p>
        </div>
      </div>
    </main>
  );
}
