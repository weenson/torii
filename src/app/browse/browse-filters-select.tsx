"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Select, { ClassNamesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import type { Option } from "@/lib/anilist/filter-opt"

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
  
const animatedComponents = makeAnimated();

type FilterSelectProps = {
  label: string;
  placeholder: string;
  paramKey: string;
  options: Option[];
  instanceId: string;
  isMulti: boolean;
  updateParam: (key: string, value: string | string[] | null) => void;
}

export default function BrowseFilterItem({label, placeholder, paramKey, options, instanceId, updateParam, isMulti}: FilterSelectProps){
  const searchParams = useSearchParams();
  return isMulti ? (
        <div>
          <label className="mb-1 block text-xs text-muted-text font-black">{label}</label> 
            <Select<Option, true>
             instanceId={instanceId}
             unstyled
             isMulti
             value={options.filter((o) => (searchParams.get(paramKey)?.split(',') ?? []).includes(o.value))}
             onChange={(opt) => updateParam(paramKey, opt?.map((o) => o.value) ?? null)}
             components={animatedComponents}
             closeMenuOnSelect={false}
             options={options}
             placeholder={placeholder}
             classNamePrefix="torii-select"
             classNames={selectClassNames}
            />
        </div>
    ) : 
        <div>
          <label className="mb-1 block text-xs text-muted-text font-black">{label}</label> 
            <Select<Option, false>
            instanceId={instanceId}
            unstyled
            isClearable
            value={options.find((o) => o.value === searchParams.get(paramKey)) ?? null}
            onChange={(opt) => updateParam(paramKey, opt?.value ?? null)}
            components={animatedComponents}
            closeMenuOnSelect={false}
            options={options}
            placeholder={placeholder}
            classNamePrefix="torii-select"
            classNames={selectClassNames}
            />
      </div>
}