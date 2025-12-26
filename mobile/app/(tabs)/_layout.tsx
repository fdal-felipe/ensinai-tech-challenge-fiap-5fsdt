import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext'; // Importe o Contexto

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  // 1. Pegamos os dados do usuário do contexto
  const { signed, loading, user, signOut } = useAuth();

  // 2. Se estiver carregando, mostra loading
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  // 3. Se não estiver logado, chuta para o login
  if (!signed) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
        // Adiciona botão de Logout no topo
        headerRight: () => (
          <TouchableOpacity onPress={signOut} style={{ marginRight: 20 }}>
            <FontAwesome name="sign-out" size={24} color={Colors.error} />
          </TouchableOpacity>
        ),
      }}>
      
      {/* ABA 1: Posts (Todos veem) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* ABA 2: Administração de Posts (Só Professor vê) */}
      <Tabs.Screen
        name="posts-admin"
        options={{
          title: 'Gerenciar',
          // A MÁGICA É AQUI: Se não for professor, href é null (esconde a aba)
          href: user?.role === 'professor' ? '/posts-admin' : null,
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />

      {/* ABA 3: Usuários (Só Professor vê) */}
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuários',
          // A MÁGICA É AQUI: Se não for professor, href é null
          href: user?.role === 'professor' ? '/users' : null,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />

      {/* Esconda a rota 'two' se ela ainda existir ou tiver sido renomeada */}
      <Tabs.Screen
        name="two"
        options={{
          href: null, // Esconde totalmente
        }}
      />
    </Tabs>
  );
}