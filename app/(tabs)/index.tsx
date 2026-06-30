import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../../src/store';
import { useTimer } from '../../src/hooks/useTimer';
import { THEMES } from '../../src/constants/themes';
import { ACHIEVEMENTS } from '../../src/constants/achievements';
import { getRank, getRankProgress, getNextRank } from '../../src/utils/xp';
import { calcStreak } from '../../src/utils/streakCalc';
import CatSvg from '../../src/components/cat/CatSvg';
import CircularTimer from '../../src/components/timer/CircularTimer';
import DurationPresets from '../../src/components/timer/DurationPresets';
import DurationStepper from '../../src/components/timer/DurationStepper';
import WeeklyReviewCard from '../../src/components/stats/WeeklyReviewCard';

export default function TimerScreen() {
  const themeName = useAppStore((s) => s.themeName);
  const theme = THEMES[themeName];
  const catName = useAppStore((s) => s.catName);
  const catState = useAppStore((s) => s.catState);
  const timerDurationMinutes = useAppStore((s) => s.timerDurationMinutes);
  const timerStatus = useAppStore((s) => s.timerStatus);
  const setTimerDuration = useAppStore((s) => s.setTimerDuration);
  const startTimer = useAppStore((s) => s.startTimer);
  const abandonTimer = useAppStore((s) => s.abandonTimer);
  const totalXP = useAppStore((s) => s.totalXP);
  const sessions = useAppStore((s) => s.sessions);
  const newAchievementId = useAppStore((s) => s.newAchievementId);
  const clearNewAchievement = useAppStore((s) => s.clearNewAchievement);
  const weeklyReviewPending = useAppStore((s) => s.weeklyReviewPending);
  const weeklyReviewData = useAppStore((s) => s.weeklyReviewData);
  const dismissWeeklyReview = useAppStore((s) => s.dismissWeeklyReview);
  const refreshCatState = useAppStore((s) => s.refreshCatState);

  const { width, height } = useWindowDimensions();
  const isRunning = timerStatus === 'running';
  const isPaused = timerStatus === 'paused';

  const { progress, displayMinutes, displaySeconds, pauseTimer, resumeTimer } = useTimer();

  const rank = getRank(totalXP);
  const nextRank = getNextRank(totalXP);
  const rankProgress = getRankProgress(totalXP);
  const { currentStreak } = calcStreak(sessions);

  // Show achievement toast when new one unlocked
  useEffect(() => {
    if (newAchievementId) {
      const ach = ACHIEVEMENTS.find((a) => a.id === newAchievementId);
      if (ach) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        Alert.alert(
          `${ach.emoji} Achievement Unlocked!`,
          `"${ach.title}" — ${ach.description}`,
          [{ text: 'Nice!', onPress: clearNewAchievement }]
        );
      }
    }
  }, [newAchievementId]);

  // Refresh cat state on mount
  useEffect(() => {
    refreshCatState();
  }, []);

  const handleTimerPress = () => {
    if (timerStatus === 'idle') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      startTimer();
    } else if (timerStatus === 'running') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      pauseTimer();
    } else if (timerStatus === 'paused') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      resumeTimer();
    }
  };

  const handleLongPress = () => {
    if (timerStatus === 'idle') return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    Alert.alert('Stop Session?', 'Your progress for this session will not be saved.', [
      { text: 'Keep going', style: 'cancel' },
      {
        text: 'Stop',
        style: 'destructive',
        onPress: () => {
          abandonTimer();
        },
      },
    ]);
  };

  const isTablet = width > 600;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        {/* Header: Rank + Streak */}
        <View style={styles.header}>
          <View style={styles.rankWrap}>
            <Text style={[styles.rankTitle, { color: theme.accent }]}>{rank.title}</Text>
            {nextRank && (
              <View style={[styles.xpBar, { backgroundColor: theme.timerTrack }]}>
                <View
                  style={[
                    styles.xpFill,
                    { backgroundColor: theme.accent, width: `${rankProgress * 100}%` },
                  ]}
                />
              </View>
            )}
          </View>
          {currentStreak > 0 && (
            <View style={styles.streakWrap}>
              <Text style={[styles.streakText, { color: theme.text }]}>
                🔥 {currentStreak}
              </Text>
              <Text style={[styles.streakLabel, { color: theme.textMuted }]}>streak</Text>
            </View>
          )}
        </View>

        {/* Cat */}
        <View style={styles.catWrap}>
          <CatSvg state={catState} size={isTablet ? 1.1 : 0.9} />
          <Text style={[styles.catName, { color: theme.textMuted }]}>{catName}</Text>
        </View>

        {/* Timer ring */}
        <CircularTimer
          progress={progress}
          displayMinutes={displayMinutes}
          displaySeconds={displaySeconds}
          timerStatus={timerStatus}
          theme={theme}
          onPress={handleTimerPress}
          onLongPress={handleLongPress}
        />

        {/* Duration presets + custom stepper — only when idle */}
        <View style={styles.presetsWrap}>
          <DurationPresets
            selected={timerDurationMinutes}
            onSelect={setTimerDuration}
            theme={theme}
            disabled={isRunning || isPaused}
          />
          <DurationStepper
            value={timerDurationMinutes}
            onChange={setTimerDuration}
            theme={theme}
            disabled={isRunning || isPaused}
          />
        </View>

        {/* XP earned today */}
        <Text style={[styles.todayXP, { color: theme.textMuted }]}>
          {totalXP} XP total
        </Text>
      </View>

      {/* Weekly review modal */}
      {weeklyReviewData && (
        <WeeklyReviewCard
          data={weeklyReviewData}
          visible={weeklyReviewPending}
          onDismiss={dismissWeeklyReview}
          theme={theme}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  containerTablet: {
    paddingHorizontal: 48,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankWrap: {
    gap: 4,
  },
  rankTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  xpBar: {
    width: 100,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 2,
  },
  streakWrap: {
    alignItems: 'center',
  },
  streakText: {
    fontSize: 20,
    fontWeight: '700',
  },
  streakLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  catWrap: {
    alignItems: 'center',
    gap: 4,
  },
  catName: {
    fontSize: 13,
    letterSpacing: 1,
  },
  presetsWrap: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  todayXP: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
