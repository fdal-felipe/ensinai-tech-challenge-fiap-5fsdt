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
  ActivityIndicator,
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

  const handleSendCode = async () => {
    Keyboard.dismiss();
    
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    setLoading(true);
    
    // MOCK: Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Simulate success
      Alert.alert('Sucesso', 'Código enviado para seu email! (Simulado: 123456)');
      router.push({
        pathname: '/forgot-password/otp',
        params: { email }
      });
    }, 1500);
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
          {/* Title - Centered & Single Line */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Esqueceu a sua senha?
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Não se preocupe! Por favor insira seu email abaixo para enviarmos um código de recuperação!
            </Text>
          </RNView>

          {/* Form Wrapper - Centered */}
          <RNView style={styles.formWrapper}>
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
                {loading ? (
                  <ActivityIndicator color={colors.background} />
                ) : (
                  <Text style={[styles.sendButtonText, { color: colors.background }]}>
                    Enviar
                  </Text>
                )}
              </TouchableOpacity>
            </RNView>

            {/* Back to Login Link */}
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
    fontSize: 28, // Small enough to fit in one line
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
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
    marginBottom: 24,
    height: 56,
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
