"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select, { ClassNamesConfig } from "react-select";
import makeAnimated from "react-select/animated";

type FilterProprs = {
  genres: string[];
}

const STATUS_OPTIONS = [
  { value: "FINISHED", label: "Finished" },
  { value: "RELEASING", label: "Releasing" },
  { value: "NOT_YET_RELEASED", label: "Not yet released" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "HIATUS", label: "Hiatus" },
];

const FORMAT_OPTIONS = [
  { value: "TV", label: "TV" },
  { value: "TV_SHORT", label: "TV Short" },
  { value: "MOVIE", label: "Movie" },
  { value: "OVA", label: "OVA" },
  { value: "ONA", label: "ONA" },
  { value: "SPECIAL", label: "Special" },
  { value: "MUSIC", label: "Music" },
];

const SORT_OPTIONS = [
  { value: "POPULARITY_DESC", label: "Popularity" },
  { value: "SCORE_DESC", label: "Score" },
  { value: "TRENDING_DESC", label: "Trending" },
  { value: "FAVOURITES_DESC", label: "Favourites" },
];

const SEASON_OPTIONS = [
  { value: "WINTER", label: "Winter" },
  { value: "SPRING", label: "Spring" },
  { value: "SUMMER", label: "Summer" },
  { value: "FALL", label: "Fall" },
];

const YEAR_OPTIONS: Option[] = [];
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1917; i--){
  YEAR_OPTIONS.push({value: String(i), label: String(i)})
}

type Option = { value: string ; label: string };

const animatedComponents = makeAnimated();

export const selectClassNames: ClassNamesConfig<Option, boolean> = {
  control: ({ isFocused }) =>
    `min-h-10 max-h-10 overflow-x-auto rounded-lg border bg-card px-1 ${
      isFocused ? "border-primary" : "border-border"
    } hover:border-primary hover:bg-white/10 hover:translate-y-[-1px] transition-all duration-300`,
  valueContainer: () => "flex flex-nowrap gap-1 overflow-x-auto",
  placeholder: () => "text-muted-text text-sm",
  input: () => "text-primary-text text-sm",
  singleValue: () => "text-primary-text text-sm",
  multiValue: () =>
    "flex items-center gap-1 rounded-md bg-muted px-2 py-0.5",
  multiValueLabel: () => "text-xs text-primary-text",
  multiValueRemove: () =>
    "rounded text-muted-text hover:bg-muted hover:text-primary-text",
  dropdownIndicator: ({ selectProps }) =>
    `p-1 text-muted-text transition-transform ${
      selectProps.menuIsOpen ? "rotate-180" : "rotate-0"
    }`,
  clearIndicator: () =>
    "p-1 text-muted-text hover:text-primary-text",
  menu: () =>
    "mt-1 rounded-lg border border-border bg-card p-1 shadow-lg z-20",
  menuList: () => "max-h-60 overflow-y-auto",
  option: ({ isFocused, isSelected }) =>
    `cursor-pointer rounded-md px-3 py-2 text-sm text-primary-text ${
      isSelected
        ? "bg-primary"
        : isFocused
          ? "bg-muted"
          : "bg-card"
    }`,
  noOptionsMessage: () => "px-3 py-2 text-sm text-muted-text",
}

export default function BrowseFilters({genres} : FilterProprs) {

  const genreOptions = genres.map((genre) => ({ value: genre, label: genre }));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function updateParam(key: string, value: string | string[] | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value == null || value === "" ){
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, value);
    }

    params.set("page", "1");
    router.push(`${pathname}?${params}`, {scroll:false});
  }
  
  return (
    <div className="w-full py-4">
      <div className="flex flex-row gap-4">
        <div className="genre-option flex-1">
          <label className="mb-1 block text-xs text-muted-text font-black">Genre</label>
          <Select<Option, true>
            instanceId="browse-genre"
            unstyled
            isMulti
            value={genreOptions.filter((o) =>
              (searchParams.get("genres")?.split(",") ?? []).includes(o.value)
            )}
            onChange={(opts) =>
              updateParam("genres", opts.map((o) => o.value))
            }
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={genreOptions}
            placeholder="Any Genres..."
            classNamePrefix="torii-select"
            classNames={selectClassNames}
          />
        </div>
        <div className="status-option flex-1">
          <label className="mb-1 block text-xs text-muted-text font-black">Status</label>
          <Select<Option, false>
            instanceId="browse-status"
            unstyled
            value={
              STATUS_OPTIONS.find((o) => o.value === searchParams.get("status")) ?? null
            }
            onChange={(opt) => updateParam("status", opt?.value ?? null)}
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={STATUS_OPTIONS}
            placeholder="Any Status..."
            classNamePrefix="torii-select"
            classNames={selectClassNames}
          />
        </div>
        <div className="status-option flex-1">
          <label className="mb-1 block text-xs text-muted-text font-black">Format</label>
          <Select<Option, false>
            instanceId="browse-format"
            unstyled
            value={FORMAT_OPTIONS.find((o) => o.value === searchParams.get("format")) ?? null}
            onChange={(opt) => updateParam("format", opt?.value ?? null)}
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={FORMAT_OPTIONS}
            placeholder="Any Format..."
            classNamePrefix="torii-select"
            classNames={selectClassNames}
          />
        </div>
        <div className="status-option flex-1">
          <label className="mb-1 block text-xs text-muted-text font-black">Season</label>
          <Select<Option, false>
            instanceId="browse-season"
            unstyled
            value={SEASON_OPTIONS.find((o) => o.value === searchParams.get("season")) ?? null}
            onChange={(opt) => updateParam("season", opt?.value ?? null)}
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={SEASON_OPTIONS}
            placeholder="Any Season..."
            classNamePrefix="torii-select"
            classNames={selectClassNames}
          />
        </div>
        <div className="status-option flex-1">
          <label className="mb-1 block text-xs text-muted-text font-black">Year</label>
          <Select<Option, false>
            instanceId="browse-year"
            unstyled
            value={YEAR_OPTIONS.find((o) => o.value === searchParams.get("year")) ?? null}
            onChange={(opt) => updateParam('year', opt?.value ?? null)}
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={YEAR_OPTIONS}
            placeholder="Any Year..."
            classNamePrefix="torii-select"
            classNames={selectClassNames}
          />
        </div>
        <div className="status-option flex-1">
          <label className="mb-1 block text-xs text-muted-text font-black">Sort</label>
          <Select<Option, false>
            instanceId="browse-sort"
            unstyled
            value={SORT_OPTIONS.find((o) => o.value === searchParams.get('sort')) ?? null}
            onChange={(o) => updateParam("sort", o?.value ?? null)}
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={SORT_OPTIONS}
            placeholder="Any Sort..."
            classNamePrefix="torii-select"
            classNames={selectClassNames}
          />
        </div>
      </div>
    </div>
  );
}
