"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function updateParam(key: string, value: string){
    const param = new URLSearchParams(searchParams.toString());
    if (value === null || value === ""){
        param.delete(key);
    }else{
        param.set(key, value);
    }
    param.delete("page")
    param.set("page", "1");
    setSearchTerm('');
    router.push(`${pathname}?${param}`)
  }

  return (
    <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            updateParam("search", searchTerm)}}>
            <input
                type="text"
                placeholder="Search Anime Titles..."
                className="w-full p-3 rounded-md border bg-card border-border text-muted-text text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    </div>
  );
};

export default SearchFilter;