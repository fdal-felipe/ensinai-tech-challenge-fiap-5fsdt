import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  Image,
  TouchableOpacity 
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '../../src/contexts/AuthContext';

// Dados mockup do aluno
const mockStudent = {
  id: 1,
  name: 'Nicholas Gerade',
  email: 'nicholas.gerade@fiap.com.br',
  role: 'aluno' as const,
  avatar: null, // Usaremos ícone placeholder
  enrollmentDate: '2024-03-15',
  coursesEnrolled: 4,
  postsRead: 12,
};

export default function ProfileScreen() {
  // Forçando tema claro conforme Figma
  const colors = Colors.light;
  const { user, signOut } = useAuth();

  const displayUser = user || mockStudent;


  const menuItems = [
    { icon: 'user', label: 'Editar conta', onPress: () => router.push('/profile/edit') },
    { icon: 'cog', label: 'Configurações', onPress: () => router.push('/profile/settings') },
    { icon: 'bell', label: 'Notificações', onPress: () => router.push('/profile/notifications') },
    { icon: 'link', label: 'Integrações', onPress: () => router.push('/profile/integrations') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <RNView style={styles.avatarSection}>
          <RNView style={[styles.avatarContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <FontAwesome name="user" size={48} color={colors.textSecondary} />
          </RNView>
          <Text style={[styles.userName, { color: colors.text }]}>
            {displayUser.name}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {displayUser.email}
          </Text>
        </RNView>

        {/* Stats Section */}
        <RNView style={[styles.statsContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
          <RNView style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>
              {mockStudent.coursesEnrolled}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Matérias
            </Text>
          </RNView>
          <RNView style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <RNView style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.primary }]}>
              {mockStudent.postsRead}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Posts Lidos
            </Text>
          </RNView>
        </RNView>

        {/* Menu Options */}
        <RNView style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem, 
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <RNView style={styles.menuItemLeft}>
                <RNView style={[styles.menuIconContainer, { backgroundColor: colors.inputBackground }]}>
                  <FontAwesome name={item.icon as any} size={18} color={Colors.primary} />
                </RNView>
                <Text style={[styles.menuItemText, { color: colors.text }]}>
                  {item.label}
                </Text>
              </RNView>
              <FontAwesome name="chevron-right" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </RNView>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: Colors.error + '15', borderColor: Colors.error }]}
          onPress={signOut}
          activeOpacity={0.7}
        >
          <FontAwesome name="sign-out" size={18} color={Colors.error} />
          <Text style={[styles.logoutText, { color: Colors.error }]}>
            Sair da conta
          </Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          EnsinAI v1.0.0 • Fase 4
        </Text>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
  },
  statDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: 20,
  },
  menuSection: {
    marginBottom: 24,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
