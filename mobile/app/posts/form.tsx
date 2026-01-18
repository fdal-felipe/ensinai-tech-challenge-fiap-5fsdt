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
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
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
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);
  const [generating, setGenerating] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (result.assets[0].base64) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      } else {
        setImage(result.assets[0].uri);
      }
    }
  };

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const post = await postsService.professor.getById(parseInt(id as string));
      if (!post) return;
      
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
      if (post.image_url) {
        setImage(post.image_url);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o post.');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleAiGenerate = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Preencha o título para gerar sugestões.');
      return;
    }
    
    setGenerating(true);
    try {
      const suggestion = await postsService.generateContent(title);
      setContent(suggestion);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar conteúdo.');
    } finally {
      setGenerating(false);
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
      const postData = {
        title,
        content,
        image_url: image, // Send base64 or url
        status
      };

      if (isEditing && id) {
        // Update requires: title, content, status
        await postsService.professor.update(parseInt(id), postData);
        Alert.alert('Sucesso', 'Post atualizado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        // Create requires: title, content, author_id
        // Use user.id from context, or fallback to 1 (first professor in local DB)
        const authorId = user?.id && user.id > 0 ? user.id : 1;
        await postsService.professor.create({ ...postData, author_id: authorId });
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

  // Função para excluir o post com confirmação
  const handleDelete = async () => {
    Alert.alert(
      'Tem certeza?',
      'Esta ação não pode ser desfeita e excluirá permanentemente este post.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sim, Excluir', 
          style: 'destructive',
          onPress: async () => {
            if (!id) return;
            setLoading(true);
            try {
              await postsService.professor.delete(parseInt(id));
              Alert.alert('Sucesso', 'Post excluído com sucesso!', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o post.');
            } finally {
              setLoading(false);
            }
          }
        },
      ]
    );
  };

  const handleCancel = () => {
    // Verifica se há alterações não salvas
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
              paddingTop: insets.top + 60,
              paddingBottom: insets.bottom + 120,
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {isEditing ? 'Editar Post' : 'Novo Post'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {isEditing ? 'Atualize o conteúdo abaixo' : 'Escreva um novo post para os alunos'}
            </Text>
          </RNView>

          {/* Form */}
          <RNView style={styles.form}>
            {/* Post Title */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>TÍTULO DO POST *</Text>
              <TextInput
                style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Como funciona o sistema solar"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="sentences"
              />
            </RNView>

            {/* Image Selection */}
            <RNView style={styles.imageSection}>
               <TouchableOpacity onPress={pickImage} style={[styles.imageContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                  ) : (
                    <RNView style={styles.imagePlaceholder}>
                      <FontAwesome name="image" size={40} color={colors.textSecondary} />
                      <Text style={[styles.imagePlaceholderText, { color: colors.textSecondary }]}>
                        Selecionar Imagem de Capa
                      </Text>
                    </RNView>
                  )}
               </TouchableOpacity>
               {image && (
                 <TouchableOpacity onPress={() => setImage(null)} style={styles.removeImageButton}>
                    <Text style={{ color: Colors.error, fontSize: 14 }}>Remover imagem</Text>
                 </TouchableOpacity>
               )}
            </RNView>

            {/* Post Content */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>DESCRIÇÃO *</Text>
              <TextInput
                style={[styles.textArea, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={content}
                onChangeText={setContent}
                placeholder="Descreva o conteúdo do post..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </RNView>

            {/* AI Generate Button (Now below content) */}
            <TouchableOpacity 
              style={[styles.aiButton, { backgroundColor: Colors.primary }]}
              onPress={handleAiGenerate}
              disabled={generating}
            >
              {generating ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <FontAwesome name="magic" size={16} color="#FFF" style={{ marginRight: 8 }} />
                  <Text style={styles.aiButtonText}>Gerar conteúdo com IA</Text>
                </>
              )}
            </TouchableOpacity>
          </RNView>

          {/* Botões de Ação */}
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

          {/* Botão de Excluir (Somente ao editar) */}
          {isEditing && (
            <TouchableOpacity 
              style={[styles.deleteButton]}
              onPress={handleDelete}
              disabled={loading}
            >
              <FontAwesome name="trash" size={16} color={Colors.error} />
              <Text style={[styles.deleteButtonText, { color: Colors.error }]}>
                Excluir Post
              </Text>
            </TouchableOpacity>
          )}
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
    marginBottom: 40,
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
    textAlign: 'center',
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
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    paddingVertical: 12,
  },
  deleteButtonText: {
    fontSize: 15,
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
  imageSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  removeImageButton: {
    marginTop: 12,
    padding: 8,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  aiButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
