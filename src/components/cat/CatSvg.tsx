import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { CatState } from '../../types';
import CatSitting from './states/CatSitting';
import CatSleeping from './states/CatSleeping';
import CatWaking from './states/CatWaking';
import CatAnnoyed from './states/CatAnnoyed';
import CatSprawled from './states/CatSprawled';
import CatIgnoring from './states/CatIgnoring';
import CatBelly from './states/CatBelly';

interface Props {
  state: CatState;
  size?: number;
}

function CatPose({ state }: { state: CatState }) {
  switch (state) {
    case 'sleeping':
      return <CatSleeping />;
    case 'waking':
      return <CatWaking />;
    case 'annoyed':
      return <CatAnnoyed />;
    case 'happy':
      return <CatSitting happyEyes glow glowColor="#FFD700" />;
    case 'ignoring':
      return <CatIgnoring />;
    case 'sprawled':
      return <CatSprawled />;
    case 'belly':
      return <CatBelly />;
    case 'sitting':
    default:
      return <CatSitting />;
  }
}

export default function CatSvg({ state, size = 1 }: Props) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const prevStateRef = useRef(state);

  // Subtle idle bob animation for sitting/happy states
  const bobY = useSharedValue(0);

  useEffect(() => {
    if (state === 'sitting' || state === 'happy') {
      bobY.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 1800 }),
          withTiming(0, { duration: 1800 })
        ),
        -1,
        true
      );
    } else {
      bobY.value = withTiming(0, { duration: 400 });
    }
  }, [state]);

  // Fade transition when state changes
  useEffect(() => {
    if (prevStateRef.current !== state) {
      prevStateRef.current = state;
      opacity.value = withSequence(
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 300 })
      );
      scale.value = withSequence(
        withTiming(0.92, { duration: 200 }),
        withTiming(1, { duration: 300 })
      );
    }
  }, [state]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value * size },
      { translateY: bobY.value },
    ],
  }));

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <CatPose state={state} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
