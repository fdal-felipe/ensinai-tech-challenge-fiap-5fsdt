import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { createUser } from '@/services/UserService';
import { Text } from '@/components/Themed'; // Se quiser usar o texto com tema

export default function ProfessorCreate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const save = async () => {
    // Validação básica
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      console.log('Enviando dados:', { name, email, role: 'professor' });
      
      const response = await createUser({ name, email, role: 'professor' });
      
      // Se chegou aqui, deu certo
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      
      // O router.back() volta para a lista e o useEffect do index.tsx deve recarregar
      router.back(); 
    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário. Verifique a conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Professor</Text>
      <TextInput 
        placeholder="Digite o nome..." 
        style={styles.input} 
        onChangeText={setName}
        value={name}
      />
      
      <Text style={styles.label}>E-mail</Text>
      <TextInput 
        placeholder="email@exemplo.com" 
        style={styles.input} 
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Salvar Professor" onPress={save} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 20, 
    borderRadius: 8 
  },
});