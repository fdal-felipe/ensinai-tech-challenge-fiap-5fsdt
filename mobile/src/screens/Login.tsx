import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await signIn({ email, password });
      Alert.alert('Sucesso', 'Login realizado!');
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação. Verifique suas credenciais.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ensinai - Login</Text>
      <TextInput 
        placeholder="E-mail" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});