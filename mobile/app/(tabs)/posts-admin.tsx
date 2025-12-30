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
import { postsService } from '../../src/api/postsService';
import { Post } from '../../src/types';

export default function PostsAdminScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await postsService.professor.getAll();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Auto-refresh when screen gains focus (after create/edit/delete)
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);

  const handleEditPost = (postId: number) => {
    router.push(`/posts/form?id=${postId}`);
  };

  const handleDeletePost = async (postId: number) => {
    Alert.alert(
      'Atenção!',
      'Tem certeza de que deseja excluir este post?',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive',
          onPress: async () => {
            try {
              await postsService.professor.delete(postId);
              fetchPosts();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o post.');
            }
          }
        },
      ]
    );
  };

  const handleAddPost = () => {
    router.push('/posts/form');
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity 
      style={[styles.postItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => handleEditPost(item.id)}
      activeOpacity={0.7}
    >
      <Text style={[styles.postTitle, { color: colors.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <RNView style={styles.postActions}>
        <TouchableOpacity 
          onPress={() => handleEditPost(item.id)}
          style={styles.actionButton}
        >
          <FontAwesome name="pencil" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDeletePost(item.id)}
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
      
      {/* Title Section */}
      <RNView style={[styles.titleSection, { paddingTop: insets.top + 20 }]}>
        <Text style={[styles.title, { color: colors.text }]}>Posts</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Abaixo são mostrados os últimos posts criados
        </Text>
      </RNView>

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderPostItem}
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

      {/* Add Button */}
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: colors.text }]}
        onPress={handleAddPost}
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  postItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 12,
  },
  postTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 17,
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
  backButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
