import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function NotificationsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [newPosts, setNewPosts] = useState(true);
  const [comments, setComments] = useState(true);
  const [reminders, setReminders] = useState(false);

  const notificationItems = [
    { icon: 'bell', label: 'Notificações push', value: pushEnabled, onToggle: setPushEnabled },
    { icon: 'envelope', label: 'Notificações por e-mail', value: emailEnabled, onToggle: setEmailEnabled },
    { icon: 'file-text', label: 'Novos posts', value: newPosts, onToggle: setNewPosts },
    { icon: 'comment', label: 'Comentários', value: comments, onToggle: setComments },
    { icon: 'clock-o', label: 'Lembretes de estudo', value: reminders, onToggle: setReminders },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <RNView style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Notificações</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Gerencie seus alertas</Text>
        </RNView>

        {/* Notification Settings */}
        <RNView style={styles.section}>
          {notificationItems.map((item, index) => (
            <RNView 
              key={index}
              style={[styles.settingItem, { borderColor: colors.border, backgroundColor: colors.card }]}
            >
              <RNView style={styles.settingLeft}>
                <FontAwesome name={item.icon as any} size={18} color={colors.textSecondary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
              </RNView>
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: colors.border, true: Colors.primary + '50' }}
                thumbColor={item.value ? Colors.primary : colors.textSecondary}
              />
            </RNView>
          ))}
        </RNView>
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    gap: 12,
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
});
