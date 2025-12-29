import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';

import { AuthProvider } from '../src/contexts/AuthContext';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';
import Colors from '@/constants/Colors';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login',
};

SplashScreen.preventAutoHideAsync();

// Splash Screen Component
function LoadingScreen() {
  return (
    <View style={[styles.splashContainer, { backgroundColor: '#FFFFFF' }]}>
      <Text style={[styles.splashTitle, { color: '#000000' }]}>EnsinAI</Text>
      <Text style={[styles.splashSubtitle, { color: '#4F4F4F' }]}>
        Plataforma de Ensino
      </Text>
      <ActivityIndicator 
        size="large" 
        color={Colors.primary} 
        style={styles.splashLoader} 
      />
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
        setIsReady(true);
      }, 1500);
    }
  }, [loaded]);

  if (!loaded || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { isDark } = useTheme();

  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password/index" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password/otp" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password/new-password" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password/success" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="post/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="profile/edit" options={{ headerShown: false }} />
        <Stack.Screen name="profile/settings" options={{ headerShown: false }} />
        <Stack.Screen name="profile/notifications" options={{ headerShown: false }} />
        <Stack.Screen name="profile/integrations" options={{ headerShown: false }} />
        <Stack.Screen name="posts/form" options={{ headerShown: false }} />
        <Stack.Screen name="subjects/form" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </NavThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  splashSubtitle: {
    fontSize: 18,
    marginTop: 8,
  },
  splashLoader: {
    marginTop: 40,
  },
});
