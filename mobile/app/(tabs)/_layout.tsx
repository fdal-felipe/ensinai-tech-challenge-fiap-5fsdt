import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

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
<<<<<<< HEAD
  
  const { signed, loading, user } = useAuth();
=======
  const { signed, loading, user, signOut } = useAuth();
>>>>>>> e89679740bb56af64c132b44b8e98e644a407aa0

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

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
<<<<<<< HEAD
        // Esconde o header de todas as telas
        headerShown: false,
=======
        headerRight: () => (
          <TouchableOpacity onPress={signOut} style={{ marginRight: 20 }}>
            <FontAwesome name="sign-out" size={24} color={Colors.error} />
          </TouchableOpacity>
        ),
>>>>>>> e89679740bb56af64c132b44b8e98e644a407aa0
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
          title: 'Posts',
          href: user?.role === 'professor' ? '/posts-admin' : null,
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text" color={color} />,
        }}
      />

      {/* ABA 3: Usuários (Só Professor vê) */}
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuários',
          href: user?.role === 'professor' ? '/users' : null,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />

      {/* ABA 5: Conta (Todos veem) */}
      <Tabs.Screen
        name="account"
        options={{
<<<<<<< HEAD
          title: 'Conta',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
=======
          href: null,
>>>>>>> e89679740bb56af64c132b44b8e98e644a407aa0
        }}
      />
    </Tabs>
  );
}