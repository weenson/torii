import Link from "next/link";
import NavBar from "@/components/ui/navbar";
import { fetchAniList } from "@/lib/anilist/client";
import { BROWSE_ANIME } from "@/lib/anilist/queries";
import type { BrowseAnimeListType } from "@/types/anime";
import { ChevronLeft, ChevronRight} from "lucide-react"
import CoverCard from "@/components/anime/cover-card";

function getPageItems(current: number, total: number): (number | "...")[] {

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  pages.add(current);
  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const items: (number | "...")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    if (i > 0) {
      const prev = sorted[i - 1];
      if (page - prev === 2) {
        items.push(prev + 1);
      } else if (page - prev > 2) {
        items.push("...");
      }
    }
    items.push(page);
  }

  return items;
}

export default async function BrowsePage({ searchParams }: {searchParams: Promise<{ page?: string }>;}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const data = await fetchAniList<BrowseAnimeListType>(BROWSE_ANIME, {
    page,
    perPage: 36,
    sort: ["POPULARITY_DESC"],
  });

  const { Page: { media, pageInfo } } = data;

  const currentPage = pageInfo.currentPage;
  const totalPages = Math.max(1, Math.ceil(pageInfo.total / pageInfo.perPage));
  const items = getPageItems(currentPage, totalPages);

  return (
    <main className="px-4">
      <NavBar />

      <section className="py-16">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 gap-4"> */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
          {media.map((item) => (
            <CoverCard key={item.id} anime={item} />
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center gap-2 py-8 text-sm text-primary-text">
        {currentPage > 1 && (
          <Link
            href={`/browse?page=${currentPage - 1}`}
            className="rounded px-2 py-1 hover:bg-secondary"
          >
            <ChevronLeft />
          </Link>
        )}

        {items.map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-muted-text">
              ...
            </span>
          ) : (
            <Link
              key={item}
              href={`/browse?page=${item}`}
              className={`rounded px-2 py-1 ${
                item === currentPage
                  ? "bg-primary font-bold rounded-full px-3 py-1 text-primary-text"
                  : "hover:bg-secondary rounded-full px-3 py-1"
              }`}
            >
              {item}
            </Link>
          )
        )}

        {pageInfo.hasNextPage && (
          <Link
            href={`/browse?page=${currentPage + 1}`}
            className="rounded px-2 py-1 hover:bg-secondary"
          >
            <ChevronRight />
          </Link>
        )}
      </section>
    </main>
  );
}