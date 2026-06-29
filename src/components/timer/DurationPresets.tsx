import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ThemeDef } from '../../types';

const PRESETS = [15, 25, 30, 45, 60];

interface Props {
  selected: number;
  onSelect: (minutes: number) => void;
  theme: ThemeDef;
  disabled?: boolean;
}

export default function DurationPresets({ selected, onSelect, theme, disabled }: Props) {
  const handleSelect = (min: number) => {
    if (disabled) return;
    Haptics.selectionAsync().catch(() => {});
    onSelect(min);
  };

  return (
    <View style={styles.row}>
      {PRESETS.map((min) => {
        const active = selected === min;
        return (
          <TouchableOpacity
            key={min}
            onPress={() => handleSelect(min)}
            disabled={disabled}
            style={[
              styles.chip,
              {
                backgroundColor: active ? theme.accent : theme.surface,
                borderColor: active ? theme.accent : theme.timerTrack,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? '#FFFFFF' : theme.textMuted },
              ]}
            >
              {min}m
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
