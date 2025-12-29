import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { getUsers, deleteUser } from '@/services/UserService';

export default function AlunosScreen() {
    const [alunos, setAlunos] = useState<any[]>([]);

    const load = async () => {
        const res = await getUsers('aluno');
        setAlunos(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                title="Novo Aluno"
                onPress={() => router.push('/users/alunos/create')}
            />

            <FlatList
                data={alunos}
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
                                    pathname: '/users/alunos/edit',
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
