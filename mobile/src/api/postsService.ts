import api from './api';
import { Post } from '../types';

export const postsService = {
    // Endpoints para Alunos (somente ativos)
    aluno: {
        getAll: async (): Promise<Post[]> => {
            try {
                const response = await api.get('/aluno/posts');
                return response.data;
            } catch (error) {
                console.log('Error fetching aluno posts:', error);
                return [];
            }
        },
        getById: async (id: number): Promise<Post | null> => {
            try {
                const response = await api.get(`/aluno/posts/${id}`);
                return response.data;
            } catch (error) {
                console.log('Error fetching aluno post by id:', error);
                return null;
            }
        },
        search: async (query: string): Promise<Post[]> => {
            try {
                if (!query.trim()) return [];
                const response = await api.get('/aluno/posts/search', { params: { q: query } });
                return response.data;
            } catch (error) {
                console.log('Error searching aluno posts:', error);
                return [];
            }
        },
    },

    // Endpoints para Professores (todos os posts)
    professor: {
        getAll: async (): Promise<Post[]> => {
            try {
                console.log('postsService: calling GET /professor/posts');
                const response = await api.get('/professor/posts');
                console.log('postsService: response received', response.status);
                return response.data;
            } catch (error) {
                console.log('Error fetching professor posts:', error);
                return [];
            }
        },
        getById: async (id: number): Promise<Post | null> => {
            try {
                const response = await api.get(`/professor/posts/${id}`);
                return response.data;
            } catch (error) {
                console.log('Error fetching professor post by id:', error);
                return null;
            }
        },
        search: async (query: string): Promise<Post[]> => {
            try {
                if (!query.trim()) return [];
                const response = await api.get('/professor/posts/search', { params: { q: query } });
                return response.data;
            } catch (error) {
                console.log('Error searching professor posts:', error);
                return [];
            }
        },
        create: async (data: { title: string; content: string; author_id: number }): Promise<Post | null> => {
            try {
                const response = await api.post('/professor/posts', data);
                return response.data;
            } catch (error) {
                console.log('Error creating post:', error);
                throw error;
            }
        },
        update: async (id: number, data: { title: string; content: string; status: string }): Promise<Post | null> => {
            try {
                const response = await api.put(`/professor/posts/${id}`, data);
                return response.data;
            } catch (error) {
                console.log('Error updating post:', error);
                throw error;
            }
        },
        delete: async (id: number): Promise<void> => {
            try {
                await api.delete(`/professor/posts/${id}`);
            } catch (error) {
                console.log('Error deleting post:', error);
                throw error;
            }
        },
    },

    // Helper functions for easier usage
    getPosts: async (isProfessor: boolean): Promise<Post[]> => {
        if (isProfessor) {
            return postsService.professor.getAll();
        }
        return postsService.aluno.getAll();
    },

    getPostById: async (id: number, isProfessor: boolean): Promise<Post | null> => {
        if (isProfessor) {
            return postsService.professor.getById(id);
        }
        return postsService.aluno.getById(id);
    },

    searchPosts: async (query: string, isProfessor: boolean): Promise<Post[]> => {
        if (!query.trim()) return [];
        if (isProfessor) {
            return postsService.professor.search(query);
        }
        return postsService.aluno.search(query);
    },

    getComments: async (postId: number): Promise<any[]> => {
        try {
            const response = await api.get(`/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.log('Error fetching comments:', error);
            return [];
        }
    },

    createComment: async (postId: number, content: string, authorId: number): Promise<any> => {
        try {
            const response = await api.post(`/posts/${postId}/comments`, { content, author_id: authorId });
            return response.data;
        } catch (error) {
            console.log('Error creating comment:', error);
            throw error;
        }
    },

    deleteComment: async (commentId: number): Promise<void> => {
        try {
            await api.delete(`/comments/${commentId}`);
        } catch (error) {
            console.log('Error deleting comment:', error);
            throw error;
        }
    },

    updateComment: async (commentId: number, content: string): Promise<any> => {
        try {
            const response = await api.put(`/comments/${commentId}`, { content });
            return response.data;
        } catch (error) {
            console.log('Error updating comment:', error);
            throw error;
        }
    },

    generateContent: async (title: string): Promise<string> => {
        try {
            const response = await api.post('/ai/generate', { title });
            return response.data.content;
        } catch (error) {
            console.log('Error generating content:', error);
            throw error;
        }
    },
};
