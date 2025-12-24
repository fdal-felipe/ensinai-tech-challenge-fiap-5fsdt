export type UserRole = 'professor' | 'aluno';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name?: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}
