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
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';
import { useAuth } from '../src/contexts/AuthContext';
import api from '@/src/api/api';

const REMEMBER_EMAIL_KEY = 'rememberedEmail';
const REMEMBER_PASSWORD_KEY = 'rememberedPassword';
const REMEMBER_ME_KEY = 'rememberMe';

export default function LoginScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedRememberMe = await SecureStore.getItemAsync(REMEMBER_ME_KEY);
      if (savedRememberMe === 'true') {
        const savedEmail = await SecureStore.getItemAsync(REMEMBER_EMAIL_KEY);
        const savedPassword = await SecureStore.getItemAsync(REMEMBER_PASSWORD_KEY);
        
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Error loading saved credentials:', error);
    }
  };

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await SecureStore.setItemAsync(REMEMBER_EMAIL_KEY, email);
        await SecureStore.setItemAsync(REMEMBER_PASSWORD_KEY, password);
        await SecureStore.setItemAsync(REMEMBER_ME_KEY, 'true');
      } else {
        await SecureStore.deleteItemAsync(REMEMBER_EMAIL_KEY);
        await SecureStore.deleteItemAsync(REMEMBER_PASSWORD_KEY);
        await SecureStore.deleteItemAsync(REMEMBER_ME_KEY);
      }
    } catch (error) {
      console.log('Error saving credentials:', error);
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      console.log('Tentando logar com:', email);

      const response = await api.post('/auth/login', { 
        email, 
        password 
      });

      console.log('RESPOSTA DO BACKEND:', JSON.stringify(response.data, null, 2));

      const { token, user: userData } = response.data;

      if (!token || typeof token !== 'string') {
        Alert.alert('Erro Técnico', 'O servidor não retornou um token válido.');
        return;
      }

      // Usa os dados do usuário retornados pelo backend
      const user = {
        id: userData?.id || 0,
        name: userData?.name || email.split('@')[0],
        email: userData?.email || email,
        role: userData?.role || 'aluno',
        avatar_url: userData?.avatar_url || undefined,
        phone: userData?.phone || undefined,
        bio: userData?.bio || undefined,
      };

      // Salva credenciais se "Lembrar-me" estiver marcado
      await saveCredentials();

      await signIn(user, token);
      router.replace('/(tabs)');

    } catch (error: any) {
      console.log('ERRO COMPLETO:', error);
      const msg = error.response?.data?.message || 'Email ou senha incorretos.';
      Alert.alert('Falha no Login', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
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
          bounces={false}
        >
          {/* Title */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Entrar</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Entre para continuar
            </Text>
          </RNView>

          {/* Form Wrapper - Centered */}
          <RNView style={styles.formWrapper}>
            {/* Form */}
            <RNView style={styles.form}>
              {/* Email */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>EMAIL</Text>
                <TextInput
                  style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="john@gmail.com"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </RNView>

              {/* Password */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>SENHA</Text>
                <RNView style={[styles.passwordContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                  <TextInput
                    style={[styles.passwordInput, { color: colors.text }]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••••"
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

              {/* Remember Me & Forgot Password Row */}
              <RNView style={styles.optionsRow}>
                {/* Remember Me */}
                <TouchableOpacity 
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <RNView style={[
                    styles.checkbox,
                    { borderColor: colors.border, backgroundColor: colors.card },
                    rememberMe && { backgroundColor: colors.text, borderColor: colors.text }
                  ]}>
                    {rememberMe && (
                      <FontAwesome name="check" size={12} color={colors.background} />
                    )}
                  </RNView>
                  <Text style={[styles.rememberMeText, { color: colors.textSecondary }]}>
                    Lembrar senha
                  </Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity 
                  onPress={() => router.push('/forgot-password')}
                >
                  <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
              </RNView>

              {/* Login Button */}
              <TouchableOpacity 
                style={[styles.loginButton, { backgroundColor: colors.text }]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={[styles.loginButtonText, { color: colors.background }]}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Text>
              </TouchableOpacity>
            </RNView>

            {/* Register Link */}
            <RNView style={styles.registerContainer}>
              <Text style={[styles.registerText, { color: colors.textSecondary }]}>
                Não tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.replace('/register')}>
                <Text style={[styles.registerLink, { color: colors.text }]}>
                  Cadastre agora
                </Text>
              </TouchableOpacity>
            </RNView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  registerText: {
    fontSize: 15,
  },
  registerLink: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
