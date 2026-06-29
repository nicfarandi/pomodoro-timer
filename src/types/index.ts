export type CatState =
  | 'sleeping'   // active session
  | 'sitting'    // idle / break
  | 'waking'     // just completed (transient 10s)
  | 'annoyed'    // just abandoned (transient 10s)
  | 'happy'      // 5+ day streak
  | 'ignoring'   // no streak / long absence
  | 'sprawled'   // weekend
  | 'belly';     // achievement unlocked (transient 10s)

export type TimerStatus = 'idle' | 'running' | 'paused';

export type ThemeName = 'minimal' | 'dark' | 'amber' | 'navy';

export interface SessionRecord {
  id: string;
  date: string;           // YYYY-MM-DD
  startTime: number;      // epoch ms
  durationMinutes: number;
  xpEarned: number;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  emoji: string;
  hidden?: boolean;
  check: (data: AchievementCheckData) => boolean;
}

export interface AchievementCheckData {
  sessions: SessionRecord[];
  streak: number;
  totalMinutes: number;
}

export interface WeeklyReviewData {
  weekLabel: string;
  sessionCount: number;
  totalMinutes: number;
  bestDay: string;
  bestDayCount: number;
  streak: number;
  catComment: string;
}

export interface RankDef {
  title: string;
  minXP: number;
  themeUnlock?: ThemeName;
}

export interface ThemeDef {
  background: string;
  surface: string;
  timerRing: string;
  timerTrack: string;
  text: string;
  textMuted: string;
  accent: string;
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
}
