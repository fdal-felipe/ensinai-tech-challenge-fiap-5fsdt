import React, { useState, useRef } from 'react';
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
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const PADDING = 20;
const GAP = 16;
// Calculate square size: (screen width - padding on both sides - 3 gaps) / 4
const SQUARE_SIZE = (width - (PADDING * 2) - (GAP * 3)) / 4;

export default function OTPScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    
    if (code.length !== 4) {
      Alert.alert('Erro', 'Por favor, insira o código completo.');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      router.push('/forgot-password/new-password');
    }, 1000);
  };

  const handleResend = () => {
    Alert.alert('Código reenviado', 'Um novo código foi enviado para seu email.');
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
            <Text style={[styles.title, { color: colors.text }]}>Código OTP</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Insira o código OTP enviado no seu email para recuperar a sua conta.
            </Text>
          </RNView>

          {/* OTP Inputs - Perfect squares */}
          <RNView style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput, 
                  { 
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                    borderColor: error ? Colors.error : colors.border, 
                    color: colors.text,
                    backgroundColor: colors.card,
                  }
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </RNView>

          {/* Error Message */}
          {error && (
            <Text style={[styles.errorText, { color: Colors.error }]}>
              código errado, tente novamente por favor
            </Text>
          )}

          {/* Verify Button */}
          <TouchableOpacity 
            style={[styles.verifyButton, { backgroundColor: colors.text }]}
            onPress={handleVerify}
            disabled={loading}
          >
            <Text style={[styles.verifyButtonText, { color: colors.background }]}>
              {loading ? 'Verificando...' : 'Verificar'}
            </Text>
          </TouchableOpacity>

          {/* Resend */}
          <RNView style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.textSecondary }]}>
              Não recebeu o código?{' '}
            </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.resendLink, { color: colors.text }]}>
                Reenviar
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
    paddingHorizontal: PADDING,
  },
  titleContainer: {
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 32,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 24,
  },
  verifyButton: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 80,
  },
  resendText: {
    fontSize: 15,
  },
  resendLink: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
