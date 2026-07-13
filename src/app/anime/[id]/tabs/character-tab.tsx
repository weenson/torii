import type { AnimeByID } from "@/types/anime";

export default function CharacterTab({
  characters,
}: {
  characters: AnimeByID["characters"];
}) {
  if (!characters?.edges.length) {
    return <p className="text-sm text-muted-text">No Characters Found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {characters.edges.map((character) => (
        <li
          key={character.node.name.full}
          className="flex flex-row items-start gap-2 rounded-lg border border-border p-2 sm:p-3"
        >
          <img
            src={character.node.image.large}
            alt={character.node.name.full}
            className="h-16 w-12 shrink-0 rounded-lg object-cover sm:h-20 sm:w-14"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {character.node.name.full}
            </p>
            <p className="text-xs text-muted-text">{character.role}</p>
          </div>

          {character.voiceActors[0] && (
            <div className="flex max-w-[45%] shrink-0 flex-row items-start gap-1.5 sm:max-w-none sm:gap-2">
              <div className="flex min-w-0 flex-col items-end gap-0.5">
                <p className="line-clamp-2 text-right text-[10px] text-muted-text sm:text-xs">
                  {character.voiceActors[0].name.full}
                </p>
                <p className="text-right text-[10px] text-muted-text sm:text-xs">
                  JAPANESE
                </p>
              </div>
              <img
                src={character.voiceActors[0].image.large}
                alt={character.voiceActors[0].name.full}
                className="h-16 w-12 shrink-0 rounded-lg object-cover sm:h-20 sm:w-14"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
