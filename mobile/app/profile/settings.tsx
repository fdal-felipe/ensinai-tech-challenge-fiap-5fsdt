import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  
  const [autoPlay, setAutoPlay] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear stored token
              await SecureStore.deleteItemAsync('userToken');
              // Call signOut from context
              signOut();
              // Navigate to login screen
              router.replace('/login');
            } catch (error) {
              console.log('Logout error:', error);
            }
          }
        },
      ]
    );
  };

  const allItems = [
    { icon: 'moon-o', label: 'Modo escuro', type: 'switch', value: isDark, onToggle: toggleTheme },
    { icon: 'play-circle', label: 'Reprodução automática', type: 'switch', value: autoPlay, onToggle: setAutoPlay },
    { icon: 'download', label: 'Modo offline', type: 'switch', value: offlineMode, onToggle: setOfflineMode },
    { icon: 'shield', label: 'Política de privacidade', type: 'link', onPress: () => router.push('/profile/privacy-policy') },
    { icon: 'file-text-o', label: 'Termos de uso', type: 'link', onPress: () => router.push('/profile/terms-of-use') },
    { icon: 'info-circle', label: 'Sobre o app', type: 'link', onPress: () => router.push('/profile/about') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>

        {/* All Settings with uniform style */}
        <RNView style={styles.section}>
          {allItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.settingItem, { borderColor: colors.border, backgroundColor: colors.card }]}
              activeOpacity={item.type === 'link' ? 0.7 : 1}
              disabled={item.type === 'switch'}
              onPress={item.type === 'link' && item.onPress ? item.onPress : undefined}
            >
              <RNView style={styles.settingLeft}>
                <FontAwesome name={item.icon as any} size={18} color={colors.textSecondary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
              </RNView>
              
              {item.type === 'switch' ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: colors.border, true: Colors.primary + '50' }}
                  thumbColor={item.value ? Colors.primary : colors.textSecondary}
                />
              ) : (
                <FontAwesome name="chevron-right" size={14} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          ))}
        </RNView>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: Colors.error + '15', borderColor: Colors.error }]}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={18} color={Colors.error} />
          <Text style={[styles.logoutText, { color: Colors.error }]}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    gap: 12,
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    height: 64,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingLabel: {
    fontSize: 17,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
