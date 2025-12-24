import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  StyleSheet, 
  FlatList, 
  TextInput, 
  View as RNView, 
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity 
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import { PostCard } from '@/components/PostCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
// TODO: Habilitar quando login for implementado
// import { useAuth } from '../../src/contexts/AuthContext';
import { postsService } from '../../src/api/postsService';
import { Post } from '../../src/types';

export default function PostsScreen() {
  // Forçando tema claro conforme Figma
  const colors = Colors.light;
  // const { user } = useAuth(); // TODO: Habilitar quando login for implementado
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  
  // Debounce timer ref
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // TODO: Quando login for implementado, usar: user?.role === 'professor'
  // Por enquanto, força uso dos endpoints de aluno (públicos, sem auth)
  const isProfessor = false;

  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      const data = await postsService.getPosts(isProfessor);
      setPosts(data);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isProfessor]);

  // Live search with debounce (500ms delay)
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If search is empty, reload all posts
    if (!searchQuery.trim()) {
      // Small delay to avoid flickering when typing fast
      searchTimeoutRef.current = setTimeout(() => {
        fetchPosts();
      }, 100);
      return;
    }

    // Set new timeout for debounced search
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

    // Cleanup on unmount
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

  const handlePostPress = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="inbox" size={48} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Nenhum post encontrado
      </Text>
    </View>
  );

  // Error state
  if (error && posts.length === 0) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <FontAwesome name="exclamation-triangle" size={48} color={Colors.error} />
        <Text style={[styles.errorTitle, { color: colors.text }]}>
          Erro de Conexão
        </Text>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          {error}
        </Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: Colors.primary }]}
          onPress={fetchPosts}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Loading state
  if (loading && posts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Carregando posts...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <RNView style={styles.header}>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Seja Bem vindo!
        </Text>
      </RNView>

      {/* Search Bar */}
      <RNView style={[styles.searchContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
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
      </RNView>

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => handlePostPress(item.id)}
            showEditIcon={isProfessor}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
            colors={[colors.tint]}
          />
        }
        showsVerticalScrollIndicator={false}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 14,
    marginTop: 12,
  },
});
