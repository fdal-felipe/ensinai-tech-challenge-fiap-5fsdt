import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  View as RNView,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { postsService } from '../../src/api/postsService';
import { Post } from '../../src/types';
import { CommentList } from '@/components/CommentList';
import { CommentInput } from '@/components/CommentInput';
import { useAuth } from '@/src/contexts/AuthContext';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const { user } = useAuth();

  const isProfessor = false;

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // Only listening on iOS for manual padding, Android handles resizing natively (usually)
    // But since user says native resize isn't working on Android, we might need to enable it for Android too if we want manual control.
    // However, for now let's stick to iOS manual padding and re-evaluate Android.
    // Wait, the user specifically complained about Android issues (logs show Android).
    // If native wasn't working (Step 583), then 'adjustResize' is failing.
    // So we MUST use manual padding for Android too OR use 'behavior=padding' with correct offset.
    // Let's try manual padding for BOTH.
    
    const showSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', (e: any) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const data = await postsService.getPostById(Number(id), isProfessor);
        setPost(data);
        
        // Fetch comments
        const commentsData = await postsService.getComments(Number(id));
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Não foi possível carregar o post.');
      } finally {
        setLoading(false);
        setLoadingComments(false);
      }
    };

    fetchPost();
  }, [id, isProfessor]);

  const handleSendComment = async (content: string) => {
    if (!post || !user) return;
    try {
      const newComment = await postsService.createComment(post.id, content, user.id);
      setComments(prev => [...prev, newComment]);
    } catch (error) {
       console.error(error);
       alert('Erro ao enviar comentário');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await postsService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (error) {
       console.error(error);
       alert('Erro ao excluir comentário');
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      const updated = await postsService.updateComment(commentId, content);
      setComments(prev => prev.map(c => c.id === commentId ? updated : c));
    } catch (error) {
       console.error(error);
       throw error; // Let CommentList handle error display
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Text style={[styles.errorText, { color: colors.text }]}>
          {error || 'Post não encontrado'}
        </Text>
        <TouchableOpacity 
          style={[styles.backButtonError, { backgroundColor: Colors.primary }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonErrorText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <RNView style={[styles.container, { backgroundColor: colors.background, paddingBottom: keyboardHeight > 0 ? keyboardHeight + 80 : 0 }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {post.image_url && (
          <Image source={{ uri: post.image_url }} style={styles.coverImage} />
        )}

        {/* Header Section */}
        <RNView style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {post.title}
            </Text>
            
            {post.author_name && (
              <Text style={[styles.authorName, { color: colors.textSecondary }]}>
                Publicado por: {post.author_name}
              </Text>
            )}
        </RNView>

        {/* Nome da Matéria Field */}
        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            NOME DA MATÉRIA
          </Text>
          <RNView style={[styles.fieldInput, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.fieldValue, { color: colors.text }]}>
              {post.title.split(' - ')[0] || 'Geral'}
            </Text>
          </RNView>
        </RNView>

        {/* Descrição Field */}
        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            DESCRIÇÃO
          </Text>
          <RNView style={[styles.descriptionContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.descriptionText, { color: colors.text }]}>
              {post.content}
            </Text>
          </RNView>
        </RNView>

        {/* Save Button (for professors) */}
        {isProfessor && (
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: Colors.primary }]}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        )}
        
        {/* Comments Section */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <CommentList 
            comments={comments} 
            loading={loadingComments} 
            onDelete={handleDeleteComment}
            onUpdate={handleUpdateComment}
        />

      </ScrollView>

      {/* Comment Input (Fixed at bottom) */}
      <CommentInput onSend={handleSendComment} />
    </RNView>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  backButtonError: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonErrorText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#e1e1e1',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 24,
  },
  authorName: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  fieldInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  fieldValue: {
    fontSize: 17,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 120,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
});
