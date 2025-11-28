/**
 * Format a date string to Persian date format
 */
export function formatPersianDate(dateString: string): string {
  const date = new Date(dateString);
  const persianDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return persianDate;
}

/**
 * Format a date string to Persian date and time format
 */
export function formatPersianDateTime(dateString: string): string {
  const date = new Date(dateString);
  const persianDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return persianDate;
}

/**
 * Get relative time in Persian (e.g., "2 روز پیش")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "امروز";
  } else if (diffInDays === 1) {
    return "دیروز";
  } else if (diffInDays < 7) {
    return `${diffInDays} روز پیش`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} هفته پیش`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ماه پیش`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} سال پیش`;
  }
}

