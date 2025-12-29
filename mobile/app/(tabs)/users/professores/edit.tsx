import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { updateUser } from '@/services/UserService';

export default function ProfessorEdit() {
  const params = useLocalSearchParams<any>();
  const [name, setName] = useState(params.name);
  const [email, setEmail] = useState(params.email);

  const save = async () => {
    await updateUser(params.id, { name, email });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput value={name} style={styles.input} onChangeText={setName} />
      <TextInput value={email} style={styles.input} onChangeText={setEmail} />
      <Button title="Atualizar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, padding: 12, marginBottom: 12 },
});
