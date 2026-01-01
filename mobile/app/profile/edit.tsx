import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View as RNView, 
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';
import { usersService } from '../../src/api/usersService';

export default function EditProfileScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();
  
  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Carrega os dados do usuário logado ao montar o componente
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      // Telefone e bio não existem no banco, então deixamos vazio
      setPhone('');
      setBio('');
      setLoadingUser(false);
    }
  }, [user]);

  // Função para exibir modal de funcionalidade não disponível
  const showUnavailableModal = (feature: string) => {
    Alert.alert(
      'Funcionalidade Indisponível',
      `A função "${feature}" ainda não está disponível nesta versão do aplicativo.`,
      [{ text: 'Entendi', style: 'default' }]
    );
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    Keyboard.dismiss();
    
    // Verifica se nada foi alterado
    const hasChanges = name !== (user?.name || '') || email !== (user?.email || '');
    if (!hasChanges) {
      Alert.alert('Nada alterado', 'Você não fez nenhuma alteração nos dados.');
      return;
    }
    
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'O e-mail é obrigatório.');
      return;
    }

    if (!user?.id) {
      Alert.alert('Erro', 'Usuário não identificado. Por favor, faça login novamente.');
      return;
    }

    setLoading(true);

    try {
      // Atualiza apenas nome e email (campos editáveis nesta tela)
      const updatedUser = await usersService.update(user.id, {
        name,
        email,
      });

      // Atualiza o contexto local se a função existir
      if (updateUser && updatedUser) {
        updateUser(updatedUser);
      }

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Erro ao atualizar perfil.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  // Função para cancelar e voltar
  const handleCancel = () => {
    const hasChanges = name !== (user?.name || '') || email !== (user?.email || '');
    
    if (hasChanges) {
      Alert.alert(
        'Atenção!',
        'Tem certeza de que deseja descartar as alterações?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  if (loadingUser) {
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
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Título */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Editar Perfil</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Atualize suas informações pessoais</Text>
          </RNView>

          {/* Seção do Avatar */}
          <RNView style={styles.avatarSection}>
            <RNView style={[styles.avatarContainer, { borderColor: colors.border }]}>
              <FontAwesome name="user" size={40} color={colors.textSecondary} />
            </RNView>
            <TouchableOpacity onPress={() => showUnavailableModal('Alterar foto')}>
              <Text style={[styles.changePhotoText, { color: Colors.primary }]}>
                Alterar foto
              </Text>
            </TouchableOpacity>
          </RNView>

          {/* Campos do Formulário */}
          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME COMPLETO *</Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor={colors.textSecondary}
            />
          </RNView>

          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>E-MAIL *</Text>
            <TextInput
              style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </RNView>

          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>TELEFONE</Text>
            <TouchableOpacity 
              style={[styles.textInput, styles.disabledInput, { borderColor: colors.border, backgroundColor: colors.card }]}
              onPress={() => showUnavailableModal('Telefone')}
            >
              <Text style={{ color: colors.textSecondary }}>(00) 00000-0000</Text>
            </TouchableOpacity>
          </RNView>

          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>BIOGRAFIA</Text>
            <TouchableOpacity 
              style={[styles.textInput, styles.bioInput, styles.disabledInput, { borderColor: colors.border, backgroundColor: colors.card }]}
              onPress={() => showUnavailableModal('Biografia')}
            >
              <Text style={{ color: colors.textSecondary }}>Fale sobre você...</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changePhotoText: {
    fontSize: 15,
    fontWeight: '500',
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
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 17,
  },
  disabledInput: {
    opacity: 0.6,
  },
  bioInput: {
    minHeight: 100,
    paddingTop: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
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
