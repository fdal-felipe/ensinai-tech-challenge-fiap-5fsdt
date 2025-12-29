import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { getUsers, deleteUser } from '@/services/UserService';

export default function ProfessoresScreen() {
  const [professores, setProfessores] = useState<any[]>([]);

  const load = async () => {
    const res = await getUsers('professor');
    setProfessores(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Novo Professor"
        onPress={() => router.push('/users/professores/create')}
      />

      <FlatList
        data={professores}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={load}
        refreshing={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>

            <Button
              title="Editar"
              onPress={() =>
                router.push({
                  pathname: '/users/professores/edit',
                  params: { id: item.id, name: item.name, email: item.email },
                })
              }
            />

            <Button
              title="Excluir"
              color="red"
              onPress={() => deleteUser(item.id).then(load)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 12, borderWidth: 1, marginBottom: 8 },
});
