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
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do usuário armazenados ao iniciar o app
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storageUser = await SecureStore.getItemAsync('userData');
        const storageToken = await SecureStore.getItemAsync('userToken');

        if (storageUser && storageToken) {
          setUser(JSON.parse(storageUser));
        }
      } catch (error) {
        console.log('Erro ao carregar dados do usuário:', error);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  // Função de login
  async function signIn(userData: User, token: string) {
    setUser(userData);
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
  }

  // Função de logout
  function signOut() {
    SecureStore.deleteItemAsync('userToken');
    SecureStore.deleteItemAsync('userData');
    setUser(null);
  }

  // Função para atualizar dados do usuário (após edição de perfil)
  async function updateUser(userData: User) {
    setUser(userData);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
