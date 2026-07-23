export type Option = { value: string ; label: string };

export const STATUS_OPTIONS = [
    { value: "FINISHED", label: "Finished" },
    { value: "RELEASING", label: "Releasing" },
    { value: "NOT_YET_RELEASED", label: "Not yet released" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "HIATUS", label: "Hiatus" },
  ];
  
 export const FORMAT_OPTIONS = [
    { value: "TV", label: "TV" },
    { value: "TV_SHORT", label: "TV Short" },
    { value: "MOVIE", label: "Movie" },
    { value: "OVA", label: "OVA" },
    { value: "ONA", label: "ONA" },
    { value: "SPECIAL", label: "Special" },
    { value: "MUSIC", label: "Music" },
  ];
  
  export const SORT_OPTIONS = [
    { value: "POPULARITY_DESC", label: "Popularity" },
    { value: "SCORE_DESC", label: "Score" },
    { value: "TRENDING_DESC", label: "Trending" },
    { value: "FAVOURITES_DESC", label: "Favourites" },
  ];
  
  export const SEASON_OPTIONS = [
    { value: "WINTER", label: "Winter" },
    { value: "SPRING", label: "Spring" },
    { value: "SUMMER", label: "Summer" },
    { value: "FALL", label: "Fall" },
  ];
  
  export const YEAR_OPTIONS: Option[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1917; i--){
    YEAR_OPTIONS.push({value: String(i), label: String(i)})
  }