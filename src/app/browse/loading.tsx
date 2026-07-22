import CoverCardSkeleton from "@/components/anime/cover-card-skeleton";

export default function BrowseLoading(){
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
            {Array.from({ length:36 }).map((_, i) => (
                <CoverCardSkeleton key={i} />
            ))}
        </div>
    )
}