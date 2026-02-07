import React, { useState, useEffect } from 'react';
import { 
  View as RNView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  Keyboard, 
  TouchableWithoutFeedback,
  StatusBar,
  Image 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { uploadImage } from '../../src/services/supabase';
import { useAuth } from '../../src/contexts/AuthContext';
import { useTheme } from '../../src/contexts/ThemeContext';
import Colors from '../../constants/Colors';
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
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Carrega os dados do usuário logado ao montar o componente
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setLoadingUser(false);
    }
  }, [user]);

  // Função para salvar as alterações
  const handleAvatarUpdate = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setLoadingAvatar(true);
        const asset = result.assets[0];
        console.log('[EditProfile] Asset selected:', asset);
        
        const imageUri = await uploadImage(asset.uri, 'profile-images');
        
        if (!imageUri) {
            Alert.alert('Erro', 'Falha no upload da imagem');
            return;
        }

        // Update in backend
        await usersService.update(user!.id, {
          name: name || user!.name,
          email: email || user!.email,
          avatar_url: imageUri,
          role: user!.role
        });

        // Update context
        if (updateUser) {
            updateUser({ ...user!, avatar_url: imageUri });
        }
        
        Alert.alert('Sucesso', 'Foto de perfil atualizada!');
      }
    } catch (error) {
      console.log('Error updating avatar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a foto.');
    } finally {
      setLoadingAvatar(false);
    }
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    
    // Verifica se nada foi alterado
    const hasChanges = 
        name !== (user?.name || '') || 
        email !== (user?.email || '') ||
        phone !== (user?.phone || '') ||
        bio !== (user?.bio || '');

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
      console.log('[EditProfile] Sending update to service:', {
        id: user.id,
        name,
        email,
        phone,
        bio,
        role: user.role
      });

      // Atualiza nome, email, telefone e bio
      const updatedUser = await usersService.update(user.id, {
        name,
        email,
        phone,
        bio,
        role: user.role,
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
      <RNView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <ActivityIndicator size="large" color={colors.text} />
      </RNView>
    );
  }

  return (
    <RNView style={[styles.container, { backgroundColor: colors.background }]}>
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
            <TouchableOpacity 
                onPress={handleAvatarUpdate} 
                disabled={loadingAvatar}
                style={[styles.avatarContainer, { borderColor: colors.border }]}
            >
               {loadingAvatar ? (
                   <ActivityIndicator size="small" color={colors.text} />
               ) : user?.avatar_url ? (
                   <Image source={{ uri: user.avatar_url }} style={{ width: '100%', height: '100%' }} />
               ) : (
                   <FontAwesome name="user" size={40} color={colors.textSecondary} />
               )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAvatarUpdate} disabled={loadingAvatar}>
              <Text style={[styles.changePhotoText, { color: Colors.primary }]}>
                {loadingAvatar ? 'Enviando...' : 'Alterar foto'}
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
            <TextInput
              style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
              value={phone}
              onChangeText={setPhone}
              placeholder="(00) 00000-0000"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </RNView>

          <RNView style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>BIOGRAFIA</Text>
            <TextInput
              style={[styles.textInput, styles.bioInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card, textAlignVertical: 'top' }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Fale sobre você..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
            />
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
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden', // Ensures image stays within circle
    backgroundColor: '#f0f0f0', // Optional background
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
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
    gap: 24,
    marginTop: 40,
    marginBottom: 40, 
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
