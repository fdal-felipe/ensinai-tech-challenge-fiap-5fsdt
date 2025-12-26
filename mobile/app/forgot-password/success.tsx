import React from 'react';
import { 
  StyleSheet, 
  View as RNView, 
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function PasswordSuccessScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();

  const handleBackToLogin = () => {
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <RNView style={[styles.content, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Centered content */}
        <RNView style={styles.centerContent}>
          {/* Success Icon - Large green circle with checkmark */}
          <RNView style={[styles.iconContainer, { backgroundColor: Colors.primary }]}>
            <FontAwesome name="check" size={80} color="#FFFFFF" />
          </RNView>

          {/* Title */}
          <Text style={[styles.title, { color: colors.text }]}>Senha confirmada!</Text>
          
          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sua nova senha foi confirmada com sucesso!
          </Text>
        </RNView>

        {/* Back to Login Button - Fixed at bottom */}
        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: colors.text }]}
          onPress={handleBackToLogin}
        >
          <Text style={[styles.loginButtonText, { color: colors.background }]}>
            Voltar ao login
          </Text>
        </TouchableOpacity>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
