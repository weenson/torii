import type { AnimeByID } from "@/types/anime";

export default function EpisodesTab({
  streamingEpisodes,
}: {
  streamingEpisodes: AnimeByID["streamingEpisodes"];
}) {
  if (!streamingEpisodes?.length) {
    return <p className="text-sm text-muted-text">No Episodes Found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {streamingEpisodes.map((episode) => (
        <li key={episode.title}>
          <a
            href={episode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-3 rounded-lg border border-border p-2 transition-colors hover:border-primary/50 sm:p-3"
          >
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="h-16 w-28 shrink-0 rounded-lg object-cover sm:h-20 sm:w-32"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-bold">{episode.title}</p>
              <p className="mt-1 text-xs text-muted-text">{episode.site}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
