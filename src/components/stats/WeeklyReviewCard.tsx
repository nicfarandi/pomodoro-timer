import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { WeeklyReviewData, ThemeDef } from '../../types';
import { formatMinutes, dayName } from '../../utils/dateHelpers';

interface Props {
  data: WeeklyReviewData;
  visible: boolean;
  onDismiss: () => void;
  theme: ThemeDef;
}

export default function WeeklyReviewCard({ data, visible, onDismiss, theme }: Props) {
  const { width } = useWindowDimensions();
  const translateY = useSharedValue(600);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 250 });
      translateY.value = withSpring(0, { damping: 18, stiffness: 120 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(600, { duration: 250 });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const cardWidth = Math.min(width * 0.85, 420);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onDismiss} activeOpacity={1} />
        <Animated.View
          style={[
            styles.card,
            cardStyle,
            {
              width: cardWidth,
              backgroundColor: theme.surface,
            },
          ]}
        >
          <Text style={[styles.emoji]}>😸</Text>
          <Text style={[styles.weekLabel, { color: theme.textMuted }]}>{data.weekLabel}</Text>
          <Text style={[styles.heading, { color: theme.text }]}>Weekly Review</Text>

          <View style={[styles.divider, { backgroundColor: theme.timerTrack }]} />

          <View style={styles.stats}>
            <StatRow label="Sessions" value={String(data.sessionCount)} theme={theme} />
            <StatRow label="Focus time" value={formatMinutes(data.totalMinutes)} theme={theme} />
            {data.bestDay ? (
              <StatRow
                label="Best day"
                value={`${dayName(data.bestDay)} (${data.bestDayCount} sessions)`}
                theme={theme}
              />
            ) : null}
            <StatRow label="Streak" value={`🔥 ${data.streak} days`} theme={theme} />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.timerTrack }]} />

          <Text style={[styles.comment, { color: theme.textMuted }]}>
            "{data.catComment}"
          </Text>

          <TouchableOpacity
            onPress={onDismiss}
            style={[styles.button, { backgroundColor: theme.accent }]}
          >
            <Text style={styles.buttonText}>Nice</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

function StatRow({ label, value, theme }: { label: string; value: string; theme: ThemeDef }) {
  return (
    <View style={styles.statRow}>
      <Text style={[styles.statLabel, { color: theme.textMuted }]}>{label}</Text>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 6,
  },
  weekLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 14,
  },
  stats: {
    width: '100%',
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 15,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  comment: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 4,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
