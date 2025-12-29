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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

// Mock subjects for editing
const mockSubjects: Record<number, { name: string; description: string }> = {
  1: { name: 'Matemática I', description: 'Curso de cálculo diferencial e integral.' },
  2: { name: 'Matemática II', description: 'Curso de álgebra linear.' },
  3: { name: 'Inglês I', description: 'Curso básico de inglês.' },
  4: { name: 'Inglês II', description: 'Curso intermediário de inglês.' },
  5: { name: 'Inglês III', description: 'Curso avançado de inglês.' },
  6: { name: 'Inglês IV', description: 'Curso de inglês para negócios.' },
};

export default function SubjectFormScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  
  const isEditing = !!id;
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSubject, setLoadingSubject] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      loadSubject(parseInt(id));
    }
  }, [id, isEditing]);

  const loadSubject = async (subjectId: number) => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/professor/subjects/${subjectId}`);
      // const subject = response.data;
      
      // Using mock data for now
      const subject = mockSubjects[subjectId];
      if (subject) {
        setName(subject.name);
        setDescription(subject.description);
        setOriginalName(subject.name);
        setOriginalDescription(subject.description);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a matéria.');
      router.back();
    } finally {
      setLoadingSubject(false);
    }
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome da matéria.');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, preencha a descrição.');
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        // TODO: Replace with actual API call
        // await api.put(`/professor/subjects/${id}`, { name, description });
        Alert.alert('Sucesso', 'Matéria atualizada com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        // TODO: Replace with actual API call
        // await api.post('/professor/subjects', { name, description });
        Alert.alert('Sucesso', 'Matéria criada com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || error.response?.data?.message || 'Erro ao salvar a matéria.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = isEditing 
      ? (name !== originalName || description !== originalDescription)
      : (name.trim() !== '' || description.trim() !== '');
    
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

  if (loadingSubject) {
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
              paddingBottom: insets.bottom + 40,
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {isEditing ? 'Editar Matéria' : 'Adicionar Matéria'}
            </Text>
          </RNView>

          {/* Form */}
          <RNView style={styles.form}>
            {/* Subject Name */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME DA MATÉRIA *</Text>
              <TextInput
                style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={name}
                onChangeText={setName}
                placeholder="Física III"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="sentences"
              />
            </RNView>

            {/* Description */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>DESCRIÇÃO *</Text>
              <TextInput
                style={[styles.textArea, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={description}
                onChangeText={setDescription}
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
    fontSize: 28,
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
    minHeight: 120,
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
});
