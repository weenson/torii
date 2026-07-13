import type { AnimeByID } from "@/types/anime";

export default function StaffTab({ staff }: { staff: AnimeByID["staff"] }) {
  if (!staff?.edges.length) {
    return <p className="text-sm text-muted-text">No staff data.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {staff.edges.map((edge) => (
        <li
          key={`${edge.node.name.full}-${edge.role}`}
          className="flex flex-row items-start gap-2 rounded-lg border border-border p-2 sm:p-3"
        >
          <img
            src={edge.node.image.large}
            alt={edge.node.name.full}
            className="h-16 w-12 shrink-0 rounded-lg object-cover sm:h-20 sm:w-14"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{edge.node.name.full}</p>
            <p className="text-xs text-muted-text">{edge.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
