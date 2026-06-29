import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CatState, SessionRecord, ThemeName, TimerStatus, WeeklyReviewData } from '../types';
import { calcXP } from '../utils/xp';
import { calcStreak, calcWeeklyReviewData } from '../utils/streakCalc';
import { todayStr, weekKey, isFridayToday, isWeekendToday } from '../utils/dateHelpers';
import { ACHIEVEMENTS } from '../constants/achievements';

const TRANSIENT_MS = 10_000;

interface AppStore {
  // Onboarding
  hasCompletedOnboarding: boolean;
  catName: string;

  // Timer
  timerDurationMinutes: number;
  timerStatus: TimerStatus;
  startTimestamp: number | null;
  remainingAtPauseMs: number | null;

  // Sessions
  sessions: SessionRecord[];

  // XP
  totalXP: number;

  // Achievements
  unlockedAchievements: string[];
  newAchievementId: string | null;

  // Weekly review
  weeklyReviewPending: boolean;
  weeklyReviewData: WeeklyReviewData | null;
  lastWeeklyReviewWeek: string | null;

  // Cat
  catState: CatState;
  catTransientUntil: number | null;

  // Settings
  themeName: ThemeName;

  // Actions
  completeOnboarding: (name: string) => void;
  setTimerDuration: (minutes: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  abandonTimer: () => void;
  completeSession: () => void;
  dismissWeeklyReview: () => void;
  clearNewAchievement: () => void;
  setTheme: (theme: ThemeName) => void;
  refreshCatState: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      catName: 'Cat',
      timerDurationMinutes: 25,
      timerStatus: 'idle',
      startTimestamp: null,
      remainingAtPauseMs: null,
      sessions: [],
      totalXP: 0,
      unlockedAchievements: [],
      newAchievementId: null,
      weeklyReviewPending: false,
      weeklyReviewData: null,
      lastWeeklyReviewWeek: null,
      catState: 'sitting',
      catTransientUntil: null,
      themeName: 'minimal',

      completeOnboarding: (name) => set({ hasCompletedOnboarding: true, catName: name }),

      setTimerDuration: (minutes) => set({ timerDurationMinutes: minutes }),

      startTimer: () => {
        set({
          timerStatus: 'running',
          startTimestamp: Date.now(),
          remainingAtPauseMs: null,
          catState: 'sleeping',
          catTransientUntil: null,
        });
      },

      pauseTimer: () => {
        const { startTimestamp, timerDurationMinutes } = get();
        if (!startTimestamp) return;
        const elapsed = Date.now() - startTimestamp;
        const totalMs = timerDurationMinutes * 60_000;
        set({
          timerStatus: 'paused',
          remainingAtPauseMs: Math.max(0, totalMs - elapsed),
          startTimestamp: null,
        });
        get().refreshCatState();
      },

      resumeTimer: () => {
        const { remainingAtPauseMs, timerDurationMinutes } = get();
        const totalMs = timerDurationMinutes * 60_000;
        const remaining = remainingAtPauseMs ?? totalMs;
        set({
          timerStatus: 'running',
          startTimestamp: Date.now() - (totalMs - remaining),
          remainingAtPauseMs: null,
          catState: 'sleeping',
          catTransientUntil: null,
        });
      },

      abandonTimer: () => {
        const { startTimestamp } = get();
        const elapsed = startTimestamp ? Date.now() - startTimestamp : 0;
        const elapsedMinutes = elapsed / 60_000;

        // Only trigger annoyed cat if session ran > 1 min
        const shouldAnnoy = elapsedMinutes > 1;
        const until = shouldAnnoy ? Date.now() + TRANSIENT_MS : null;

        set({
          timerStatus: 'idle',
          startTimestamp: null,
          remainingAtPauseMs: null,
          catState: shouldAnnoy ? 'annoyed' : 'sitting',
          catTransientUntil: until,
        });

        if (shouldAnnoy) {
          setTimeout(() => get().refreshCatState(), TRANSIENT_MS + 100);
        }
      },

      completeSession: () => {
        const { timerDurationMinutes, sessions, totalXP, unlockedAchievements, catName } = get();
        const xp = calcXP(timerDurationMinutes);
        const newXP = totalXP + xp;

        const newSession: SessionRecord = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          date: todayStr(),
          startTime: Date.now(),
          durationMinutes: timerDurationMinutes,
          xpEarned: xp,
        };

        const updatedSessions = [...sessions, newSession].slice(-500);
        const { currentStreak } = calcStreak(updatedSessions);
        const totalMinutes = updatedSessions.reduce((a, s) => a + s.durationMinutes, 0);

        // Check achievements
        const checkData = { sessions: updatedSessions, streak: currentStreak, totalMinutes };
        let newAchievementId: string | null = null;
        for (const a of ACHIEVEMENTS) {
          if (!unlockedAchievements.includes(a.id) && a.check(checkData)) {
            newAchievementId = a.id;
            break;
          }
        }

        const newUnlocked = newAchievementId
          ? [...unlockedAchievements, newAchievementId]
          : unlockedAchievements;

        // Weekly review on Fridays
        let weeklyReviewPending = get().weeklyReviewPending;
        let weeklyReviewData = get().weeklyReviewData;
        let lastWeeklyReviewWeek = get().lastWeeklyReviewWeek;
        const currentWeek = weekKey(new Date());
        if (isFridayToday() && lastWeeklyReviewWeek !== currentWeek) {
          weeklyReviewData = calcWeeklyReviewData(updatedSessions, currentStreak, catName);
          weeklyReviewPending = true;
          lastWeeklyReviewWeek = currentWeek;
        }

        const catState = newAchievementId ? 'belly' : 'waking';
        const catTransientUntil = Date.now() + TRANSIENT_MS;

        set({
          timerStatus: 'idle',
          startTimestamp: null,
          remainingAtPauseMs: null,
          sessions: updatedSessions,
          totalXP: newXP,
          unlockedAchievements: newUnlocked,
          newAchievementId,
          weeklyReviewPending,
          weeklyReviewData,
          lastWeeklyReviewWeek,
          catState,
          catTransientUntil,
        });

        setTimeout(() => get().refreshCatState(), TRANSIENT_MS + 100);
      },

      dismissWeeklyReview: () => set({ weeklyReviewPending: false }),

      clearNewAchievement: () => set({ newAchievementId: null }),

      setTheme: (theme) => set({ themeName: theme }),

      refreshCatState: () => {
        const { catTransientUntil, timerStatus } = get();
        if (catTransientUntil && Date.now() < catTransientUntil) return;

        if (timerStatus === 'running') {
          set({ catState: 'sleeping', catTransientUntil: null });
          return;
        }

        if (isWeekendToday()) {
          set({ catState: 'sprawled', catTransientUntil: null });
          return;
        }

        const { sessions } = get();
        const { currentStreak, daysSinceLastSession } = calcStreak(sessions);

        if (currentStreak >= 5) {
          set({ catState: 'happy', catTransientUntil: null });
        } else if (daysSinceLastSession >= 2) {
          set({ catState: 'ignoring', catTransientUntil: null });
        } else {
          set({ catState: 'sitting', catTransientUntil: null });
        }
      },
    }),
    {
      name: 'pomodoro-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        catName: state.catName,
        timerDurationMinutes: state.timerDurationMinutes,
        sessions: state.sessions,
        totalXP: state.totalXP,
        unlockedAchievements: state.unlockedAchievements,
        lastWeeklyReviewWeek: state.lastWeeklyReviewWeek,
        themeName: state.themeName,
      }),
    }
  )
);
