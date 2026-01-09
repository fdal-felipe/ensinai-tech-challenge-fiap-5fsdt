import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function AboutScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();

  const developers = [
    { 
      name: 'Felipe Laudano', 
      role: 'Core & Auth',
      linkedin: 'https://www.linkedin.com/in/felipe-laudano/',
      github: 'https://github.com/fdal-felipe',
      email: 'fdal.felipe@gmail.com'
    },
    { 
      name: 'Nicholas Gerade', 
      role: 'Módulo de Conteúdo',
      linkedin: 'https://www.linkedin.com/in/nicholas-gerade-b21a8019b/',
      github: 'https://github.com/nigerade',
      email: 'nicholasgerade@gmail.com'
    },
    { 
      name: 'Felipe Seiji', 
      role: 'Módulo Administrativo',
      linkedin: 'https://www.linkedin.com/in/felipe-seiji-souza-matie-82835a150/',
      github: 'https://github.com/FeSeiji',
      email: 'seijimatie@gmail.com'
    },
    { 
      name: 'Tiago Mendes', 
      role: 'Gestão de Usuários',
      linkedin: 'https://www.linkedin.com/in/tiagomendescarvalho/',
      github: 'https://github.com/TiagoMendes-pixel',
      email: 'tiagoletras123@gmail.com'
    },
  ];

  const technologies = [
    'React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'
  ];

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };
  
  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

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
            <Text style={[styles.title, { color: colors.text }]}>Sobre o App</Text>
        </RNView>

        {/* Logo / Banner Area */}
        <RNView style={styles.bannerContainer}>
            <FontAwesome name="graduation-cap" size={64} color={Colors.primary} />
            <Text style={[styles.appName, { color: colors.text }]}>Ensinai</Text>
            <Text style={[styles.version, { color: colors.textSecondary }]}>Versão 1.0.0 (Fase 4)</Text>
        </RNView>

        {/* Description */}
        <RNView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.description, { color: colors.text }]}>
                O Ensinai é uma plataforma completa de blogging educacional, desenvolvida como parte do Tech Challenge da Pós-Graduação em Full Stack Development da FIAP.
                {'\n\n'}
                Conecta professores e alunos através do compartilhamento de conhecimento, permitindo a gestão de postagens e matérias de forma simples e eficiente.
            </Text>
        </RNView>

        {/* Developers */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Desenvolvedores</Text>
        <RNView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {developers.map((dev, index) => (
                <RNView key={index} style={[
                    styles.devItem, 
                    index !== developers.length - 1 && styles.devItemBorder,
                    { borderColor: colors.border }
                ]}>
                    <RNView style={styles.devInfo}>
                        <Text style={[styles.devName, { color: colors.text }]}>{dev.name}</Text>
                        <Text style={[styles.devRole, { color: colors.textSecondary }]}>{dev.role}</Text>
                    </RNView>
                    
                    <RNView style={styles.socialLinks}>
                        <TouchableOpacity 
                            style={[styles.iconButton, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}
                            onPress={() => handleLink(dev.linkedin)}
                        >
                            <FontAwesome name="linkedin" size={20} color="#0077b5" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.iconButton, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}
                            onPress={() => handleLink(dev.github)}
                        >
                            <FontAwesome name="github" size={20} color={isDark ? '#FFF' : '#333'} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.iconButton, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}
                            onPress={() => handleEmail(dev.email)}
                        >
                            <FontAwesome name="envelope" size={18} color={Colors.primary} />
                        </TouchableOpacity>
                    </RNView>
                </RNView>
            ))}
        </RNView>

        {/* Tech Stack */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tecnologias</Text>
        <RNView style={[styles.techContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {technologies.map((tech, index) => (
                <RNView key={index} style={[styles.techChip, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <Text style={[styles.techText, { color: colors.textSecondary }]}>{tech}</Text>
                </RNView>
            ))}
        </RNView>

        {/* External Links */}
        <TouchableOpacity 
            style={[styles.linkButton, { backgroundColor: Colors.primary }]}
            onPress={() => handleLink('https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt')}
        >
            <FontAwesome name="github" size={20} color="#FFF" />
            <Text style={styles.linkText}>Ver repositório completo</Text>
        </TouchableOpacity>

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
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20, // Added spacing as requested
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.primary,
  },
  version: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4,
  },
  devItem: {
    flexDirection: 'row', // Change to row
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16, // Increase padding
  },
  devItemBorder: {
    borderBottomWidth: 1,
  },
  devInfo: {
    flex: 1, // Allow text to take space
    marginRight: 16,
  },
  devName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  devRole: {
    fontSize: 14,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 10, // Larger touch target
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent', // Default transparent
    alignItems: 'center',
    justifyContent: 'center',
    width: 44, // Fixed size
    height: 44,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
  },
  techChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  techText: {
    fontSize: 13,
    fontWeight: '500',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 50,
    gap: 12,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
