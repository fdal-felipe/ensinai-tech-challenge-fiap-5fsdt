import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  View as RNView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { postsService } from '../../src/api/postsService';
import { Post } from '../../src/types';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isProfessor = false;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const data = await postsService.getPostById(Number(id), isProfessor);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Não foi possível carregar o post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isProfessor]);

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          {post.title}
        </Text>

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
      </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
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
});
