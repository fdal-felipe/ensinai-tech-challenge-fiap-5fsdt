import api from './api';
import { User, UserRole } from '../types';

export const usersService = {
    getAll: async (): Promise<User[]> => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.log('Error fetching users:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<User | null> => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.log('Error fetching user by id:', error);
            return null;
        }
    },

    create: async (data: { name: string; email: string; password_hash: string; role: UserRole }): Promise<User | null> => {
        try {
            const response = await api.post('/users', data);
            return response.data;
        } catch (error) {
            console.log('Error creating user:', error);
            throw error;
        }
    },

    update: async (id: number, data: { name: string; email: string; password?: string; role: UserRole }): Promise<User | null> => {
        try {
            const response = await api.put(`/users/${id}`, data);
            return response.data;
        } catch (error) {
            console.log('Error updating user:', error);
            throw error;
        }
    },

    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/users/${id}`);
        } catch (error) {
            console.log('Error deleting user:', error);
            throw error;
        }
    }
};
