export type Anime = {
  id: number;
  title: {
    english: string | null;
    romaji: string;
  };
  bannerImage: string | null;
  coverImage?: {
    extraLarge: string;
  };
  description: string | null;
  format: "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | null;
  status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS" | null;
  season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
  seasonYear: number | null;
  episodes: number | null;
  duration: number | null;
  averageScore: number | null;
};

  export type AnimeByID = {
    id: number;
    title: {
      english: string | null;
      romaji: string;
    };
    bannerImage: string | null;
    coverImage?: {
      extraLarge: string;
    };
    description: string | null;
    format: "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | null;
    status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS" | null;
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
    seasonYear: number | null;
    genres: string[] | null;
    tags: { name: string, rank: number }[] | null;
    averageScore: number | null;
    episodes: number | null;
    duration: number | null;
    nextAiringEpisode: {airingAt: number, timeUntilAiring: number, episode: number } | null;
    streamingEpisodes: { site: string, url: string, thumbnail: string, title: string }[] | null;
    startDate: { year: number | null, month: number | null, day: number | null };
    endDate: { year: number | null, month: number | null, day: number | null };
    source: "ORIGINAL" | "MANGA" | "LIGHT_NOVEL" | "VISUAL_NOVEL" | "VIDEO_GAME" | "OTHER" | null;
    trailer: { site: string, id: string, thumbnail: string } | null;
    externalLinks: { site: string, url: string }[] | null;
    themes: { nodes: { name: string }[] } | null;
    studios: { nodes: { name: string }[] } | null;
    characters: {
      edges: {
        role: string;
        node: {
          name: { full: string };
          image: { large: string };
        };
        voiceActors: {
          name: { full: string };
          image: { large: string };
        }[];
      }[];
    } | null;
    staff: { 
      edges: { 
        role: string, 
        node: { 
          name: { full: string };
          image: { large: string } ;
        };
      }[];
    } | null;
    recommendations: {
      nodes: {
        rating: number | null;
        mediaRecommendation: Anime | null;
      }[];
    } | null;
    relations: {
        nodes: RelatedMedia[];
    } | null;
  };

  type RelatedMedia = Anime & {
    type: "ANIME" | "MANGA";
  };
  
  export type AnimeListType = {
    Page: {
      media: Anime[];
    };
  };

  export type AnimeByIDType = {
    Media: AnimeByID | null;
  };

  export type BrowseAnimeListType = {
    Page: {
      pageInfo: {
        total: number;
        perPage: number;
        currentPage: number;
        hasNextPage: boolean;
      };
      media: Anime[];
     };
   };

    export type MediaTag = {
      name: string;
      category: string | null;
      isAdult: boolean | null;
    };

    export type MediaTagCollectionType = {
      MediaTagCollection: MediaTag[];
    };

    export type GenreCollectionType = {
      GenreCollection: string[];
    };