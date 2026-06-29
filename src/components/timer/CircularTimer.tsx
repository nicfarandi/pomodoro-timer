import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ThemeDef } from '../../types';

interface Props {
  progress: number;
  displayMinutes: number;
  displaySeconds: number;
  timerStatus: 'idle' | 'running' | 'paused';
  theme: ThemeDef;
  onPress: () => void;
  onLongPress: () => void;
}

export default function CircularTimer({
  progress,
  displayMinutes,
  displaySeconds,
  timerStatus,
  theme,
  onPress,
  onLongPress,
}: Props) {
  const { width, height } = useWindowDimensions();
  const size = Math.min(width, height) * 0.6;
  const strokeWidth = size * 0.055;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const cx = size / 2;
  const cy = size / 2;

  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 15 });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12 });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const mins = String(displayMinutes).padStart(2, '0');
  const secs = String(displaySeconds).padStart(2, '0');

  const statusLabel =
    timerStatus === 'running'
      ? 'Tap to pause'
      : timerStatus === 'paused'
      ? 'Tap to resume  ·  Hold to stop'
      : 'Tap to start';

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={1500}
        style={styles.pressable}
      >
        <View style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            {/* Track */}
            <Circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={theme.timerTrack}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress ring */}
            <Circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={theme.timerRing}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${cx}, ${cy}`}
            />
          </Svg>
          {/* Center content */}
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <Text style={[styles.time, { color: theme.text, fontSize: size * 0.22 }]}>
              {mins}:{secs}
            </Text>
            <Text style={[styles.label, { color: theme.textMuted, fontSize: size * 0.07 }]}>
              {statusLabel}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontWeight: '200',
    letterSpacing: 2,
  },
  label: {
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
