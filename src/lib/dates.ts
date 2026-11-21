/**
 * Helpers for the "Mon YYYY - Mon YYYY" ranges used throughout the data files.
 * Months are counted as an absolute index (year * 12 + month) so ranges can be
 * laid out on a single linear axis.
 */
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Module-level so components stay pure; refreshed on every build/deploy. */
export const BUILD_DATE = new Date();

export function monthIndex(date: Date) {
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}

export const NOW_INDEX = monthIndex(BUILD_DATE);

function parseMonth(token: string): number | null {
  const match = token.trim().match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month < 0) return null;
  return Number(match[2]) * 12 + month;
}

export type MonthRange = { start: number; end: number; ongoing: boolean };

/** Parses "Jun 2025 - Aug 2025" / "Aug 2023 – Present". */
export function parseRange(range: string): MonthRange | null {
  const [from, to] = range.split(/\s+[-–—]\s+/);
  const start = parseMonth(from ?? "");
  if (start === null) return null;
  const ongoing = !to || /present|now|current/i.test(to);
  const end = ongoing ? NOW_INDEX : parseMonth(to);
  if (end === null) return null;
  // Ranges are inclusive of the final month.
  return { start, end: end + 1, ongoing };
}

export function formatMonthIndex(index: number) {
  const year = Math.floor(index / 12);
  const month = MONTHS[index % 12];
  return `${month[0].toUpperCase()}${month.slice(1)} ${year}`;
}

/** Number of ranges active at each month between min and max (exclusive). */
export function concurrency(ranges: MonthRange[], min: number, max: number) {
  const counts: number[] = [];
  for (let m = min; m < max; m++) {
    counts.push(ranges.filter((r) => r.start <= m && m < r.end).length);
  }
  return counts;
}
