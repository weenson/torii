"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { STATUS_OPTIONS, FORMAT_OPTIONS, SORT_OPTIONS, SEASON_OPTIONS, YEAR_OPTIONS } from "@/lib/anilist/filter-opt"
import BrowseFilterItem from "./browse-filters-select";

type FilterProps = {
  genres: string[];
}

export default function BrowseFilters({genres} : FilterProps) {

  const genreOptions = genres.map((genre) => ({ value: genre, label: genre }));

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function updateParam(key: string, value: string | string[] | null){
      const param = new URLSearchParams(searchParams.toString());
      if (value == null || value === "" || Array.isArray(value) && value.length === 0) {
        param.delete(key)
      } else if(Array.isArray(value)){
        param.set(key, value.join(","));
      } else {
        param.set(key, value);
      }
      param.delete("page")
      param.set("page", "1");
      router.push(`${pathname}?${param}`, {scroll: false})
  }
  
  return (
    <div className="w-full py-4">
      <div className="flex flex-row gap-4">
        <div className="genre-option flex-1">
        <BrowseFilterItem 
            label="Genres" 
            placeholder="Any Genre..." 
            paramKey="genres" 
            options={genreOptions} 
            instanceId="browse-genre" 
            updateParam={updateParam} 
            isMulti={true}
            />
        </div>
        <div className="status-option flex-1">
         <BrowseFilterItem 
            label="Status" 
            placeholder="Any Status..." 
            paramKey="status" 
            options={STATUS_OPTIONS} 
            instanceId="browse-status" 
            updateParam={updateParam} 
            isMulti={false}
            />
        </div>
        <div className="status-option flex-1">
          <BrowseFilterItem 
            label="Format" 
            placeholder="Any Format..." 
            paramKey="format" 
            options={FORMAT_OPTIONS} 
            instanceId="browse-format" 
            updateParam={updateParam} 
            isMulti={false}
            />
        </div>
        <div className="status-option flex-1">
          <BrowseFilterItem 
            label="Season" 
            placeholder="Any Season..." 
            paramKey="season" 
            options={SEASON_OPTIONS} 
            instanceId="browse-season" 
            updateParam={updateParam} 
            isMulti={false}
            />
        </div>
        <div className="status-option flex-1">
          <BrowseFilterItem 
            label="Year" 
            placeholder="Any Year..." 
            paramKey="year" 
            options={YEAR_OPTIONS} 
            instanceId="browse-year" 
            updateParam={updateParam} 
            isMulti={false}
            />
        </div>
        <div className="status-option flex-1">
          <BrowseFilterItem 
            label="Sort" 
            placeholder="Any Sort..." 
            paramKey="sort" 
            options={SORT_OPTIONS} 
            instanceId="browse-sort" 
            updateParam={updateParam} 
            isMulti={false}
            />
        </div>
      </div>
    </div>
  );
}
