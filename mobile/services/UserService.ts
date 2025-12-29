import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP:3000', // 🔴 ajuste depois
});

// =======================
// TIPOS
// =======================
export type UserRole = 'aluno' | 'professor';

export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
}

// =======================
// LISTAR USUÁRIOS
// =======================
export const getUsers = (role?: UserRole) => {
  return api.get('/users', {
    params: role ? { role } : {},
  });
};

// =======================
// CRIAR USUÁRIO
// =======================
export const createUser = (data: UserDTO) => {
  return api.post('/users', data);
};

// =======================
// ATUALIZAR USUÁRIO
// =======================
export const updateUser = (id: number, data: Partial<UserDTO>) => {
  return api.put(`/users/${id}`, data);
};

// =======================
// DELETAR USUÁRIO
// =======================
export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};
