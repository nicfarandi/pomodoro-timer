import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AchievementDef, ThemeDef } from '../../types';

interface Props {
  achievement: AchievementDef;
  unlocked: boolean;
  theme: ThemeDef;
}

export default function AchievementCard({ achievement, unlocked, theme }: Props) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: unlocked ? theme.surface : theme.background,
          borderColor: unlocked ? theme.accent + '60' : theme.timerTrack,
          opacity: unlocked ? 1 : 0.55,
        },
      ]}
    >
      <Text style={[styles.emoji, { opacity: unlocked ? 1 : 0.3 }]}>
        {unlocked ? achievement.emoji : '🔒'}
      </Text>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{achievement.title}</Text>
        {!achievement.hidden || unlocked ? (
          <Text style={[styles.desc, { color: theme.textMuted }]}>{achievement.description}</Text>
        ) : (
          <Text style={[styles.desc, { color: theme.textMuted }]}>???</Text>
        )}
      </View>
      {unlocked && (
        <View style={[styles.badge, { backgroundColor: theme.accent + '25' }]}>
          <Text style={[styles.badgeText, { color: theme.accent }]}>✓</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
    gap: 12,
  },
  emoji: {
    fontSize: 28,
    width: 38,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  desc: {
    fontSize: 13,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontWeight: '700',
    fontSize: 14,
  },
});
