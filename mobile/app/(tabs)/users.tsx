import React, { useEffect, useState, useCallback } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View as RNView, 
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { usersService } from '../../src/api/usersService';
import { User } from '../../src/types';
import { useAuth } from '../../src/contexts/AuthContext';

export default function UsersScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'professor' | 'aluno'>('professor');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await usersService.getAll();
      // Filtra localmente pois a API retorna todos os usuários
      setUsers(data.filter(u => u.role === activeTab));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsers();
  }, [fetchUsers]);

  const handleEditUser = (userId: number) => {
    router.push(`/users/form?id=${userId}`);
  };

  const handleDeleteUser = async (userToDelete: User) => {
    if (userToDelete.id === user?.id) {
      Alert.alert('Erro', 'Você não pode excluir seu próprio usuário.');
      return;
    }

    Alert.alert(
      'Atenção!',
      `Tem certeza de que deseja excluir o usuário ${userToDelete.name}?`,
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive',
          onPress: async () => {
            try {
              await usersService.delete(userToDelete.id);
              fetchUsers();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            }
          }
        },
      ]
    );
  };

  const handleAddUser = () => {
    router.push('/users/form');
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity 
      style={[styles.userItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => handleEditUser(item.id)}
      activeOpacity={0.7}
    >
      <RNView style={styles.userInfo}>
        <FontAwesome 
          name={item.role === 'professor' ? 'briefcase' : 'graduation-cap'} 
          size={20} 
          color={colors.text} 
          style={styles.roleIcon}
        />
        <RNView>
          <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.email}
          </Text>
        </RNView>
      </RNView>

      <RNView style={styles.actions}>
        <TouchableOpacity 
          onPress={() => handleEditUser(item.id)}
          style={styles.actionButton}
        >
          <FontAwesome name="pencil" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDeleteUser(item)}
          style={styles.actionButton}
        >
          <FontAwesome name="trash" size={18} color={Colors.error} />
        </TouchableOpacity>
      </RNView>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Fixed Title Section */}
      <RNView style={[styles.titleSection, { paddingTop: insets.top + 60 }]}>
        <Text style={[styles.title, { color: colors.text }]}>Usuários</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Gerencie professores e alunos
        </Text>
      </RNView>

      {/* Fixed Tabs (Segmented Control style) */}
      <RNView style={styles.tabsSection}>
        <RNView style={[styles.tabsContainer, { borderColor: colors.border }]}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'professor' && { backgroundColor: colors.text }
            ]}
            onPress={() => setActiveTab('professor')}
          >
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'professor' ? colors.background : colors.text }
            ]}>
              Professores
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'aluno' && { backgroundColor: colors.text }
            ]}
            onPress={() => setActiveTab('aluno')}
          >
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'aluno' ? colors.background : colors.text }
            ]}>
              Alunos
            </Text>
          </TouchableOpacity>
        </RNView>
      </RNView>

      {/* Users List (Scrollable area) */}
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          // If empty, allow content to stretch to center the empty message
          users.length === 0 && { flexGrow: 1, justifyContent: 'center' }
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
        ListEmptyComponent={
          <RNView style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhum {activeTab === 'professor' ? 'professor' : 'aluno'} encontrado
            </Text>
          </RNView>
        }
      />

      {/* Add Button */}
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: colors.text }]}
        onPress={handleAddUser}
      >
        <FontAwesome name="plus" size={24} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  tabsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  roleIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});