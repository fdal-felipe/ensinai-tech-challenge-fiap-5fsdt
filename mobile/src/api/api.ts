import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  // baseURL: 'https://blog-api-prod-mcw6.onrender.com', // Prod (lento - cold start)
  baseURL: 'http://192.168.0.8:3000', // Local (rápido)
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;