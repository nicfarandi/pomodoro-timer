import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ThemeDef } from '../../types';

const STEP = 5;
const MIN_MINUTES = 5;
const MAX_MINUTES = 180;

interface Props {
  value: number;
  onChange: (minutes: number) => void;
  theme: ThemeDef;
  disabled?: boolean;
}

export default function DurationStepper({ value, onChange, theme, disabled }: Props) {
  const adjust = (delta: number) => {
    if (disabled) return;
    const next = Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, value + delta));
    if (next === value) return;
    Haptics.selectionAsync().catch(() => {});
    onChange(next);
  };

  const atMin = value <= MIN_MINUTES;
  const atMax = value >= MAX_MINUTES;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => adjust(-STEP)}
        disabled={disabled || atMin}
        style={[
          styles.btn,
          {
            backgroundColor: theme.surface,
            borderColor: theme.timerTrack,
            opacity: disabled || atMin ? 0.4 : 1,
          },
        ]}
      >
        <Text style={[styles.btnText, { color: theme.text }]}>−</Text>
      </TouchableOpacity>

      <Text style={[styles.value, { color: theme.text }]}>{value} min</Text>

      <TouchableOpacity
        onPress={() => adjust(STEP)}
        disabled={disabled || atMax}
        style={[
          styles.btn,
          {
            backgroundColor: theme.surface,
            borderColor: theme.timerTrack,
            opacity: disabled || atMax ? 0.4 : 1,
          },
        ]}
      >
        <Text style={[styles.btnText, { color: theme.text }]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 64,
    textAlign: 'center',
  },
});
