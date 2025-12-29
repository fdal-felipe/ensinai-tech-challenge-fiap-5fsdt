import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View as RNView, 
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';
import { postsService } from '../../src/api/postsService';

export default function PostFormScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user } = useAuth();
  
  const isEditing = !!id;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [status, setStatus] = useState('ativo');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      loadPost(parseInt(id));
    }
  }, [id, isEditing]);

  const loadPost = async (postId: number) => {
    try {
      const post = await postsService.professor.getById(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setOriginalTitle(post.title);
        setOriginalContent(post.content);
        setStatus(post.status || 'ativo');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o post.');
      router.back();
    } finally {
      setLoadingPost(false);
    }
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o título.');
      return;
    }
    
    if (!content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha a descrição.');
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        // Update requires: title, content, status
        await postsService.professor.update(parseInt(id), { title, content, status });
        Alert.alert('Sucesso', 'Post atualizado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        // Create requires: title, content, author_id
        // Use user.id from context, or fallback to 16 (professor from DB) if id is 0
        const authorId = user?.id && user.id > 0 ? user.id : 16;
        await postsService.professor.create({ title, content, author_id: authorId });
        Alert.alert('Sucesso', 'Post criado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error: any) {
      console.log('Save error:', error.response?.data);
      const msg = error.response?.data?.error || error.response?.data?.message || 'Erro ao salvar o post.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Check if there are unsaved changes
    const hasChanges = isEditing 
      ? (title !== originalTitle || content !== originalContent)
      : (title.trim() !== '' || content.trim() !== '');
    
    if (hasChanges) {
      Alert.alert(
        'Atenção!',
        'Tem certeza de que deseja cancelar?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  if (loadingPost) {
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
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent, 
            { 
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 120,
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {isEditing ? 'Editar Post' : 'Adicionar Matéria'}
            </Text>
          </RNView>

          {/* Form */}
          <RNView style={styles.form}>
            {/* Post Title */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME DA MATÉRIA *</Text>
              <TextInput
                style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={title}
                onChangeText={setTitle}
                placeholder="Física III"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="sentences"
              />
            </RNView>

            {/* Post Content */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>DESCRIÇÃO *</Text>
              <TextInput
                style={[styles.textArea, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={content}
                onChangeText={setContent}
                placeholder="Este curso é destinado ao estudo do eletromagnetismo..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </RNView>
          </RNView>

          {/* Action Buttons */}
          <RNView style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.cancelButton, { borderColor: Colors.error }]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: Colors.error }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: Colors.primary }]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Text>
            </TouchableOpacity>
          </RNView>
        </ScrollView>
      </TouchableWithoutFeedback>

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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 2,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
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
