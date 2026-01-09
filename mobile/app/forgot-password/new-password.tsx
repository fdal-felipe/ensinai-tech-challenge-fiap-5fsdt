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
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

export default function NewPasswordScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { email, otp } = useLocalSearchParams<{ email: string, otp: string }>();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    Keyboard.dismiss();

    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    
    // MOCK: Simulate API calls
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso! (Simulado)');
      router.push('/forgot-password/success');
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
          {/* Title - Centered */}
          <RNView style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Criar nova Senha</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sua nova senha deve ser diferente da última usada.
            </Text>
          </RNView>

          {/* Form Wrapper - Centered */}
          <RNView style={styles.formWrapper}>
            <RNView style={styles.form}>
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

              {/* Confirm Password */}
              <RNView style={styles.fieldContainer}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>CONFIRMAR SENHA</Text>
                <RNView style={[styles.passwordContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                  <TextInput
                    style={[styles.passwordInput, { color: colors.text }]}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••••"
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <FontAwesome 
                      name={showConfirmPassword ? 'eye' : 'eye-slash'} 
                      size={18} 
                      color={colors.textSecondary} 
                    />
                  </TouchableOpacity>
                </RNView>
              </RNView>

              {/* Change Password Button */}
              <TouchableOpacity 
                style={[styles.changeButton, { backgroundColor: colors.text }]}
                onPress={handleChangePassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.background} />
                ) : (
                  <Text style={[styles.changeButtonText, { color: colors.background }]}>
                    Mudar senha
                  </Text>
                )}
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
    fontSize: 32,
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
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
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
  changeButton: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 32,
    height: 56,
    justifyContent: 'center',
  },
  changeButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
