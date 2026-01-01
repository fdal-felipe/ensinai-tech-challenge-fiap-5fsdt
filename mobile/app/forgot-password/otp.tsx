import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View as RNView, 
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../../src/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const PADDING = 24;
const GAP = 12;
// Calculate square size for 6 digits
const SQUARE_SIZE = (width - (PADDING * 2) - (GAP * 5)) / 6;

export default function OTPScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email: string }>();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste or quick typing
      const char = value.slice(-1);
      const newOtp = [...otp];
      newOtp[index] = char;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1]?.focus();
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    
    if (code.length !== 6) {
      Alert.alert('Erro', 'Por favor, insira o código de 6 dígitos.');
      return;
    }

    setLoading(true);
    
    // MOCK: Simulate API calls
    setTimeout(() => {
      setLoading(false);
      // Simulate validation (Just accept any code for mock)
      router.push({
        pathname: '/forgot-password/new-password',
        params: { email, otp: code }
      });
      // Or if you want to force error for testing:
      // setError(true);
    }, 1500);
  };

  const handleResend = async () => {
    Alert.alert('Código reenviado', 'Um novo código foi enviado para seu email (Simulado).');
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
            <Text style={[styles.title, { color: colors.text }]}>Código OTP</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Insira o código enviado para{'\n'}<Text style={{ fontWeight: 'bold' }}>{email || 'seu email'}</Text>
            </Text>
          </RNView>

          {/* Form Wrapper - Centered */}
          <RNView style={styles.formWrapper}>
            {/* OTP Inputs */}
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
                  selectTextOnFocus
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
              {loading ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Text style={[styles.verifyButtonText, { color: colors.background }]}>
                  Verificar
                </Text>
              )}
            </TouchableOpacity>

            {/* Resend Link */}
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
    paddingHorizontal: PADDING,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 24,
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
    height: 56,
    justifyContent: 'center',
  },
  verifyButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
