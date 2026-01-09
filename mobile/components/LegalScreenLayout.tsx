import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';

export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalScreenLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  crossLinkText?: string;
  crossLinkRoute?: string;
}

export default function LegalScreenLayout({
  title,
  lastUpdated,
  sections,
  crossLinkText,
  crossLinkRoute,
}: LegalScreenLayoutProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <RNView style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </RNView>

        {/* Last Updated */}
        <Text style={[styles.lastUpdated, { color: colors.textSecondary }]} selectable>
          {lastUpdated}
        </Text>

        {/* Content Sections */}
        {sections.map((section, index) => (
          <RNView key={index} style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]} selectable>
              {section.title}
            </Text>
            <Text style={[styles.sectionContent, { color: colors.textSecondary }]} selectable>
              {section.content}
            </Text>
          </RNView>
        ))}

        {/* Cross Link */}
        {crossLinkText && crossLinkRoute && (
          <TouchableOpacity 
            style={[styles.crossLinkButton, { borderColor: colors.border }]}
            onPress={() => router.push(crossLinkRoute as any)}
          >
            <Text style={[styles.crossLinkText, { color: Colors.primary }]}>
              {crossLinkText}
            </Text>
            <FontAwesome name="arrow-right" size={14} color={Colors.primary} />
          </TouchableOpacity>
        )}

        {/* Footer */}
        <RNView style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]} selectable>
            © 2025 Ensinai. Todos os direitos reservados.
          </Text>
        </RNView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  lastUpdated: {
    fontSize: 14,
    marginBottom: 24,
    marginLeft: 4,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
  },
  crossLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    gap: 8,
  },
  crossLinkText: {
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
  },
});
