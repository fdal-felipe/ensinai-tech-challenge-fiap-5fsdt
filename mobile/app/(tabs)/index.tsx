import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  TextInput, 
  View as RNView, 
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { PostCard } from '@/components/PostCard';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { postsService } from '../../src/api/postsService';
import { Post } from '../../src/types';
import { useAuth } from '@/src/contexts/AuthContext';

export default function PostsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const { user } = useAuth();
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProfessor = user?.role === 'professor';

  // Handle back button press - show exit confirmation
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Sair do aplicativo',
          'Tem certeza que deseja sair do aplicativo?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', style: 'destructive', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true; // Prevent default back behavior
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      const data = await postsService.getPosts(isProfessor);
      setPosts(data);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError('Erro ao conectar. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isProfessor]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchPosts();
      }, 100);
      return;
    }

    setSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setError(null);
        const data = await postsService.searchPosts(searchQuery, isProfessor);
        setPosts(data);
      } catch (err: any) {
        console.error('Error searching posts:', err);
        setError(err.message || 'Erro na busca');
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, isProfessor, fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchQuery('');
    fetchPosts();
  }, [fetchPosts]);

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard post={item} isProfessor={isProfessor} />
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <FontAwesome name="wifi" size={48} color={colors.textSecondary} style={{ marginBottom: 16 }} />
        <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: Colors.primary }]}
          onPress={fetchPosts}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Title Section */}
      <RNView style={[styles.titleSection, { paddingTop: insets.top + 20 }]}>
        <Text style={[styles.title, { color: colors.text }]}>Home</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Abaixo são mostrados os últimos posts criados
        </Text>
      </RNView>

      {/* Search Bar */}
      <RNView style={styles.searchSection}>
        <RNView style={[styles.searchContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <FontAwesome name="search" size={16} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar posts..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCorrect={false}
          />
          {searching && <ActivityIndicator size="small" color={colors.textSecondary} />}
        </RNView>
      </RNView>

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
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
              Nenhum post encontrado
            </Text>
          </RNView>
        }
      />
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 17,
  },
});
