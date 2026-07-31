import Image from "next/image";
import { UserAnimeListType } from "@/types/anime";
import { formatStatusAndType } from "@/lib/anilist/format";

type MediaListEntry =
  UserAnimeListType["MediaListCollection"]["lists"][number]["entries"][number];

export default function ProfileAnimeTab({ list }: { list: MediaListEntry[] }) {
  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="text-muted-text">
          <tr className="border-b border-border">
            <th className="py-2 pr-4 font-medium">Title</th>
            <th className="py-2 pr-4 font-medium hidden md:table-cell">
              Format
            </th>
            <th className="py-2 pr-4 font-medium hidden md:table-cell">
              Score
            </th>
            <th className="py-2 font-medium">Progress</th>
          </tr>
        </thead>
        <tbody>
          {list.map((anime) => (
            <tr key={anime.id} className="border-b border-border/50">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={anime.media.coverImage?.extraLarge ?? ""}
                    alt=""
                    width={40}
                    height={56}
                    className="rounded-md shrink-0"
                  />
                  <span className="font-bold">
                    {anime.media.title.english ?? anime.media.title.romaji}
                  </span>
                </div>
              </td>
              <td className="py-3 pr-4 text-muted-text hidden md:table-cell">
                {formatStatusAndType(anime.media.format)}
              </td>
              <td className="py-3 pr-4 text-muted-text hidden md:table-cell">
                {anime.score ? anime.score : "-"}
              </td>
              <td className="py-3 text-muted-text whitespace-nowrap">
                {anime.media.episodes
                  ? `${anime.progress} / ${anime.media.episodes}`
                  : `${anime.progress}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
