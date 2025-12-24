import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function NotificationsScreen() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  
  // Mockup notification settings
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [newPosts, setNewPosts] = useState(true);
  const [comments, setComments] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const notificationSettings = [
    {
      title: 'Canais',
      items: [
        { 
          icon: 'bell', 
          label: 'Notificações push', 
          subtitle: 'Receber notificações no celular',
          value: pushEnabled,
          onToggle: setPushEnabled,
        },
        { 
          icon: 'envelope', 
          label: 'Notificações por e-mail', 
          subtitle: 'Receber atualizações por e-mail',
          value: emailEnabled,
          onToggle: setEmailEnabled,
        },
      ],
    },
    {
      title: 'Tipos de notificação',
      items: [
        { 
          icon: 'file-text', 
          label: 'Novos posts', 
          subtitle: 'Quando professores publicam conteúdo',
          value: newPosts,
          onToggle: setNewPosts,
        },
        { 
          icon: 'comment', 
          label: 'Comentários', 
          subtitle: 'Respostas aos seus comentários',
          value: comments,
          onToggle: setComments,
        },
        { 
          icon: 'clock-o', 
          label: 'Lembretes de estudo', 
          subtitle: 'Lembretes para revisar conteúdo',
          value: reminders,
          onToggle: setReminders,
        },
        { 
          icon: 'bullhorn', 
          label: 'Novidades e promoções', 
          subtitle: 'Comunicados da plataforma',
          value: marketing,
          onToggle: setMarketing,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <RNView style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={16} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notificações</Text>
        <RNView style={{ width: 40 }} />
      </RNView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Banner */}
        <RNView style={[styles.infoBanner, { backgroundColor: Colors.primary + '15', borderColor: Colors.primary + '30' }]}>
          <FontAwesome name="info-circle" size={18} color={Colors.primary} />
          <Text style={[styles.infoText, { color: Colors.primary }]}>
            Gerencie como e quando você deseja receber notificações do EnsinAI.
          </Text>
        </RNView>

        {notificationSettings.map((section, sectionIndex) => (
          <RNView key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            <RNView style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, itemIndex) => (
                <RNView 
                  key={itemIndex}
                  style={[
                    styles.notificationItem,
                    itemIndex < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
                  ]}
                >
                  <RNView style={styles.itemLeft}>
                    <RNView style={[styles.iconContainer, { backgroundColor: colors.inputBackground }]}>
                      <FontAwesome name={item.icon as any} size={16} color={Colors.primary} />
                    </RNView>
                    <RNView style={styles.itemText}>
                      <Text style={[styles.itemLabel, { color: colors.text }]}>{item.label}</Text>
                      <Text style={[styles.itemSubtitle, { color: colors.textSecondary }]}>
                        {item.subtitle}
                      </Text>
                    </RNView>
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
          </RNView>
        ))}

        {/* Test Notification Button */}
        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
        >
          <FontAwesome name="bell-o" size={18} color={Colors.primary} />
          <Text style={[styles.testButtonText, { color: Colors.primary }]}>Enviar notificação de teste</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemText: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  testButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
