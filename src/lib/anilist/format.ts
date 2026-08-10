export function cleanDescription(description: string | null): string {
  if (!description) return "";

  return description.replace(/<[^>]*>?/g, "");
}

export function formatStatusAndType(status: string | null): string {
  if (!status) return "Unknown";

  return status.replace(/_/g, " ");
}

export function formatSeason(
  season: string | null,
  year: number | null,
): string {
  if (!season || !year) return "Unknown";
  const name = season.charAt(0) + season.slice(1).toLowerCase();

  return `${name} ${year}`;
}

export function formatAverageScore(averageScore: number | null): string {
  if (!averageScore) return "N/A";
  const finalScore = averageScore / 10;

  return finalScore.toFixed(1);
}

type AnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export function getCurrentSeason(): { season: AnimeSeason; year: number } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  let season: AnimeSeason;
  if (month <= 3) season = "WINTER";
  else if (month <= 6) season = "SPRING";
  else if (month <= 9) season = "SUMMER";
  else season = "FALL";

  return { season, year };
}

export function formatDate(date: {
  year: number | null;
  month: number | null;
  day: number | null;
}): string {
  if (!date.year || !date.month || !date.day) return "N/A";
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.month - 1];
  const day = date.day.toString().padStart(2, "0");
  return `${month} ${day}, ${date.year}`;
}

export function formatTime(second: number) {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = second % 60;
  const days = Math.floor(hours / 24);
  const hoursLeft = hours % 24;
  const minutesLeft = minutes % 60;
  const secondsLeft = seconds % 60;

  if (days > 0) {
    return `${days}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateToMMDDYY(date: number) {
  const dateObj = new Date(date * 1000);
  const month = MONTH_NAMES[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function formatToTimeAgo(date: number) {
  const now = Date.now();
  const then = date * 1000;
  const diffInMins = Math.floor((now - then) / 60000);

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins}m ago`;

  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInMins / (60 * 24));
  return `${diffInDays}d ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;

  const diffInYear = Math.floor(diffInMonths / 365);
  return `${diffInMonths}y ago`;
}

export function toFuzzyDate(
  value: FormDataEntryValue | null,
): { year: number; month: number; day: number } | null {
  const [year, month, day] = value?.toString().split("-").map(Number) ?? [];
  if (!year || !month || !day) return null;

  return { year, month, day };
}

export function fromFuzzyDate(
  date:
    | { year: number | null; month: number | null; day: number | null }
    | null
    | undefined,
): string {
  if (!date?.year || !date?.month || !date?.day) return "";
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}
