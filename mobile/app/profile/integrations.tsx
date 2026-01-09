import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

export default function IntegrationsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'google', name: 'Google', icon: 'google', connected: true },
    { id: 'github', name: 'GitHub', icon: 'github', connected: false },
    { id: 'slack', name: 'Slack', icon: 'slack', connected: false },
    { id: 'notion', name: 'Notion', icon: 'book', connected: true },
    { id: 'discord', name: 'Discord', icon: 'comments', connected: false },
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

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
          <Text style={[styles.title, { color: colors.text }]}>Integrações</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Conecte seus serviços</Text>
        </RNView>

        {/* Integrations List */}
        <RNView style={styles.section}>
          {integrations.map((integration) => (
            <RNView 
              key={integration.id}
              style={[styles.integrationItem, { borderColor: colors.border, backgroundColor: colors.card }]}
            >
              <RNView style={styles.integrationLeft}>
                <FontAwesome name={integration.icon as any} size={20} color={colors.textSecondary} />
                <RNView>
                  <Text style={[styles.integrationName, { color: colors.text }]}>
                    {integration.name}
                  </Text>
                  {integration.connected && (
                    <Text style={[styles.connectedText, { color: Colors.primary }]}>
                      Conectado
                    </Text>
                  )}
                </RNView>
              </RNView>
              
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  integration.connected 
                    ? { backgroundColor: Colors.error + '15', borderColor: Colors.error }
                    : { backgroundColor: Colors.primary, borderColor: Colors.primary }
                ]}
                onPress={() => toggleIntegration(integration.id)}
              >
                <Text style={[
                  styles.toggleButtonText,
                  { color: integration.connected ? Colors.error : '#fff' }
                ]}>
                  {integration.connected ? 'Desconectar' : 'Conectar'}
                </Text>
              </TouchableOpacity>
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
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  integrationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  integrationName: {
    fontSize: 17,
    fontWeight: '500',
  },
  connectedText: {
    fontSize: 13,
    marginTop: 2,
  },
  toggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
