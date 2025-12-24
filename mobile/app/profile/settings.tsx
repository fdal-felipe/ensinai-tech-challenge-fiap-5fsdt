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

export default function SettingsScreen() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  
  // Mockup settings state
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const settingsSections = [
    {
      title: 'Aparência',
      items: [
        { 
          icon: 'moon-o', 
          label: 'Modo escuro', 
          subtitle: 'Ativar tema escuro',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Conteúdo',
      items: [
        { 
          icon: 'play-circle', 
          label: 'Reprodução automática', 
          subtitle: 'Reproduzir vídeos automaticamente',
          type: 'switch',
          value: autoPlay,
          onToggle: setAutoPlay,
        },
        { 
          icon: 'download', 
          label: 'Modo offline', 
          subtitle: 'Baixar conteúdo para acesso offline',
          type: 'switch',
          value: offlineMode,
          onToggle: setOfflineMode,
        },
      ],
    },
    {
      title: 'Privacidade',
      items: [
        { 
          icon: 'bar-chart', 
          label: 'Compartilhar analytics', 
          subtitle: 'Ajude-nos a melhorar o app',
          type: 'switch',
          value: analytics,
          onToggle: setAnalytics,
        },
        { 
          icon: 'shield', 
          label: 'Política de privacidade', 
          type: 'link',
        },
        { 
          icon: 'file-text-o', 
          label: 'Termos de uso', 
          type: 'link',
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        { 
          icon: 'info-circle', 
          label: 'Versão do app', 
          subtitle: '1.0.0 (Fase 4)',
          type: 'info',
        },
        { 
          icon: 'code', 
          label: 'Licenças de código aberto', 
          type: 'link',
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Configurações</Text>
        <RNView style={{ width: 40 }} />
      </RNView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <RNView key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            <RNView style={[styles.sectionContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
                  ]}
                  activeOpacity={item.type === 'link' ? 0.7 : 1}
                >
                  <RNView style={styles.settingLeft}>
                    <RNView style={[styles.iconContainer, { backgroundColor: colors.inputBackground }]}>
                      <FontAwesome name={item.icon as any} size={16} color={Colors.primary} />
                    </RNView>
                    <RNView>
                      <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
                      {item.subtitle && (
                        <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                          {item.subtitle}
                        </Text>
                      )}
                    </RNView>
                  </RNView>
                  
                  {item.type === 'switch' && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: colors.border, true: Colors.primary + '50' }}
                      thumbColor={item.value ? Colors.primary : colors.textSecondary}
                    />
                  )}
                  {item.type === 'link' && (
                    <FontAwesome name="chevron-right" size={14} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              ))}
            </RNView>
          </RNView>
        ))}

        {/* Clear Cache Button */}
        <TouchableOpacity 
          style={[styles.clearCacheButton, { borderColor: colors.border }]}
        >
          <FontAwesome name="trash-o" size={18} color={colors.textSecondary} />
          <Text style={[styles.clearCacheText, { color: colors.textSecondary }]}>Limpar cache</Text>
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  clearCacheButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  clearCacheText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
