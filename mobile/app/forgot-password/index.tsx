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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function ForgotPasswordScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    setLoading(true);
    // Simulate sending code
    setTimeout(() => {
      setLoading(false);
      router.push('/forgot-password/otp');
    }, 1000);
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
          {/* Title */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Esqueceu a sua{'\n'}senha?
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Não se preocupe! Por favor insira seu email abaixo para enviarmos um código de recuperação!
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

            {/* Send Button */}
            <TouchableOpacity 
              style={[styles.sendButton, { backgroundColor: colors.text }]}
              onPress={handleSendCode}
              disabled={loading}
            >
              <Text style={[styles.sendButtonText, { color: colors.background }]}>
                {loading ? 'Enviando...' : 'Enviar'}
              </Text>
            </TouchableOpacity>
          </RNView>

          {/* Back to Login */}
          <RNView style={styles.backContainer}>
            <Text style={[styles.backText, { color: colors.textSecondary }]}>
              Lembrou da sua Senha?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={[styles.backLink, { color: colors.text }]}>
                Entrar
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
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 32,
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
  sendButton: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 40,
  },
  backText: {
    fontSize: 15,
  },
  backLink: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
