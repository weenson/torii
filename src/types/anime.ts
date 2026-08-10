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
  format:
    | "TV"
    | "TV_SHORT"
    | "MOVIE"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC"
    | null;
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS"
    | null;
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
  format:
    | "TV"
    | "TV_SHORT"
    | "MOVIE"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC"
    | null;
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS"
    | null;
  season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
  seasonYear: number | null;
  genres: string[] | null;
  tags: { name: string; rank: number }[] | null;
  averageScore: number | null;
  episodes: number | null;
  duration: number | null;
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  } | null;
  streamingEpisodes:
    | { site: string; url: string; thumbnail: string; title: string }[]
    | null;
  startDate: { year: number | null; month: number | null; day: number | null };
  endDate: { year: number | null; month: number | null; day: number | null };
  source:
    | "ORIGINAL"
    | "MANGA"
    | "LIGHT_NOVEL"
    | "VISUAL_NOVEL"
    | "VIDEO_GAME"
    | "OTHER"
    | null;
  trailer: { site: string; id: string; thumbnail: string } | null;
  externalLinks: { site: string; url: string }[] | null;
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
      role: string;
      node: {
        name: { full: string };
        image: { large: string };
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

export type MediaListEntryType = {
  MediaList: {
    id: number;
    status: "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED";
    score: number;
    progress: number;
    notes: string;
    startedAt: { year: number; month: number; day: number };
    completedAt: { year: number; month: number; day: number };
    repeat: number;
  } | null;
};

export type SaveMediaListEntryType = {
  SaveMediaListEntry: {
    id: number;
    status: "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED";
    progress: number;
    score: number;
    notes: string;
    startedAt: { year: number; month: number; day: number };
    completedAt: { year: number; month: number; day: number };
    repeat: number;
    media: {
      id: number;
      title: { romaji: string; english: string | null };
    };
  };
};

export type DeleteMediaListEntryType = {
  DeleteMediaListEntry: {
    deleted: boolean;
  };
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

export type SearchAnimeListType = {
  Page: {
    media: Anime[];
  } | null;
};

export type UserInfoType = {
  Viewer: {
    id: number;
    name: string;
    avatar: { medium: string };
  };
};

export type ProfileInfoType = {
  User: {
    id: number;
    name: string;
    avatar: { large: string };
    bannerImage: string;
    createdAt: number;
    isFollowing: boolean;
    isFollower: boolean;
    statistics: {
      anime: {
        count: number;
        minutesWatched: number;
        episodesWatched: number;
      };
    };
  };
};

export type ToggleFollowType = {
  ToggleFollow: {
    id: number;
    name: string;
    isFollowing: boolean;
  };
};

export type UserAnimeListType = {
  MediaListCollection: {
    lists: {
      name: string;
      isCustomList: boolean;
      status: string;
      entries: {
        id: number;
        status: string;
        score: number;
        progress: number;
        media: Anime;
      }[];
    }[];
  };
};

type PageType = {
  pageInfo: {
    total: number;
  };
};

export type FollowUsersType = {
  followingPage: PageType;
  followersPage: PageType;
};

export type AiringNotification = {
  id: number;
  type: "AIRING";
  createdAt: number;
  episode: number;
  media: {
    id: number;
    title: {
      romaji: string;
      english: string | null;
    };
    coverImage: { medium: string };
  };
};

export type FollowingNotification = {
  id: number;
  type: "FOLLOWING";
  createdAt: number;
  user: {
    name: string;
    avatar: { medium: string };
  };
};

export type Notification = AiringNotification | FollowingNotification;

export type NotificationsType = {
  Page: {
    notifications: Notification[];
  };
};

export type UnreadNotificationsType = {
  Viewer: {
    unreadNotificationCount: number;
  };
};
