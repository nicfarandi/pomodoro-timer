import { AchievementDef } from '../types';

function isoWeek(d: Date): number {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Complete your very first session.',
    emoji: '🎯',
    check: ({ sessions }) => sessions.length >= 1,
  },
  {
    id: 'early_riser',
    title: 'Early Riser',
    description: 'Start a session before 9am.',
    emoji: '🌅',
    check: ({ sessions }) =>
      sessions.some((s) => new Date(s.startTime).getHours() < 9),
  },
  {
    id: 'power_hour',
    title: 'Power Hour',
    description: 'Complete a full 60-minute session.',
    emoji: '⚡',
    check: ({ sessions }) => sessions.some((s) => s.durationMinutes >= 60),
  },
  {
    id: 'monday_motivation',
    title: 'Monday Motivation',
    description: 'Complete a session on a Monday.',
    emoji: '💪',
    check: ({ sessions }) =>
      sessions.some((s) => new Date(s.date + 'T00:00:00').getDay() === 1),
  },
  {
    id: 'perfect_week',
    title: 'Perfect Week',
    description: 'Log a session every workday in one week.',
    emoji: '🏆',
    check: ({ sessions }) => {
      const weekMap = new Map<string, Set<number>>();
      for (const s of sessions) {
        const d = new Date(s.date + 'T00:00:00');
        const day = d.getDay();
        if (day === 0 || day === 6) continue;
        const key = `${d.getFullYear()}-${isoWeek(d)}`;
        if (!weekMap.has(key)) weekMap.set(key, new Set());
        weekMap.get(key)!.add(day);
      }
      for (const days of weekMap.values()) {
        if ([1, 2, 3, 4, 5].every((d) => days.has(d))) return true;
      }
      return false;
    },
  },
  {
    id: 'sprint',
    title: 'Sprint',
    description: 'Complete 4+ sessions in one day.',
    emoji: '🚀',
    check: ({ sessions }) => {
      const byDate = new Map<string, number>();
      for (const s of sessions) byDate.set(s.date, (byDate.get(s.date) ?? 0) + 1);
      return [...byDate.values()].some((v) => v >= 4);
    },
  },
  {
    id: 'sessions_10',
    title: 'Getting Started',
    description: '10 sessions completed.',
    emoji: '🌱',
    check: ({ sessions }) => sessions.length >= 10,
  },
  {
    id: 'sessions_50',
    title: 'Committed',
    description: '50 sessions completed.',
    emoji: '🌿',
    check: ({ sessions }) => sessions.length >= 50,
  },
  {
    id: 'sessions_100',
    title: 'Century',
    description: '100 sessions completed.',
    emoji: '💯',
    check: ({ sessions }) => sessions.length >= 100,
  },
  {
    id: 'sessions_500',
    title: 'Legendary',
    description: '500 sessions completed.',
    emoji: '👑',
    check: ({ sessions }) => sessions.length >= 500,
  },
  {
    id: 'streak_10',
    title: '2 Week Streak',
    description: '10 consecutive workdays of focus.',
    emoji: '🔗',
    check: ({ streak }) => streak >= 10,
  },
  {
    id: 'streak_22',
    title: '1 Month Streak',
    description: '22 consecutive workdays of focus.',
    emoji: '📅',
    check: ({ streak }) => streak >= 22,
  },
  {
    id: 'streak_66',
    title: '3 Month Streak',
    description: '66 consecutive workdays of focus.',
    emoji: '🗓️',
    check: ({ streak }) => streak >= 66,
  },
  {
    id: 'hours_10',
    title: '10 Hours',
    description: '10 accumulated hours of focus.',
    emoji: '⏱️',
    check: ({ totalMinutes }) => totalMinutes >= 600,
  },
  {
    id: 'hours_50',
    title: '50 Hours',
    description: '50 accumulated hours of focus.',
    emoji: '⌚',
    check: ({ totalMinutes }) => totalMinutes >= 3000,
  },
  {
    id: 'hours_100',
    title: '100 Hours',
    description: '100 accumulated hours of focus.',
    emoji: '🏅',
    check: ({ totalMinutes }) => totalMinutes >= 6000,
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a session after 9pm.',
    emoji: '🦉',
    hidden: true,
    check: ({ sessions }) =>
      sessions.some((s) => new Date(s.startTime).getHours() >= 21),
  },
  {
    id: 'grind_season',
    title: 'Grind Season',
    description: 'Complete 6 sessions in one day.',
    emoji: '🔥',
    hidden: true,
    check: ({ sessions }) => {
      const byDate = new Map<string, number>();
      for (const s of sessions) byDate.set(s.date, (byDate.get(s.date) ?? 0) + 1);
      return [...byDate.values()].some((v) => v >= 6);
    },
  },
  {
    id: 'comeback_kid',
    title: 'Comeback Kid',
    description: 'Return after being away for 2+ weeks.',
    emoji: '💫',
    hidden: true,
    check: ({ sessions }) => {
      if (sessions.length < 2) return false;
      const sorted = [...sessions].sort((a, b) => a.startTime - b.startTime);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].startTime - sorted[i - 1].startTime > 14 * 86400000) return true;
      }
      return false;
    },
  },
];
