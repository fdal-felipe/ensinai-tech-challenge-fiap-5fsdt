import { Stack } from 'expo-router';

export default function UsersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Usuários' }}
      />

      {/* ALUNOS */}
      <Stack.Screen
        name="alunos/index"
        options={{ title: 'Alunos' }}
      />
      <Stack.Screen
        name="alunos/create"
        options={{ title: 'Novo Aluno' }}
      />
      <Stack.Screen
        name="alunos/edit"
        options={{ title: 'Editar Aluno' }}
      />

      {/* PROFESSORES */}
      <Stack.Screen
        name="professores/index"
        options={{ title: 'Professores' }}
      />
      <Stack.Screen
        name="professores/create"
        options={{ title: 'Novo Professor' }}
      />
      <Stack.Screen
        name="professores/edit"
        options={{ title: 'Editar Professor' }}
      />
    </Stack>
  );
}
