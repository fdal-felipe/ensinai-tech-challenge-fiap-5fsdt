# Frontend Web - Plataforma Educacional Ensinai 🎨📚

> Aplicação web moderna para gestão de conteúdo educacional, desenvolvida com **Next.js 15**, **React 19** e **TypeScript**.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-6.1-DB7093?logo=styled-components)](https://styled-components.com/)

---

## 📋 Índice

- [🎯 Objetivo](#-objetivo)
- [🏗️ Arquitetura](#️-arquitetura)
- [🛠️ Tecnologias](#️-tecnologias)
- [📂 Estrutura](#-estrutura)
- [⚙️ Configuração](#️-configuração)
- [🚀 Execução](#-execução)
- [📱 Páginas](#-páginas)
- [🧩 Componentes](#-componentes)
- [🎨 Estilização](#-estilização)
- [🐳 Docker](#-docker)
- [☁️ Deploy](#️-deploy)

---

## 🎯 Objetivo

Interface web responsiva que permite:

### Para Professores 👨‍🏫
- ✅ Criar, editar e excluir posts educacionais
- ✅ Gerenciar usuários e alunos
- ✅ Visualizar dashboard administrativo
- ✅ Configurar preferências e notificações
- ✅ Integrar com serviços externos

### Para Alunos 👨‍🎓
- ✅ Visualizar posts educacionais
- ✅ Buscar conteúdo por palavra-chave
- ✅ Acessar interface moderna e responsiva

---

## 🏗️ Arquitetura

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend API   │
│   (Next.js)     │────────►│   (Express.js)  │
│   Vercel        │  HTTP   │   Render        │
└─────────────────┘         └─────────────────┘
         │
         │ App Router
         ▼
┌─────────────────────────────────────────────┐
│                 Páginas                      │
├─────────────────────────────────────────────┤
│  /login    /cadastro    /esqueci-senha      │
│  /home     /posts       /configuracoes      │
│  /minha-conta    /integracoes    ...        │
└─────────────────────────────────────────────┘
```

### App Router (Next.js 15)

O projeto utiliza o **App Router** do Next.js com:
- **Route Groups**: `(dashboard)` para layout compartilhado
- **Dynamic Routes**: `[id]` para páginas dinâmicas
- **Layouts aninhados**: Sidebar e navegação mobile

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Next.js](https://nextjs.org/) | 15.4.6 | Framework React com SSR/SSG |
| [React](https://react.dev/) | 19.1.0 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [Styled Components](https://styled-components.com/) | 6.1.19 | CSS-in-JS |
| [TailwindCSS](https://tailwindcss.com/) | 4.x | Framework CSS utilitário |
| [Turbopack](https://turbo.build/pack) | - | Bundler de desenvolvimento |

---

## 📂 Estrutura

```
📁 frontend/
├── 📁 src/
│   ├── 📁 app/                      # App Router (páginas)
│   │   ├── 📄 layout.tsx            # Layout raiz
│   │   ├── 📄 page.tsx              # Página inicial (loading)
│   │   ├── 📄 globals.css           # Estilos globais
│   │   ├── 📁 login/                # Página de login
│   │   ├── 📁 cadastro/             # Página de cadastro
│   │   ├── 📁 esqueci-senha/        # Recuperação de senha
│   │   └── 📁 (dashboard)/          # Route Group - Dashboard
│   │       ├── 📄 layout.tsx        # Layout do dashboard
│   │       ├── 📁 home/             # Home do dashboard
│   │       ├── 📁 posts/            # CRUD de posts
│   │       │   ├── 📄 page.tsx      # Lista de posts
│   │       │   ├── 📁 new/          # Criar post
│   │       │   └── 📁 [id]/         # Editar post
│   │       ├── 📁 configuracoes/    # Configurações
│   │       ├── 📁 minha-conta/      # Perfil do usuário
│   │       ├── 📁 gerenciar-alunos/ # Gestão de alunos
│   │       ├── 📁 gerenciar-materias/ # Gestão de matérias
│   │       ├── 📁 integracoes/      # Integrações externas
│   │       └── 📁 notificacoes/     # Central de notificações
│   ├── 📁 components/               # Componentes reutilizáveis
│   │   ├── 📄 Button.tsx
│   │   ├── 📄 Modal.tsx
│   │   ├── 📄 Sidebar.tsx
│   │   ├── 📄 PostCard.tsx
│   │   ├── 📄 Spinner.tsx
│   │   └── ... (21 componentes)
│   └── 📁 lib/
│       └── 📄 registry.tsx          # Styled Components SSR
├── 📁 public/                       # Arquivos estáticos
├── 📄 Dockerfile                    # Container de produção
├── 📄 package.json                  # Dependências
├── 📄 next.config.ts                # Configuração Next.js
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 postcss.config.mjs            # Configuração PostCSS
└── 📄 eslint.config.mjs             # Configuração ESLint
```

---

## ⚙️ Configuração

### Pré-requisitos

- **Node.js 18+**
- **npm** ou **yarn**

### 1️⃣ Instalar Dependências

```bash
cd frontend
npm install
```

### 2️⃣ Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local` se necessário:

```bash
# URL da API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🚀 Execução

### Desenvolvimento

```bash
# Com Turbopack (mais rápido)
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Produção

```bash
# Build
npm run build

# Iniciar
npm start
```

### Lint

```bash
npm run lint
```

---

## 📱 Páginas

### Públicas (Sem autenticação)

| Rota | Descrição |
|------|-----------|
| `/` | Tela de carregamento inicial |
| `/login` | Login do usuário |
| `/cadastro` | Registro de novo usuário |
| `/esqueci-senha` | Recuperação de senha (OTP) |

### Dashboard (Autenticadas)

| Rota | Descrição |
|------|-----------|
| `/home` | Dashboard principal com ações rápidas |
| `/posts` | Lista de todos os posts |
| `/posts/new` | Criar novo post |
| `/posts/[id]` | Editar post existente |
| `/configuracoes` | Configurações gerais |
| `/configuracoes/mudar-senha` | Alterar senha |
| `/minha-conta` | Perfil do usuário |
| `/minha-conta/editar` | Editar perfil |
| `/gerenciar-alunos` | Lista de alunos |
| `/gerenciar-alunos/[id]` | Detalhes do aluno |
| `/gerenciar-materias` | Gestão de matérias |
| `/integracoes` | Integrações externas |
| `/notificacoes` | Central de notificações |

### Fluxo de Navegação

```
┌─────────┐    ┌─────────┐    ┌─────────────┐
│  Login  │───►│  Home   │───►│   Posts     │
└─────────┘    └─────────┘    └─────────────┘
     │              │               │
     ▼              ▼               ▼
┌─────────┐    ┌─────────┐    ┌─────────────┐
│Cadastro │    │Settings │    │ New/Edit    │
└─────────┘    └─────────┘    └─────────────┘
```

---

## 🧩 Componentes

### Componentes de UI

| Componente | Descrição |
|------------|-----------|
| `Button` | Botão customizável (primary, secondary, danger) |
| `Modal` | Modal de confirmação/alerta |
| `Spinner` | Indicador de carregamento |
| `SearchBar` | Barra de busca |
| `OtpInput` | Input para código OTP |
| `PasswordInput` | Input de senha com toggle de visibilidade |

### Componentes de Layout

| Componente | Descrição |
|------------|-----------|
| `Sidebar` | Menu lateral (desktop) |
| `MenuMobile` | Menu fullscreen (mobile) |
| `HeaderMobile` | Botão flutuante de navegação |
| `Header` | Cabeçalho da aplicação |
| `Footer` | Rodapé da aplicação |

### Componentes de Conteúdo

| Componente | Descrição |
|------------|-----------|
| `PostCard` | Card de post (visualização) |
| `PostListItem` | Item de lista de posts |
| `PostForm` | Formulário de post |
| `StudentCard` | Card de aluno |
| `ProfessorList` | Lista de professores (select) |

### Componentes de Formulário

| Componente | Descrição |
|------------|-----------|
| `FormStyles` | Estilos compartilhados de formulário |
| `SettingsComponents` | Componentes de configurações |
| `UploadModal` | Modal de upload de arquivos |
| `WIPPage` | Página "Em desenvolvimento" |

### Exemplo de Uso

```tsx
import Button from '@/components/Button';
import Modal from '@/components/Modal';

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => console.log('Confirmado!')}
        title="Confirmação"
        confirmText="Confirmar"
      >
        Deseja continuar?
      </Modal>
    </>
  );
}
```

---

## 🎨 Estilização

### Styled Components

O projeto utiliza **Styled Components** com SSR configurado:

```tsx
// src/lib/registry.tsx - SSR para Styled Components
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }) {
  // ... configuração SSR
}
```

### Exemplo de Styled Component

```tsx
import styled from 'styled-components';

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
`;
```

### TailwindCSS

O TailwindCSS está disponível para estilos utilitários:

```tsx
<div className="flex items-center justify-between p-4">
  <h1 className="text-2xl font-bold text-gray-800">Título</h1>
</div>
```

### Variáveis CSS

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --font-inter: 'Inter', sans-serif;
}
```

### Responsividade

O projeto é totalmente responsivo com breakpoints:

| Breakpoint | Largura | Uso |
|------------|---------|-----|
| Mobile | < 640px | Menu mobile, layout simplificado |
| Tablet | < 768px | Ajustes de grid |
| Desktop | < 1024px | Layout completo com sidebar |

```tsx
const Sidebar = styled.aside`
  width: 280px;
  
  @media (max-width: 768px) {
    display: none; // Esconde sidebar no mobile
  }
`;
```

---

## 🐳 Docker

### Dockerfile (Multi-stage)

```dockerfile
# Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Next.js Standalone

O projeto está configurado para gerar output `standalone`:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true
  }
};
```

### Build e Execução

```bash
# Build da imagem
docker build -t ensinai-frontend .

# Executar container
docker run -p 3000:3000 ensinai-frontend
```

---

## ☁️ Deploy

### Vercel (Recomendado)

O frontend está deployado na [Vercel](https://vercel.com/):

**URL de Produção:** https://ensinai-tech-challenge-fiap-5fsdt.vercel.app/

#### Deploy Automático

1. Conecte o repositório GitHub à Vercel
2. Deployamento automático a cada push na `main`
3. Preview deployments para Pull Requests

#### Variáveis de Ambiente (Vercel)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | URL da API Backend |

### Docker (Alternativo)

Para deploy em outras plataformas:

```bash
# Build
docker build -t ensinai-frontend .

# Push para registry
docker tag ensinai-frontend seu-registry/ensinai-frontend
docker push seu-registry/ensinai-frontend
```

---

## 🔗 Integração com Backend

A comunicação com a API é feita via `fetch`:

```typescript
// Exemplo: Login
const handleLogin = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { token, role } = await res.json();
  localStorage.setItem('token', token);
};

// Exemplo: Criar Post
const createPost = async (data: PostData) => {
  const token = localStorage.getItem('token');
  
  await fetch(`${API_URL}/professor/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
```

---

## 📚 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `next dev --turbopack` | Inicia servidor de desenvolvimento |
| `build` | `next build` | Gera build de produção |
| `start` | `next start` | Inicia servidor de produção |
| `lint` | `next lint` | Executa ESLint |

---

## 📬 Suporte

Em caso de dúvidas ou problemas, consulte a [documentação principal do projeto](../README.md) ou abra uma issue no repositório.

---

<p align="center">
  <b>Ensinai</b> - Transformando a educação com tecnologia 🎓
</p>
