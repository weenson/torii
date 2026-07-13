import type { Anime } from "@/types/anime";
import SideAnimeListItem from "./side-animelist-item";

export default function SideAnimeList({ anime }: {anime: Anime[]}){
    return(
        <div className="flex flex-col gap-3">
        {anime.map((item) => (
          <div key={item.id}>
            <SideAnimeListItem anime={item} />
          </div>
        ))}
    </div>
  );
}