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
      recommendations { nodes { mediaRecommendation { title { romaji english } coverImage { large } } } }
    }
  }
`;
