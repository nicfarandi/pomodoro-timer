import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppStore } from '../../src/store';
import { THEMES } from '../../src/constants/themes';
import { ThemeName } from '../../src/types';
import { getUnlockedThemes } from '../../src/utils/xp';

const THEME_LABELS: Record<ThemeName, string> = {
  minimal: 'Minimal (Default)',
  dark: 'Dark Mode',
  amber: 'Warm Amber',
  navy: 'Deep Navy',
};

const THEME_UNLOCK_HINTS: Partial<Record<ThemeName, string>> = {
  dark: 'Unlock at Analyst',
  amber: 'Unlock at Senior',
  navy: 'Unlock at Director',
};

export default function SettingsScreen() {
  const themeName = useAppStore((s) => s.themeName);
  const theme = THEMES[themeName];
  const catName = useAppStore((s) => s.catName);
  const totalXP = useAppStore((s) => s.totalXP);
  const setTheme = useAppStore((s) => s.setTheme);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(catName);

  const unlockedThemes = getUnlockedThemes(totalXP);

  const saveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    completeOnboarding(trimmed);
    setEditingName(false);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { color: theme.text }]}>Settings</Text>

        {/* Cat name */}
        <Section title="Cat Name" theme={theme}>
          {editingName ? (
            <View style={styles.nameEdit}>
              <TextInput
                style={[
                  styles.nameInput,
                  {
                    color: theme.text,
                    borderColor: theme.accent,
                    backgroundColor: theme.surface,
                  },
                ]}
                value={nameInput}
                onChangeText={setNameInput}
                maxLength={20}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={saveName}
              />
              <TouchableOpacity
                onPress={saveName}
                style={[styles.saveBtn, { backgroundColor: theme.accent }]}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setNameInput(catName);
                  setEditingName(false);
                }}
              >
                <Text style={[styles.cancelText, { color: theme.textMuted }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setNameInput(catName);
                setEditingName(true);
              }}
              style={[styles.nameDisplay, { backgroundColor: theme.surface }]}
            >
              <Text style={[styles.nameDisplayText, { color: theme.text }]}>{catName}</Text>
              <Text style={[styles.editHint, { color: theme.accent }]}>Edit</Text>
            </TouchableOpacity>
          )}
        </Section>

        {/* Theme */}
        <Section title="Theme" theme={theme}>
          {(Object.keys(THEME_LABELS) as ThemeName[]).map((t) => {
            const unlocked = unlockedThemes.includes(t);
            const active = themeName === t;
            return (
              <TouchableOpacity
                key={t}
                disabled={!unlocked}
                onPress={() => setTheme(t)}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: active ? theme.accent + '22' : theme.surface,
                    borderColor: active ? theme.accent : theme.timerTrack,
                    opacity: unlocked ? 1 : 0.45,
                  },
                ]}
              >
                <View style={styles.themeRow}>
                  <Text style={[styles.themeLabel, { color: theme.text }]}>
                    {THEME_LABELS[t]}
                  </Text>
                  {!unlocked && (
                    <Text style={[styles.lockHint, { color: theme.textMuted }]}>
                      🔒 {THEME_UNLOCK_HINTS[t]}
                    </Text>
                  )}
                </View>
                {active && (
                  <Text style={[styles.activeCheck, { color: theme.accent }]}>✓</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </Section>

        {/* About */}
        <Section title="About" theme={theme}>
          <View style={[styles.aboutBox, { backgroundColor: theme.surface }]}>
            <Text style={[styles.aboutText, { color: theme.textMuted }]}>
              Pomo Timer v1.0{'\n'}
              Stay focused. {catName} is watching.
            </Text>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
  theme,
}: {
  title: string;
  children: React.ReactNode;
  theme: any;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionContent: {
    gap: 8,
  },
  nameDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  nameDisplayText: {
    fontSize: 16,
    fontWeight: '500',
  },
  editHint: {
    fontSize: 14,
    fontWeight: '600',
  },
  nameEdit: {
    gap: 10,
  },
  nameInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  saveBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 14,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  themeRow: {
    flex: 1,
    gap: 2,
  },
  themeLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  lockHint: {
    fontSize: 12,
  },
  activeCheck: {
    fontSize: 18,
    fontWeight: '700',
  },
  aboutBox: {
    padding: 16,
    borderRadius: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
