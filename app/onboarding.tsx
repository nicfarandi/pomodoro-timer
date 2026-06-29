import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../src/store';
import CatSvg from '../src/components/cat/CatSvg';
import { THEMES } from '../src/constants/themes';

export default function Onboarding() {
  const [name, setName] = useState('');
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const theme = THEMES.minimal;
  const { width } = useWindowDimensions();

  const handleContinue = () => {
    const catName = name.trim() || 'Cat';
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    completeOnboarding(catName);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <CatSvg state="sitting" />

        <Text style={[styles.heading, { color: theme.text }]}>
          Hi there! 👋
        </Text>
        <Text style={[styles.sub, { color: theme.textMuted }]}>
          Your new desk companion needs a name.{'\n'}
          What shall we call this cat?
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.surface,
              borderColor: theme.timerTrack,
            },
          ]}
          placeholder="e.g. Mochi, Biscuit, Sir Fluffington…"
          placeholderTextColor={theme.textMuted}
          value={name}
          onChangeText={setName}
          maxLength={20}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.accent }]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {name.trim() ? `Let's go, ${name.trim()}!` : "Let's go!"}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.hint, { color: theme.textMuted }]}>
          You can change the name later in Settings.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  sub: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  hint: {
    fontSize: 13,
  },
});
