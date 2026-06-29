import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAppStore } from '../../src/store';
import { THEMES } from '../../src/constants/themes';
import { calcStreak } from '../../src/utils/streakCalc';
import { formatMinutes } from '../../src/utils/dateHelpers';
import { getRank } from '../../src/utils/xp';
import Heatmap from '../../src/components/stats/Heatmap';
import { isWeekend } from 'date-fns';

export default function StatsScreen() {
  const themeName = useAppStore((s) => s.themeName);
  const theme = THEMES[themeName];
  const sessions = useAppStore((s) => s.sessions);
  const totalXP = useAppStore((s) => s.totalXP);

  const { currentStreak, longestStreak } = useMemo(() => calcStreak(sessions), [sessions]);

  const totalMinutes = useMemo(
    () => sessions.reduce((a, s) => a + s.durationMinutes, 0),
    [sessions]
  );

  const todaySessions = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return sessions.filter((s) => s.date === today);
  }, [sessions]);

  const todayMinutes = todaySessions.reduce((a, s) => a + s.durationMinutes, 0);

  const rank = getRank(totalXP);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { color: theme.text }]}>Stats</Text>

        {/* Today card */}
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.textMuted }]}>Today</Text>
          <View style={styles.cardRow}>
            <StatBlock label="Sessions" value={String(todaySessions.length)} theme={theme} />
            <StatBlock label="Focus time" value={formatMinutes(todayMinutes)} theme={theme} />
          </View>
        </View>

        {/* All time */}
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.textMuted }]}>All time</Text>
          <View style={styles.cardRow}>
            <StatBlock label="Sessions" value={String(sessions.length)} theme={theme} />
            <StatBlock label="Focus time" value={formatMinutes(totalMinutes)} theme={theme} />
            <StatBlock label="Total XP" value={String(totalXP)} theme={theme} />
          </View>
        </View>

        {/* Streak */}
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.textMuted }]}>Streak</Text>
          <View style={styles.cardRow}>
            <StatBlock label="Current 🔥" value={`${currentStreak} days`} theme={theme} />
            <StatBlock label="Best ever" value={`${longestStreak} days`} theme={theme} />
          </View>
          <Text style={[styles.streakNote, { color: theme.textMuted }]}>
            Weekends don't count or break your streak.
          </Text>
        </View>

        {/* Rank */}
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.textMuted }]}>Rank</Text>
          <Text style={[styles.rankDisplay, { color: theme.accent }]}>{rank.title}</Text>
          <Text style={[styles.xpLabel, { color: theme.textMuted }]}>{totalXP} XP</Text>
        </View>

        {/* Heatmap */}
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Heatmap sessions={sessions} theme={theme} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBlock({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={styles.statBlock}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 14,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 24,
  },
  statBlock: {
    gap: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
  },
  streakNote: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  rankDisplay: {
    fontSize: 28,
    fontWeight: '800',
  },
  xpLabel: {
    fontSize: 14,
  },
});
