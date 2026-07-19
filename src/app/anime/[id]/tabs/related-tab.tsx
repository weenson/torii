import type { AnimeByID } from "@/types/anime";
import CoverCard from "@/components/anime/cover-card";

export default function RelatedTab({ relations }: { relations: AnimeByID['relations'] }){
    const animeRelations =relations?.nodes.filter((relation) => relation.type === "ANIME") ?? [];
    if (animeRelations.length === 0) return(
        <div className="text-sm text-muted-text">No relations found.</div>
    )

    return (
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin-muted">
            <div className="grid grid-cols-[repeat(auto-fill,12rem)] gap-4">
                {animeRelations.map((relation) => (
                    <div key={relation.id}>
                        <CoverCard anime={relation} />
                    </div>
                ))}
            </div>
        </div>
    )
}