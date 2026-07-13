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

export function formatDate(date: { year: number | null, month: number | null, day: number | null }): string {
  if (!date.year || !date.month || !date.day) return "N/A";
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.month - 1];
  const day = date.day.toString().padStart(2, '0');
  return `${month} ${day}, ${date.year}`;
}

export function formatTime(second: number){
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