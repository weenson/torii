import Link from "next/link";
import NavBar from "@/components/ui/navbar";
import { fetchAniList } from "@/lib/anilist/client";
import { BROWSE_ANIME, GENRE_COLLECTION } from "@/lib/anilist/queries";
import type { BrowseAnimeListType, GenreCollectionType } from "@/types/anime";
import { ChevronLeft, ChevronRight} from "lucide-react"
import CoverCard from "@/components/anime/cover-card";
import BrowseFilters from "./browse-filters";

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

type searchParamsType = {
  page?: string;
  genres?: string;
  status?: string;
  format?: string;
  season?: string;
  year?: string;
  sort?: string;
}

export default async function BrowsePage({ searchParams }: {searchParams: Promise<searchParamsType>;}) {
  const { page, genres, status, format, season, year, sort } = await searchParams;
  const pageNum = Number(page) || 1;
  const genreList = genres?.split(",").filter(Boolean);
  const formatList = format ? [format] : undefined;
  const seasonYear = year ? Number(year) : undefined;
  const sortList = [sort || "POPULARITY_DESC"];

  
  const [browseData, genreData] = await Promise.all([
    fetchAniList<BrowseAnimeListType>(BROWSE_ANIME, {
      page: pageNum,
      perPage: 36,
      sort: sortList,
      genres: genreList,
      status: status,
      format: formatList,
      season,
      seasonYear
    }),
    fetchAniList<GenreCollectionType>(GENRE_COLLECTION)
  ])
  
  const { Page: { media, pageInfo } } = browseData;
  const genreListData = genreData.GenreCollection;

  const currentPage = pageInfo.currentPage;
  const totalPages = Math.max(1, Math.ceil(pageInfo.total / pageInfo.perPage));
  const items = getPageItems(currentPage, totalPages);

  const filters = new URLSearchParams();
  if (genres) filters.set("genres", genres)
  if (status) filters.set("status", status)
  if (format) filters.set("format", format)
  if (season) filters.set("season", season)
  if (year) filters.set("year", year)
  if (sort) filters.set("sort", sort)

  function browseHref(filters: URLSearchParams, page: number) {
    const params = new URLSearchParams(filters);
    params.set("page", String(page));
    return `/browse?${params.toString()}`;
  }

  return (
    <main className="px-4">
      <NavBar />

      <section>
        <BrowseFilters genres={genreListData} />
      </section>

      <section className="py-3">
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
          href={browseHref(filters, currentPage - 1)}
            scroll={false}
            className="rounded px-3 py-2 hover:bg-secondary"
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
              href={browseHref(filters, item)}
              scroll={false}
              className={`rounded-full px-3 py-2 ${
                item === currentPage
                  ? "bg-primary font-bold text-primary-text"
                  : "hover:bg-secondary"
              }`}
            >
              {item}
            </Link>
          )
        )}

        {pageInfo.hasNextPage && (
          <Link
            href={browseHref(filters, currentPage + 1)}
            scroll={false}
            className="rounded px-3 py-2 hover:bg-secondary"
          >
            <ChevronRight />
          </Link>
        )}
      </section>
    </main>
  );
}