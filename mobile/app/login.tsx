import React, { useState } from 'react';
import { 
  StyleSheet, 
  View as RNView, 
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';
import { useAuth } from '../src/contexts/AuthContext';

export default function LoginScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Hardcoded login: admin/admin
    if (email.toLowerCase() === 'admin' && password === 'admin') {
      try {
        await SecureStore.setItemAsync('userToken', 'mock-token-12345');
        signIn({
          id: 1,
          name: 'Administrador',
          email: 'admin@ensinai.com',
          role: 'professor',
        }, 'mock-token-12345');
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Erro', 'Erro ao fazer login.');
      }
    } else {
      Alert.alert('Erro', 'Credenciais inválidas.\n\nUse: admin / admin');
    }

    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title - Centered */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Entrar</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Entre para continuar
            </Text>
          </RNView>

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

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => router.push('/forgot-password')}
            >
              <Text style={[styles.forgotPasswordText, { color: colors.textSecondary }]}>
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
  },
  form: {
    flex: 1,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
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
    marginTop: 'auto',
    paddingBottom: 80,
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
