import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  View as RNView,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '../../src/contexts/AuthContext';
import { postsService } from '../../src/api/postsService';
import { Post } from '../../src/types';

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Forçando tema claro conforme Figma
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  // const { user } = useAuth(); // TODO: Habilitar quando login for implementado
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Quando login for implementado, usar: user?.role === 'professor'
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome name="exclamation-circle" size={48} color={colors.notification} />
        <Text style={[styles.errorText, { color: colors.text }]}>
          {error || 'Post não encontrado'}
        </Text>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.tint }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Back Button - with safe area padding */}
      <RNView style={[
        styles.header, 
        { 
          borderBottomColor: colors.border,
          paddingTop: insets.top + 12,
        }
      ]}>
        <TouchableOpacity 
          style={[styles.backCircle, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={16} color={colors.text} />
        </TouchableOpacity>
        
        {isProfessor && (
          <TouchableOpacity style={styles.settingsButton}>
            <FontAwesome name="cog" size={20} color={colors.text} />
          </TouchableOpacity>
        )}
      </RNView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Text style={[styles.title, { color: colors.text }]}>
          {post.title}
        </Text>

        {/* Matéria Field (Figma shows NOME DA MATÉRIA) */}
        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            NOME DA MATÉRIA
          </Text>
          <RNView style={[styles.fieldInput, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Text style={[styles.fieldValue, { color: colors.text }]}>
              {post.title.split(' - ')[0] || 'Geral'}
            </Text>
          </RNView>
        </RNView>

        {/* Description Section */}
        <RNView style={styles.fieldContainer}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
            DESCRIÇÃO
          </Text>
          <RNView style={[styles.descriptionContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Text style={[styles.descriptionText, { color: colors.text }]}>
              {post.content}
            </Text>
          </RNView>
        </RNView>

        {/* Save Button (visible for professors) */}
        {isProfessor && (
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.tint }]}
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
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 11,
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
    fontSize: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 120,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
