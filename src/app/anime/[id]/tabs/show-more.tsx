"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type ShowMoreProps = {
    showAll: boolean;
    remaining: number;
    onToggle: () => void;
}

export default function ShowMoreButton({showAll, remaining, onToggle}: ShowMoreProps){
    return (
        <button type="button" className="text-sm text-muted-text cursor-pointer" onClick={onToggle}>
        {showAll 
        ? <span className="flex items-center gap-1">Show less <ChevronUpIcon className="h-4 w-4" /></span> 
        : <span className="flex items-center gap-1">Show more {remaining} <ChevronDownIcon className="h-4 w-4" /></span>}
      </button>
    )
}