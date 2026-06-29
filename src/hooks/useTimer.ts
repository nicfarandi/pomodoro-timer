import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as Notifications from 'expo-notifications';
import { useAppStore } from '../store';

export function useTimer() {
  const timerStatus = useAppStore((s) => s.timerStatus);
  const startTimestamp = useAppStore((s) => s.startTimestamp);
  const timerDurationMinutes = useAppStore((s) => s.timerDurationMinutes);
  const remainingAtPauseMs = useAppStore((s) => s.remainingAtPauseMs);
  const completeSession = useAppStore((s) => s.completeSession);
  const pauseTimer = useAppStore((s) => s.pauseTimer);
  const resumeTimer = useAppStore((s) => s.resumeTimer);

  const totalMs = timerDurationMinutes * 60_000;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notifIdRef = useRef<string | null>(null);
  const completedRef = useRef(false);

  const [timeRemainingMs, setTimeRemainingMs] = useState(totalMs);

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const cancelNotification = async () => {
    if (notifIdRef.current) {
      await Notifications.cancelScheduledNotificationAsync(notifIdRef.current).catch(() => {});
      notifIdRef.current = null;
    }
  };

  const scheduleNotification = async (secondsFromNow: number) => {
    await cancelNotification();
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Session complete! 🐱',
          body: 'Time to stretch. Your cat is waiting.',
          sound: true,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: Math.max(1, secondsFromNow) },
      });
      notifIdRef.current = id;
    } catch {
      // Notifications not configured — silently ignore
    }
  };

  useEffect(() => {
    if (timerStatus === 'running' && startTimestamp) {
      completedRef.current = false;
      activateKeepAwakeAsync().catch(() => {});
      const remaining = totalMs - (Date.now() - startTimestamp);
      scheduleNotification(Math.floor(remaining / 1000));

      intervalRef.current = setInterval(() => {
        if (!startTimestamp) return;
        const elapsed = Date.now() - startTimestamp;
        const remaining = totalMs - elapsed;

        if (remaining <= 0) {
          if (!completedRef.current) {
            completedRef.current = true;
            clearTick();
            cancelNotification();
            deactivateKeepAwake();
            setTimeRemainingMs(0);
            completeSession();
          }
        } else {
          setTimeRemainingMs(remaining);
        }
      }, 250);
    } else {
      clearTick();
      deactivateKeepAwake();
      cancelNotification();
      if (timerStatus === 'paused' && remainingAtPauseMs !== null) {
        setTimeRemainingMs(remainingAtPauseMs);
      } else if (timerStatus === 'idle') {
        setTimeRemainingMs(totalMs);
      }
    }

    return clearTick;
  }, [timerStatus, startTimestamp, timerDurationMinutes]);

  // Handle app going to background/foreground
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (nextState === 'active' && timerStatus === 'running' && startTimestamp) {
        const elapsed = Date.now() - startTimestamp;
        const remaining = totalMs - elapsed;
        if (remaining <= 0) {
          if (!completedRef.current) {
            completedRef.current = true;
            clearTick();
            cancelNotification();
            deactivateKeepAwake();
            setTimeRemainingMs(0);
            completeSession();
          }
        } else {
          setTimeRemainingMs(remaining);
        }
      }
    });
    return () => sub.remove();
  }, [timerStatus, startTimestamp, timerDurationMinutes]);

  const progress = 1 - timeRemainingMs / totalMs;
  const secondsRemaining = Math.ceil(timeRemainingMs / 1000);
  const displayMinutes = Math.floor(secondsRemaining / 60);
  const displaySeconds = secondsRemaining % 60;

  return {
    timeRemainingMs,
    progress: Math.min(Math.max(progress, 0), 1),
    displayMinutes,
    displaySeconds,
    timerStatus,
    pauseTimer,
    resumeTimer,
  };
}
