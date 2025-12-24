import api from './api';
import { Post } from '../types';

export const postsService = {
    // Endpoints para Alunos (somente ativos)
    aluno: {
        getAll: async (): Promise<Post[]> => {
            const response = await api.get('/aluno/posts');
            return response.data;
        },
        getById: async (id: number): Promise<Post> => {
            const response = await api.get(`/aluno/posts/${id}`);
            return response.data;
        },
        search: async (query: string): Promise<Post[]> => {
            const response = await api.get('/aluno/posts/search', { params: { q: query } });
            return response.data;
        },
    },

    // Endpoints para Professores (todos os posts)
    professor: {
        getAll: async (): Promise<Post[]> => {
            const response = await api.get('/professor/posts');
            return response.data;
        },
        getById: async (id: number): Promise<Post> => {
            const response = await api.get(`/professor/posts/${id}`);
            return response.data;
        },
        search: async (query: string): Promise<Post[]> => {
            const response = await api.get('/professor/posts/search', { params: { q: query } });
            return response.data;
        },
    },

    // Helper functions for easier usage
    getPosts: async (isProfessor: boolean): Promise<Post[]> => {
        if (isProfessor) {
            return postsService.professor.getAll();
        }
        return postsService.aluno.getAll();
    },

    getPostById: async (id: number, isProfessor: boolean): Promise<Post> => {
        if (isProfessor) {
            return postsService.professor.getById(id);
        }
        return postsService.aluno.getById(id);
    },

    searchPosts: async (query: string, isProfessor: boolean): Promise<Post[]> => {
        if (isProfessor) {
            return postsService.professor.search(query);
        }
        return postsService.aluno.search(query);
    },
};
