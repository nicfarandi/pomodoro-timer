import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAppStore } from '../../src/store';
import { THEMES } from '../../src/constants/themes';
import { ACHIEVEMENTS } from '../../src/constants/achievements';
import AchievementCard from '../../src/components/achievements/AchievementCard';

export default function AchievementsScreen() {
  const themeName = useAppStore((s) => s.themeName);
  const theme = THEMES[themeName];
  const unlockedAchievements = useAppStore((s) => s.unlockedAchievements);

  const visibleAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter(
      (a) => !a.hidden || unlockedAchievements.includes(a.id)
    );
  }, [unlockedAchievements]);

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.filter((a) => !a.hidden).length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme.text }]}>Badges</Text>
        <Text style={[styles.sub, { color: theme.textMuted }]}>
          {unlockedCount} / {totalCount} unlocked
        </Text>

        <FlatList
          data={visibleAchievements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AchievementCard
              achievement={item}
              unlocked={unlockedAchievements.includes(item.id)}
              theme={theme}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
});
