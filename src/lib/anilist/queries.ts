export const ANIME_LIST = `
  query ($sort: [MediaSort]) {
    Page(page: 1, perPage: 25) {
      media(sort: $sort, type: ANIME, isAdult: false) {
        id
        title { romaji english }
        bannerImage
        coverImage { extraLarge }
        description(asHtml: false)
        format
        status
        season
        seasonYear
        episodes
        duration
        averageScore
      }
    }
  }
`;

export const HERO_ANIME_LIST = `
  query {
    Page(page: 1, perPage: 12) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        id
        title { romaji english }
        bannerImage
        coverImage { extraLarge }
        description(asHtml: false)
        format
        status
        season
        seasonYear
        duration
        averageScore
      }
    }
  }
`;

export const SEASONAL_ANIME = `
  query ($season: MediaSeason, $year: Int) {
    Page(page: 1, perPage: 25) {
      media(season: $season, seasonYear: $year, type: ANIME, isAdult: false) {
        id
        title { romaji english }
        bannerImage
        coverImage { extraLarge }
        description(asHtml: false)
        format
        status
        season
        seasonYear
        episodes
        duration
        averageScore
      }
    }
  }
`;

export const GET_ANIME_BY_ID = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english }
      bannerImage
      coverImage { extraLarge }
      description(asHtml: false)
      format
      status
      season
      seasonYear
      genres
      averageScore
      episodes
      duration
      startDate { year month day }
      endDate { year month day }
      source
      streamingEpisodes { site url thumbnail title }
      nextAiringEpisode { airingAt timeUntilAiring episode }
      trailer { site id thumbnail }
      tags { name rank }
      externalLinks { site url }
      studios(isMain: true) { nodes { name } }
      characters { edges { role node { name { full } image { large } } voiceActors(language: JAPANESE, sort: [RELEVANCE]) { name { full } image { large } } } }
      staff { edges { role node { name { full } image { large } } } }
      recommendations {
        nodes {
          rating
          mediaRecommendation {
            id
            title { romaji english }
            bannerImage
            coverImage { extraLarge }
            description(asHtml: false)
            format
            status
            season
            seasonYear
            episodes
            duration
            averageScore
          }
        }
      }
        relations {
          nodes {
            id
            type
            title { romaji english }
            bannerImage
            coverImage { extraLarge }
            description(asHtml: false)
            format
            status
            season
            seasonYear
            episodes
            duration
            averageScore
          }
        }
    }
  }
`;

export const BROWSE_ANIME = `
  query BrowseAnime(
    $page: Int
    $perPage: Int
    $search: String
    $sort: [MediaSort]
    $genres: [String]
    $tags: [String]
    $status: MediaStatus
    $format: [MediaFormat]
    $seasonYear: Int
    $season: MediaSeason
    $yearGreater: FuzzyDateInt
    $yearLesser: FuzzyDateInt
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        hasNextPage
      }
      media(
        type: ANIME
        isAdult: false
        search: $search
        sort: $sort
        genre_in: $genres
        tag_in: $tags
        status: $status
        format_in: $format
        seasonYear: $seasonYear
        season: $season
        startDate_greater: $yearGreater
        startDate_lesser: $yearLesser
      ) {
        id
        title { romaji english }
        bannerImage
        coverImage { extraLarge }
        description(asHtml: false)
        format
        status
        season
        seasonYear
        episodes
        duration
        averageScore
      }
    }
  }
`;

export const GENRE_COLLECTION = `
  query {
    GenreCollection 
  }
`;