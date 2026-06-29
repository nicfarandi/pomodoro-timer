import { RANKS } from '../constants/ranks';
import { RankDef, ThemeName } from '../types';

export const XP_PER_MINUTE = 12;

export function calcXP(durationMinutes: number): number {
  return Math.floor(durationMinutes * XP_PER_MINUTE);
}

export function getRank(totalXP: number): RankDef {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (totalXP >= r.minXP) rank = r;
  }
  return rank;
}

export function getNextRank(totalXP: number): RankDef | null {
  const current = getRank(totalXP);
  const idx = RANKS.indexOf(current);
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}

export function getRankProgress(totalXP: number): number {
  const current = getRank(totalXP);
  const next = getNextRank(totalXP);
  if (!next) return 1;
  const progress = totalXP - current.minXP;
  const range = next.minXP - current.minXP;
  return Math.min(progress / range, 1);
}

export function getUnlockedThemes(totalXP: number): ThemeName[] {
  const unlocked: ThemeName[] = ['minimal'];
  for (const r of RANKS) {
    if (r.themeUnlock && totalXP >= r.minXP) unlocked.push(r.themeUnlock);
  }
  return unlocked;
}
