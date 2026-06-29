import { format, isWeekend, getISOWeek, getISOWeekYear } from 'date-fns';

export function isWorkday(date: Date): boolean {
  return !isWeekend(date);
}

export function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function dateStr(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

export function weekKey(d: Date): string {
  const week = String(getISOWeek(d)).padStart(2, '0');
  return `${getISOWeekYear(d)}-W${week}`;
}

export function isFridayToday(): boolean {
  return new Date().getDay() === 5;
}

export function isWeekendToday(): boolean {
  return isWeekend(new Date());
}

export function dayName(ds: string): string {
  const d = new Date(ds + 'T00:00:00');
  return format(d, 'EEEE');
}

export function prevWorkday(d: Date): Date {
  const prev = new Date(d);
  do {
    prev.setDate(prev.getDate() - 1);
  } while (isWeekend(prev));
  return prev;
}

export function formatMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
