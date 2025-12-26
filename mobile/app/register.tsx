import React, { useState } from 'react';
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

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';

export default function RegisterScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    Keyboard.dismiss();
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Mockup - just show success and redirect to login
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Sucesso!', 
        'Conta criada com sucesso. Faça login para continuar.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    }, 1000);
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
          {/* Title - Centered */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Cadastro</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Crie a sua conta
            </Text>
          </RNView>

          {/* Form */}
          <RNView style={styles.form}>
            {/* Name */}
            <RNView style={styles.fieldContainer}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>NOME COMPLETO</Text>
              <TextInput
                style={[styles.textInput, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="words"
              />
            </RNView>

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

            {/* Register Button */}
            <TouchableOpacity 
              style={[styles.registerButton, { backgroundColor: colors.text }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={[styles.registerButtonText, { color: colors.background }]}>
                {loading ? 'Criando...' : 'Criar'}
              </Text>
            </TouchableOpacity>
          </RNView>

          {/* Login Link */}
          <RNView style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Já tem uma conta?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={[styles.loginLink, { color: colors.text }]}>
                Faça login
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
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
  registerButton: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loginText: {
    fontSize: 15,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
