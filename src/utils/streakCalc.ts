import { isWeekend } from 'date-fns';
import { SessionRecord } from '../types';
import { dateStr, isWorkday } from './dateHelpers';

export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
  daysSinceLastSession: number;
}

export function calcStreak(sessions: SessionRecord[]): StreakResult {
  const workdaySessions = sessions.filter((s) => {
    const d = new Date(s.date + 'T00:00:00');
    return isWorkday(d);
  });

  if (workdaySessions.length === 0) {
    return { currentStreak: 0, longestStreak: 0, daysSinceLastSession: 999 };
  }

  const datesWithSession = new Set(workdaySessions.map((s) => s.date));
  const sortedDates = [...datesWithSession].sort();
  const firstDate = new Date(sortedDates[0] + 'T00:00:00');

  // Reference: last completed workday (today if it's a workday, else last Friday)
  let refDate = new Date();
  while (isWeekend(refDate)) refDate.setDate(refDate.getDate() - 1);

  // If today is a workday and hasn't had a session yet, don't penalise it
  const todayDateStr = dateStr(new Date());
  let streakStart = new Date(refDate);
  if (isWorkday(new Date()) && !datesWithSession.has(todayDateStr)) {
    streakStart.setDate(streakStart.getDate() - 1);
    while (isWeekend(streakStart)) streakStart.setDate(streakStart.getDate() - 1);
  }

  // Walk backward counting consecutive workdays with sessions
  let currentStreak = 0;
  let d = new Date(streakStart);
  while (d >= firstDate) {
    const ds = dateStr(d);
    if (datesWithSession.has(ds)) {
      currentStreak++;
    } else {
      break;
    }
    d.setDate(d.getDate() - 1);
    while (isWeekend(d) && d >= firstDate) d.setDate(d.getDate() - 1);
  }

  // Compute longest ever streak from sorted dates
  let longest = 1;
  let run = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1] + 'T00:00:00');
    const curr = new Date(sortedDates[i] + 'T00:00:00');
    // Advance prev to next workday
    const expected = new Date(prev);
    expected.setDate(expected.getDate() + 1);
    while (isWeekend(expected)) expected.setDate(expected.getDate() + 1);
    if (dateStr(expected) === sortedDates[i]) {
      run++;
    } else {
      longest = Math.max(longest, run);
      run = 1;
    }
  }
  longest = Math.max(longest, run);

  // Days (workdays) since last session
  const lastSessionDate = new Date(sortedDates[sortedDates.length - 1] + 'T00:00:00');
  let workdaysSince = 0;
  let check = new Date();
  // Don't count today if no session yet today
  if (!datesWithSession.has(todayDateStr)) {
    check.setDate(check.getDate() - 1);
  }
  while (check > lastSessionDate) {
    if (isWorkday(check)) workdaysSince++;
    check.setDate(check.getDate() - 1);
  }

  return {
    currentStreak,
    longestStreak: Math.max(longest, currentStreak),
    daysSinceLastSession: workdaysSince,
  };
}

export function calcWeeklyReviewData(sessions: SessionRecord[], streak: number, catName: string) {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const weekSessions = sessions.filter((s) => {
    const d = new Date(s.date + 'T00:00:00');
    return d >= oneWeekAgo && d <= today;
  });

  const byDay = new Map<string, number>();
  for (const s of weekSessions) {
    byDay.set(s.date, (byDay.get(s.date) ?? 0) + 1);
  }

  let bestDay = '';
  let bestDayCount = 0;
  for (const [day, count] of byDay) {
    if (count > bestDayCount) {
      bestDayCount = count;
      bestDay = day;
    }
  }

  const totalMinutes = weekSessions.reduce((a, s) => a + s.durationMinutes, 0);

  const comments = [
    `Even ${catName} is impressed.`,
    `${catName} approves. Barely.`,
    `${catName} grants you one slow blink.`,
    `Not bad. ${catName} may have purred.`,
    `${catName} has been watching. You did alright.`,
    `${catName} acknowledges your existence.`,
  ];
  const catComment = comments[Math.floor(Math.random() * comments.length)];

  const start = new Date(oneWeekAgo);
  const end = new Date(today);
  const weekLabel = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return {
    weekLabel,
    sessionCount: weekSessions.length,
    totalMinutes,
    bestDay,
    bestDayCount,
    streak,
    catComment,
  };
}
