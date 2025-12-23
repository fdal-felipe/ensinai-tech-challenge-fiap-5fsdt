import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api/api';

interface AuthContextData {
  signed: boolean;
  user: any | null;
  loading: boolean;
  signIn(credentials: object): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await SecureStore.getItemAsync('userData');
      const storageToken = await SecureStore.getItemAsync('userToken');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(credentials) {
    const response = await api.post('/auth/login', credentials);
    
    const { token, user: userResponse } = response.data;

    setUser(userResponse);
    
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userResponse));
  }

  function signOut() {
    SecureStore.deleteItemAsync('userToken');
    SecureStore.deleteItemAsync('userData');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);