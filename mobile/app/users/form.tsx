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
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';
import { usersService } from '../../src/api/usersService';
import { UserRole } from '../../src/types';

export default function UserFormScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { user: loggedInUser, updateUser } = useAuth();
  
  const isEditing = !!id;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('aluno');
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      loadUser(parseInt(id));
    }
  }, [id, isEditing]);

  const loadUser = async (userId: number) => {
    try {
      const user = await usersService.getById(userId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o usuário.');
      router.back();
    } finally {
      setLoadingUser(false);
    }
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e Email são obrigatórios.');
      return;
    }

    if (!isEditing && !password.trim()) {
      Alert.alert('Erro', 'Senha é obrigatória para novos usuários.');
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        // Prepare update data
        const updateData: any = { 
          name, 
          email, 
          role
        };

        // Only include password if user typed something
        if (password.trim()) {
          updateData.password = password;
        }

        console.log('Updating user:', id, updateData);
        const updatedUser = await usersService.update(parseInt(id), updateData);
        
        // Se o usuário editado é o usuário logado, atualiza o contexto
        if (loggedInUser && updatedUser && loggedInUser.id === parseInt(id)) {
          updateUser({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
          });
        }
        
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        await usersService.create({ 
          name, 
          email, 
          password_hash: password, 
          role 
        });
        Alert.alert('Sucesso', 'Usuário criado com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error: any) {
      console.log('Save error:', error.response?.data);
      const msg = error.response?.data?.error || error.response?.data?.message || 'Erro ao salvar usuário.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Tem certeza?',
      'Esta ação não pode ser desfeita e excluirá permanentemente este usuário.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sim, Excluir', 
          style: 'destructive',
          onPress: async () => {
            if (!id) return;
            setLoading(true);
            try {
              await usersService.delete(parseInt(id));
              Alert.alert('Sucesso', 'Usuário excluído com sucesso!', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o usuário.');
            } finally {
              setLoading(false);
            }
          }
        },
      ]
    );
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
      <Stack.Screen options={{ headerShown: false }} />
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent, 
            { 
              paddingTop: insets.top + 60,
              paddingBottom: insets.bottom + 20,
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title - Centered similar to Login */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {isEditing ? 'Atualize os dados abaixo' : 'Preencha os dados do novo usuário'}
            </Text>
          </RNView>

          {/* Form Wrapper - Centered */}
          <RNView style={styles.formWrapper}>
            <RNView style={styles.form}>
              
              {/* Role Selector */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>TIPO DE USUÁRIO</Text>
                <RNView style={[styles.roleSelector, { borderColor: colors.border }]}>
                  <TouchableOpacity 
                    style={[
                      styles.roleOption, 
                      role === 'aluno' && { backgroundColor: colors.text }
                    ]}
                    onPress={() => setRole('aluno')}
                  >
                    <Text style={[
                      styles.roleText, 
                      { color: role === 'aluno' ? colors.background : colors.text }
                    ]}>
                      Aluno
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.roleOption, 
                      role === 'professor' && { backgroundColor: colors.text }
                    ]}
                    onPress={() => setRole('professor')}
                  >
                    <Text style={[
                      styles.roleText, 
                      { color: role === 'professor' ? colors.background : colors.text }
                    ]}>
                      Professor
                    </Text>
                  </TouchableOpacity>
                </RNView>
              </RNView>

              {/* Name */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME COMPLETO *</Text>
                <TextInput
                  style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Ex: João da Silva"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="words"
                />
              </RNView>

              {/* Email */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>EMAIL *</Text>
                <TextInput
                  style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Ex: joao@email.com"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </RNView>

              {/* Password */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                  {isEditing ? 'NOVA SENHA (opcional)' : 'SENHA *'}
                </Text>
                <RNView style={[styles.passwordContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                  <TextInput
                    style={[styles.passwordInput, { color: colors.text }]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={isEditing ? "Deixe em branco para manter" : "Crie uma senha"}
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <FontAwesome 
                      name={showPassword ? 'eye' : 'eye-slash'} 
                      size={18} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </RNView>
              </RNView>

            </RNView>

            {/* Action Buttons */}
            <RNView style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.cancelButton, { borderColor: Colors.error }]}
                onPress={() => router.back()}
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

            {/* Delete Button (Only when editing) */}
            {isEditing && (
              <TouchableOpacity 
                style={[styles.deleteButton]}
                onPress={handleDelete}
                disabled={loading}
              >
                <FontAwesome name="trash" size={16} color={Colors.error} />
                <Text style={[styles.deleteButtonText, { color: Colors.error }]}>
                  Excluir Usuário
                </Text>
              </TouchableOpacity>
            )}

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
    paddingHorizontal: 24,
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
  formWrapper: {
    flex: 1,
  },
  form: {
    width: '100%',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  roleSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  roleOption: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleText: {
    fontSize: 16,
    fontWeight: '600',
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
});
