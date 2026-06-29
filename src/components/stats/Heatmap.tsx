import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { isWeekend, startOfYear, eachDayOfInterval, format } from 'date-fns';
import { SessionRecord, ThemeDef } from '../../types';

interface Props {
  sessions: SessionRecord[];
  theme: ThemeDef;
}

export default function Heatmap({ sessions, theme }: Props) {
  const { width } = useWindowDimensions();

  const sessionsByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sessions) {
      map.set(s.date, (map.get(s.date) ?? 0) + 1);
    }
    return map;
  }, [sessions]);

  const weeks = useMemo(() => {
    const today = new Date();
    const yearStart = startOfYear(today);
    const allDays = eachDayOfInterval({ start: yearStart, end: today });

    // Only workdays
    const workdays = allDays.filter((d) => !isWeekend(d));

    // Group into weeks
    const weekMap = new Map<string, Date[]>();
    for (const d of workdays) {
      const weekNum = `${d.getFullYear()}-${String(Math.ceil(d.getDate() / 7)).padStart(2, '0')}-${format(d, 'w')}`;
      if (!weekMap.has(weekNum)) weekMap.set(weekNum, []);
      weekMap.get(weekNum)!.push(d);
    }
    return [...weekMap.values()];
  }, []);

  const cellSize = Math.min(20, (width - 80) / Math.max(weeks.length, 1));

  function intensityColor(count: number): string {
    if (count === 0) return theme.timerTrack;
    const accent = theme.accent;
    const opacities = [0.25, 0.5, 0.75, 1.0];
    const opacity = opacities[Math.min(count - 1, 3)];
    return accent + Math.round(opacity * 255).toString(16).padStart(2, '0');
  }

  return (
    <View>
      <Text style={[styles.title, { color: theme.textMuted }]}>
        Focus this year (Mon – Fri)
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {weeks.map((week, wi) => (
            <View key={wi} style={styles.weekCol}>
              {week.map((day) => {
                const ds = format(day, 'yyyy-MM-dd');
                const count = sessionsByDate.get(ds) ?? 0;
                return (
                  <View
                    key={ds}
                    style={[
                      styles.cell,
                      {
                        width: cellSize,
                        height: cellSize,
                        borderRadius: cellSize * 0.25,
                        backgroundColor: intensityColor(count),
                        margin: 1.5,
                      },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.legend}>
        <Text style={[styles.legendLabel, { color: theme.textMuted }]}>Less</Text>
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.legendCell,
              {
                backgroundColor: i === 0 ? theme.timerTrack : theme.accent + Math.round(([0.25, 0.5, 0.75, 1.0][i - 1]) * 255).toString(16).padStart(2, '0'),
                borderRadius: 4,
              },
            ]}
          />
        ))}
        <Text style={[styles.legendLabel, { color: theme.textMuted }]}>More</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  grid: {
    flexDirection: 'row',
  },
  weekCol: {
    flexDirection: 'column',
  },
  cell: {},
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  legendCell: {
    width: 14,
    height: 14,
  },
  legendLabel: {
    fontSize: 11,
    marginHorizontal: 4,
  },
});
