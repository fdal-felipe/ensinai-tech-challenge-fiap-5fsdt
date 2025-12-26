import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'aluno' | 'professor';
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(user: User, token: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storageUser = await SecureStore.getItemAsync('userData');
        const storageToken = await SecureStore.getItemAsync('userToken');

        if (storageUser && storageToken) {
          setUser(JSON.parse(storageUser));
        }
      } catch (error) {
        console.log('Error loading user data:', error);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(userData: User, token: string) {
    setUser(userData);
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
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