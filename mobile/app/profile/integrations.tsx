import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  connected: boolean;
}

export default function IntegrationsScreen() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  
  // Mockup integrations
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google',
      name: 'Google',
      description: 'Sincronize com Google Drive e Calendar',
      icon: 'google',
      iconColor: '#4285F4',
      connected: true,
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Conecte seus repositórios de código',
      icon: 'github',
      iconColor: '#333',
      connected: false,
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Receba notificações no Slack',
      icon: 'slack',
      iconColor: '#4A154B',
      connected: false,
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Exporte anotações para o Notion',
      icon: 'book',
      iconColor: '#000',
      connected: true,
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Participe da comunidade EnsinAI',
      icon: 'comments',
      iconColor: '#5865F2',
      connected: false,
    },
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

  const connectedCount = integrations.filter(i => i.connected).length;

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Integrações</Text>
        <RNView style={{ width: 40 }} />
      </RNView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <RNView style={[styles.statsCard, { backgroundColor: Colors.primary + '15', borderColor: Colors.primary + '30' }]}>
          <RNView style={styles.statsIconContainer}>
            <FontAwesome name="plug" size={24} color={Colors.primary} />
          </RNView>
          <RNView style={styles.statsText}>
            <Text style={[styles.statsNumber, { color: Colors.primary }]}>{connectedCount}</Text>
            <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
              {connectedCount === 1 ? 'integração ativa' : 'integrações ativas'}
            </Text>
          </RNView>
        </RNView>

        {/* Integrations List */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          SERVIÇOS DISPONÍVEIS
        </Text>
        
        <RNView style={[styles.integrationsList, { borderColor: colors.border }]}>
          {integrations.map((integration, index) => (
            <RNView 
              key={integration.id}
              style={[
                styles.integrationItem,
                { backgroundColor: colors.card },
                index < integrations.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
            >
              <RNView style={styles.integrationLeft}>
                <RNView style={[styles.integrationIcon, { backgroundColor: integration.iconColor + '15' }]}>
                  <FontAwesome name={integration.icon as any} size={20} color={integration.iconColor} />
                </RNView>
                <RNView style={styles.integrationText}>
                  <RNView style={styles.integrationHeader}>
                    <Text style={[styles.integrationName, { color: colors.text }]}>
                      {integration.name}
                    </Text>
                    {integration.connected && (
                      <RNView style={[styles.connectedBadge, { backgroundColor: Colors.success + '20' }]}>
                        <Text style={[styles.connectedText, { color: Colors.success }]}>Conectado</Text>
                      </RNView>
                    )}
                  </RNView>
                  <Text style={[styles.integrationDescription, { color: colors.textSecondary }]}>
                    {integration.description}
                  </Text>
                </RNView>
              </RNView>
              
              <TouchableOpacity 
                style={[
                  styles.toggleButton,
                  integration.connected 
                    ? { backgroundColor: Colors.error + '15', borderColor: Colors.error + '30' }
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

        {/* Request Integration */}
        <TouchableOpacity 
          style={[styles.requestButton, { borderColor: colors.border }]}
        >
          <FontAwesome name="plus-circle" size={18} color={Colors.primary} />
          <Text style={[styles.requestButtonText, { color: Colors.primary }]}>
            Solicitar nova integração
          </Text>
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
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  statsIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statsText: {},
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  integrationsList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 24,
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  integrationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  integrationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  integrationText: {
    flex: 1,
  },
  integrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  connectedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  connectedText: {
    fontSize: 10,
    fontWeight: '600',
  },
  integrationDescription: {
    fontSize: 13,
    marginTop: 4,
  },
  toggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  toggleButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: 10,
  },
  requestButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
