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
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import api from '../../src/api/api';

interface Subject {
  id: number;
  name: string;
  description?: string;
}

// Mock data for now (will be replaced with API)
const mockSubjects: Subject[] = [
  { id: 1, name: 'Matemática I' },
  { id: 2, name: 'Matemática II' },
  { id: 3, name: 'Inglês I' },
  { id: 4, name: 'Inglês II' },
  { id: 5, name: 'Inglês III' },
  { id: 6, name: 'Inglês IV' },
];

export default function SubjectsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubjects = useCallback(async () => {
    try {
      // TODO: Replace with actual API call when endpoint is ready
      // const response = await api.get('/professor/subjects');
      // setSubjects(response.data);
      
      // Using mock data for now
      setTimeout(() => {
        setSubjects(mockSubjects);
        setLoading(false);
        setRefreshing(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSubjects();
  }, [fetchSubjects]);

  const handleEditSubject = (subjectId: number) => {
    router.push(`/subjects/form?id=${subjectId}`);
  };

  const handleDeleteSubject = async (subjectId: number) => {
    Alert.alert(
      'Atenção!',
      'Tem certeza de que deseja excluir esta matéria?',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Replace with actual API call
              // await api.delete(`/professor/subjects/${subjectId}`);
              setSubjects(prev => prev.filter(s => s.id !== subjectId));
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a matéria.');
            }
          }
        },
      ]
    );
  };

  const handleAddSubject = () => {
    router.push('/subjects/form');
  };

  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity 
      style={[styles.subjectItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => handleEditSubject(item.id)}
      activeOpacity={0.7}
    >
      <Text style={[styles.subjectName, { color: colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
      <RNView style={styles.subjectActions}>
        <TouchableOpacity 
          onPress={() => handleEditSubject(item.id)}
          style={styles.actionButton}
        >
          <FontAwesome name="pencil" size={18} color={colors.textSecondary} />
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
        <Text style={[styles.title, { color: colors.text }]}>Matérias</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Esta página é exclusivamente dedicada a gerenciar as matérias
        </Text>
      </RNView>

      {/* Subjects List */}
      <FlatList
        data={subjects}
        renderItem={renderSubjectItem}
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
              Nenhuma matéria encontrada
            </Text>
          </RNView>
        }
      />

      {/* Add Button */}
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: colors.text }]}
        onPress={handleAddSubject}
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
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 12,
  },
  subjectName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  subjectActions: {
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
});
