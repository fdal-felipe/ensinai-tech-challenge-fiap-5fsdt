# Mobile App - Plataforma Educacional Ensinai 📱📚

> Aplicativo mobile nativo para iOS e Android desenvolvido com **React Native**, **Expo SDK 54** e **TypeScript**.

[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Expo Router](https://img.shields.io/badge/Expo%20Router-6-000020?logo=expo)](https://docs.expo.dev/router/introduction/)

---

## 📋 Índice

- [🎯 Objetivo](#-objetivo)
- [🏗️ Arquitetura](#️-arquitetura)
- [🛠️ Tecnologias](#️-tecnologias)
- [📂 Estrutura](#-estrutura)
- [⚙️ Configuração](#️-configuração)
- [🚀 Execução](#-execução)
- [📱 Telas](#-telas)
- [🧩 Componentes](#-componentes)
- [🔐 Autenticação](#-autenticação)
- [🌓 Temas](#-temas)
- [🔗 API](#-api)
- [📦 Build](#-build)

---

## 🎯 Objetivo

Aplicativo mobile nativo que oferece experiência otimizada para dispositivos móveis:

### Para Professores 👨‍🏫
- ✅ Criar, editar e excluir posts educacionais
- ✅ Gerenciar usuários (professores e alunos)
- ✅ Visualizar e gerenciar todos os posts
- ✅ Alterar status de posts (ativo/inativo)
- ✅ Configurações de perfil e notificações

### Para Alunos 👨‍🎓
- ✅ Visualizar posts educacionais ativos
- ✅ Buscar conteúdo em tempo real
- ✅ Interface otimizada para leitura
- ✅ Experiência nativa fluida

### Funcionalidades Gerais 🌟
- 🌙 **Dark Mode e Light Mode**
- 🔐 **Autenticação segura** com SecureStore
- ⬇️ **Pull-to-refresh** nativo
- 🔍 **Busca em tempo real** com debounce
- 📱 **Design responsivo** para diferentes tamanhos
- 🔄 **Navegação fluida** com Expo Router

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        Mobile App                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Screens   │  │  Components │  │      Contexts       │  │
│  │  (Expo      │  │  (Reusable) │  │  (Auth, Theme)      │  │
│  │   Router)   │  │             │  │                     │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                    │             │
│         └────────────────┼────────────────────┘             │
│                          │                                  │
│                  ┌───────▼───────┐                          │
│                  │   API Layer   │                          │
│                  │    (Axios)    │                          │
│                  └───────┬───────┘                          │
└──────────────────────────┼──────────────────────────────────┘
                           │ HTTP + JWT
                   ┌───────▼───────┐
                   │  Backend API  │
                   │  (Express.js) │
                   └───────────────┘
```

### Expo Router (File-based Routing)

O app utiliza **Expo Router** para navegação baseada em arquivos:

```
app/
├── (tabs)/           # Tab Navigator (bottom tabs)
│   ├── index.tsx     # Tab: Posts (Alunos)
│   ├── posts-admin.tsx # Tab: Posts (Professor)
│   ├── users.tsx     # Tab: Usuários
│   └── account.tsx   # Tab: Conta
├── login.tsx         # Tela de Login
├── register.tsx      # Tela de Cadastro
├── forgot-password/  # Fluxo de recuperação
├── post/[id].tsx     # Detalhes do post
├── posts/form.tsx    # Criar/Editar post
├── users/form.tsx    # Criar/Editar usuário
└── profile/          # Configurações do perfil
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Expo](https://expo.dev/) | 54.0.30 | Plataforma de desenvolvimento |
| [React Native](https://reactnative.dev/) | 0.81.5 | Framework mobile |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.2 | Tipagem estática |
| [Expo Router](https://docs.expo.dev/router/introduction/) | 6.0.21 | Navegação file-based |
| [Axios](https://axios-http.com/) | 1.13.2 | Cliente HTTP |
| [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) | 15.0.8 | Armazenamento seguro |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | 4.1.1 | Animações performáticas |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | 2.2.0 | Persistência local |

---

## 📂 Estrutura

```
📁 mobile/
├── 📁 app/                          # Telas (Expo Router)
│   ├── 📄 _layout.tsx               # Layout raiz
│   ├── 📄 login.tsx                 # Tela de login
│   ├── 📄 register.tsx              # Tela de cadastro
│   ├── 📄 modal.tsx                 # Modal genérico
│   ├── 📄 +not-found.tsx            # Tela 404
│   ├── 📄 +html.tsx                 # HTML base (web)
│   ├── 📁 (tabs)/                   # Navegação por tabs
│   │   ├── 📄 _layout.tsx           # Layout das tabs
│   │   ├── 📄 index.tsx             # Posts (alunos)
│   │   ├── 📄 posts-admin.tsx       # Posts (professor)
│   │   ├── 📄 users.tsx             # Gestão de usuários
│   │   └── 📄 account.tsx           # Conta do usuário
│   ├── 📁 forgot-password/          # Fluxo de recuperação
│   │   ├── 📄 index.tsx             # Inserir email
│   │   ├── 📄 otp.tsx               # Código OTP
│   │   ├── 📄 new-password.tsx      # Nova senha
│   │   └── 📄 success.tsx           # Sucesso
│   ├── 📁 post/
│   │   └── 📄 [id].tsx              # Detalhes do post
│   ├── 📁 posts/
│   │   └── 📄 form.tsx              # Criar/Editar post
│   ├── 📁 users/
│   │   ├── 📄 _layout.tsx           # Layout
│   │   └── 📄 form.tsx              # Criar/Editar usuário
│   └── 📁 profile/                  # Configurações
│       ├── 📄 about.tsx             # Sobre o app
│       ├── 📄 edit.tsx              # Editar perfil
│       ├── 📄 integrations.tsx      # Integrações
│       ├── 📄 notifications.tsx     # Notificações
│       ├── 📄 privacy-policy.tsx    # Política de privacidade
│       ├── 📄 settings.tsx          # Configurações gerais
│       └── 📄 terms-of-use.tsx      # Termos de uso
├── 📁 src/
│   ├── 📁 api/                      # Serviços de API
│   │   ├── 📄 api.ts                # Configuração Axios
│   │   ├── 📄 postsService.ts       # CRUD de posts
│   │   └── 📄 usersService.ts       # CRUD de usuários
│   ├── 📁 contexts/                 # Context API
│   │   ├── 📄 AuthContext.tsx       # Autenticação
│   │   └── 📄 ThemeContext.tsx      # Tema (dark/light)
│   ├── 📁 hooks/                    # Custom hooks
│   ├── 📁 screens/                  # Telas legadas
│   ├── 📁 storage/                  # Armazenamento
│   └── 📁 types/                    # Definições TypeScript
│       └── 📄 index.ts              # Tipos globais
├── 📁 components/                   # Componentes reutilizáveis
│   ├── 📄 PostCard.tsx              # Card de post
│   ├── 📄 Themed.tsx                # Componentes com tema
│   ├── 📄 LegalScreenLayout.tsx     # Layout de telas legais
│   ├── 📄 ExternalLink.tsx          # Link externo
│   └── 📄 StyledText.tsx            # Texto estilizado
├── 📁 constants/
│   └── 📄 Colors.ts                 # Paleta de cores
├── 📁 assets/
│   ├── 📁 fonts/                    # Fontes customizadas
│   └── 📁 images/                   # Imagens e ícones
├── 📄 app.json                      # Configuração Expo
├── 📄 package.json                  # Dependências
└── 📄 tsconfig.json                 # Configuração TypeScript
```

---

## ⚙️ Configuração

### Pré-requisitos

- **Node.js 18+**
- **Expo CLI**: `npm install -g expo-cli`
- **Expo Go** (app no dispositivo) ou emulador

### 1️⃣ Instalar Dependências

```bash
cd mobile
npm install
```

### 2️⃣ Configurar URL da API

Edite o arquivo `src/api/api.ts`:

```typescript
const api = axios.create({
  // Produção (Render)
  // baseURL: 'https://blog-api-prod-mcw6.onrender.com',
  
  // Desenvolvimento local (substitua pelo seu IP)
  baseURL: 'http://192.168.0.X:3000',
});
```

> **Nota:** Para desenvolvimento local, use o IP da sua máquina (não `localhost`), pois o dispositivo/emulador precisa acessar a rede.

### Como descobrir seu IP:
```bash
# Linux/Mac
ip addr show | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

---

## 🚀 Execução

### Iniciar o Servidor de Desenvolvimento

```bash
npm start
# ou
expo start
```

### Executar no Dispositivo

1. **Instale o Expo Go**:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escaneie o QR Code** que aparece no terminal

### Executar no Emulador

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

---

## 📱 Telas

### Autenticação

| Tela | Rota | Descrição |
|------|------|-----------|
| Login | `/login` | Login com email e senha |
| Cadastro | `/register` | Registro de novo usuário |
| Esqueci Senha | `/forgot-password` | Inserir email |
| Código OTP | `/forgot-password/otp` | Validar código |
| Nova Senha | `/forgot-password/new-password` | Definir nova senha |
| Sucesso | `/forgot-password/success` | Confirmação |

### Tabs (Navegação Principal)

| Tab | Rota | Acesso | Descrição |
|-----|------|--------|-----------|
| Posts | `/(tabs)` | Todos | Lista de posts ativos |
| Administrar | `/(tabs)/posts-admin` | Professor | Gestão de posts |
| Usuários | `/(tabs)/users` | Professor | Gestão de usuários |
| Conta | `/(tabs)/account` | Todos | Perfil e configurações |

### Telas de Detalhes

| Tela | Rota | Descrição |
|------|------|-----------|
| Detalhes do Post | `/post/[id]` | Visualização completa |
| Formulário de Post | `/posts/form` | Criar/Editar post |
| Formulário de Usuário | `/users/form` | Criar/Editar usuário |

### Configurações do Perfil

| Tela | Rota | Descrição |
|------|------|-----------|
| Editar Perfil | `/profile/edit` | Editar dados pessoais |
| Configurações | `/profile/settings` | Configurações gerais |
| Notificações | `/profile/notifications` | Preferências de notificação |
| Integrações | `/profile/integrations` | Serviços conectados |
| Sobre | `/profile/about` | Informações do app |
| Termos de Uso | `/profile/terms-of-use` | Termos legais |
| Privacidade | `/profile/privacy-policy` | Política de privacidade |

---

## 🧩 Componentes

### Componentes Reutilizáveis

| Componente | Descrição |
|------------|-----------|
| `PostCard` | Card de visualização de post |
| `Themed` | View e Text com suporte a temas |
| `LegalScreenLayout` | Layout para telas legais (termos, privacidade) |
| `ExternalLink` | Link que abre no navegador |
| `StyledText` | Texto com estilos predefinidos |

### Exemplo de Uso

```tsx
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '../src/contexts/ThemeContext';

export default function MyScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Olá, mundo!
      </Text>
    </View>
  );
}
```

---

## 🔐 Autenticação

### AuthContext

O app utiliza **Context API** para gerenciar autenticação:

```tsx
// src/contexts/AuthContext.tsx
interface AuthContextData {
  signed: boolean;      // Se está logado
  user: User | null;    // Dados do usuário
  loading: boolean;     // Carregando estado inicial
  signIn(user: User, token: string): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}
```

### Armazenamento Seguro

Credenciais são armazenadas com **Expo SecureStore**:

```typescript
import * as SecureStore from 'expo-secure-store';

// Salvar token
await SecureStore.setItemAsync('userToken', token);

// Recuperar token
const token = await SecureStore.getItemAsync('userToken');

// Remover token
await SecureStore.deleteItemAsync('userToken');
```

### Fluxo de Login

```
1. Usuário insere credenciais
2. POST /auth/login → Recebe token JWT
3. Token salvo no SecureStore
4. Dados do usuário salvos no AsyncStorage
5. AuthContext atualizado (signed: true)
6. Redirecionamento para tabs
```

### Proteção de Rotas

```tsx
// app/(tabs)/_layout.tsx
export default function TabLayout() {
  const { signed, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!signed) {
    return <Redirect href="/login" />;
  }

  return <Tabs>...</Tabs>;
}
```

---

## 🌓 Temas

### ThemeContext

```tsx
// src/contexts/ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}
```

### Paleta de Cores

```typescript
// constants/Colors.ts
export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
  },
};
```

### Uso em Componentes

```tsx
import { useTheme } from '../src/contexts/ThemeContext';
import Colors from '@/constants/Colors';

export default function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Modo: {isDark ? 'Escuro' : 'Claro'}
      </Text>
      <Button title="Alternar Tema" onPress={toggleTheme} />
    </View>
  );
}
```

---

## 🔗 API

### Configuração do Axios

```typescript
// src/api/api.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://192.168.0.X:3000',
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Services

#### usersService

```typescript
// src/api/usersService.ts
export const usersService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  create: async (data: CreateUserData): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  update: async (id: number, data: UpdateUserData): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  }
};
```

### Tipos

```typescript
// src/types/index.ts
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
```

---

## 📦 Build

### Desenvolvimento

```bash
# Inicia o Metro Bundler
npm start

# Limpa cache
npm start -- --clear
```

### Preview Build (EAS)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Build de preview (Android)
eas build --platform android --profile preview

# Build de preview (iOS)
eas build --platform ios --profile preview
```

### Production Build

```bash
# Android (APK/AAB)
eas build --platform android --profile production

# iOS (IPA)
eas build --platform ios --profile production
```

### Configuração do app.json

```json
{
  "expo": {
    "name": "mobile",
    "slug": "mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png"
      },
      "edgeToEdgeEnabled": true
    },
    "plugins": [
      "expo-router",
      "expo-secure-store"
    ]
  }
}
```

---

## 📱 Screenshots

### Light Mode

| Login | Posts | Detalhes |
|:-----:|:-----:|:--------:|
| Tela de login | Lista de posts | Visualização do post |

### Dark Mode

| Login | Posts | Detalhes |
|:-----:|:-----:|:--------:|
| Tela de login | Lista de posts | Visualização do post |

---

## 🔧 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `expo start` | Inicia o servidor de desenvolvimento |
| `android` | `expo start --android` | Abre no emulador Android |
| `ios` | `expo start --ios` | Abre no simulador iOS |
| `web` | `expo start --web` | Abre no navegador |

---

## 🐛 Troubleshooting

### Erro de conexão com API

1. Verifique se o backend está rodando
2. Confirme que está usando o IP correto (não localhost)
3. Certifique-se que dispositivo e computador estão na mesma rede

### Expo Go não conecta

```bash
# Limpar cache
npm start -- --clear

# Usar túnel (se firewall bloqueando)
npm start -- --tunnel
```

### Erro de tipagem

```bash
# Reinstalar tipos
npm install --save-dev @types/react @types/react-native
```

---

## 📚 Recursos

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

## 📬 Suporte

Em caso de dúvidas ou problemas, consulte a [documentação principal do projeto](../README.md) ou abra uma issue no repositório.

---

<p align="center">
  <b>Ensinai</b> - Transformando a educação com tecnologia 🎓
</p>
