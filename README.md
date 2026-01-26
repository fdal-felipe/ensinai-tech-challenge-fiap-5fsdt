# Plataforma Educacional Ensinai - Tech Challenge Fase 4 🎓📱

> Projeto desenvolvido como parte do **Tech Challenge** do curso de Pós-Graduação em Full Stack Development da FIAP. Aplicação completa de blogging educacional com **Backend API**, **Frontend Web** e **Aplicativo Mobile** nativo.

[![CI/CD Pipeline](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt/actions/workflows/ci.yml/badge.svg)](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Expo%2054-blue?logo=expo)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ⭐ Novidades da Fase 4

Esta fase marca a **conclusão da plataforma multiplataforma**, adicionando:

🎯 **Aplicativo Mobile Nativo**
- 📱 Compatível com iOS e Android
- ⚡ Performance nativa com React Native
- 🎨 UI/UX otimizada para dispositivos móveis

🔒 **Segurança Aprimorada**
- 🔐 Armazenamento seguro de credenciais (Expo SecureStore)
- 🎫 Autenticação JWT persistente
- 🔄 Refresh automático de sessão

🌓 **Experiência do Usuário**
- 🌙 Dark Mode e Light Mode
- 🔍 Busca em tempo real com debounce
- ⬇️ Pull-to-refresh nativo
- 📊 Gerenciamento completo pelo mobile

🚀 **Arquitetura Escalável**
- 📦 Expo Router para navegação moderna
- 🎯 TypeScript em todo o mobile
- 🔄 Context API para estado global
- 🧩 Componentes reutilizáveis

---

## 🌐 Aplicação em Produção

### 🖥️ Plataformas Disponíveis

| Plataforma | Tecnologia | Status | Link |
|------------|-----------|--------|------|
| 🌐 **Web** | Next.js 15 | ✅ Online | [Vercel](https://ensinai-tech-challenge-fiap-5fsdt.vercel.app/) |
| 📱 **Mobile** | React Native + Expo | ✅ Funcional | iOS/Android (via Expo) |
| 🔧 **API** | Node.js + Express | ✅ Online | [Render](https://blog-api-prod-mcw6.onrender.com) |
| 📖 **Docs** | Swagger/OpenAPI | ✅ Online | [API Docs](https://blog-api-prod-mcw6.onrender.com/api-docs) |

---

## 📋 Índice

-   [🎯 Objetivo](#-objetivo)
-   [🏗️ Arquitetura](#️-arquitetura)
-   [🛠️ Tecnologias](#️-tecnologias)
-   [✨ Funcionalidades](#-funcionalidades)
-   [📂 Estrutura do Projeto](#-estrutura-do-projeto)
-   [🚀 Instalação e Execução](#-instalação-e-execução)
-   [📱 Aplicativo Mobile](#-aplicativo-mobile)
-   [🔒 Autenticação e Autorização](#-autenticação-e-autorização)
-   [📄 Documentação da API](#-documentação-da-api)
-   [🧪 Testes](#-testes)
-   [🐳 Docker](#-docker)
-   [📱 Fase 4 - Mobile](#-fase-4---mobile)
-   [☁️ CI/CD e Produção](#️-cicd-e-produção)
-   [🔍 Busca Inteligente](#-busca-inteligente)
-   [🗄️ Banco de Dados](#️-banco-de-dados)
-   [📚 Documentação](#-documentação)
-   [📬 Contato](#-contato)

---

## 🎓 Evolução do Projeto por Fases

### Fase 1 & 2: Fundamentos e API REST
-   ✅ Criação da API RESTful com Node.js e Express
-   ✅ Banco de dados PostgreSQL
-   ✅ CRUD completo de posts e usuários
-   ✅ Documentação Swagger/OpenAPI

### Fase 3: Autenticação e Deploy
-   ✅ Sistema de autenticação JWT
-   ✅ Controle de acesso por roles (professor/aluno)
-   ✅ Pipeline CI/CD com GitHub Actions
-   ✅ Deploy automático (Backend no Render)
-   ✅ Busca avançada com PostgreSQL

### Fase 4: Frontend Web e Mobile ⭐ **(Atual)**
-   ✅ Frontend web com Next.js 15 e React 19
-   ✅ Deploy do frontend na Vercel
-   ✅ **Aplicativo mobile nativo com React Native**
-   ✅ **Expo Router para navegação fluida**
-   ✅ **Dark Mode e Light Mode**
-   ✅ **Autenticação segura com SecureStore**
-   ✅ **Experiência otimizada para iOS e Android**
-   ✅ **Pull-to-refresh e busca em tempo real**
-   ✅ **Gestão completa de posts e usuários no mobile**

---

## 🎯 Objetivo

Criar uma **plataforma educacional completa e multiplataforma**, robusta, escalável e bem documentada, que permite:

### Para Professores 👨‍🏫

-   ✅ Criar, editar, listar e excluir postagens
-   ✅ Gerenciar usuários (professores e alunos)
-   ✅ Controlar status das postagens (ativo/inativo)
-   ✅ Buscar conteúdo avançado em todo o sistema
-   ✅ Dashboard administrativo completo
-   ✅ Acesso via web e mobile

### Para Alunos 👨‍🎓

-   ✅ Visualizar postagens ativas
-   ✅ Buscar conteúdo por palavra-chave
-   ✅ Acessar conteúdo educacional de qualidade
-   ✅ Interface moderna e responsiva (web e mobile)
-   ✅ Experiência nativa em dispositivos móveis

---

## 🏗️ Arquitetura

A aplicação segue uma arquitetura moderna, escalável e **multiplataforma**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   Web (Next.js) │◄──►│   (Express.js)  │◄──►│  (PostgreSQL)   │
│   Vercel        │    │   Render        │    │   Supabase      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                      ▲
         │                      │
         └──────────────────────┘
                  │
         ┌────────▼─────────┐
         │   Mobile App     │
         │  (React Native)  │
         │   Expo + TypeScript
         └──────────────────┘
```

### Separação por Papéis

-   **`/professor/*`**: Endpoints protegidos por JWT, acesso completo
-   **`/aluno/*`**: Endpoints públicos, apenas conteúdo ativo
-   **`/users/*`**: Gestão de usuários, apenas professores
-   **`/auth/*`**: Registro e login

---

## 🛠️ Tecnologias

### Backend 🔧

-   **Runtime:** [Node.js 18+](https://nodejs.org/)
-   **Framework:** [Express.js 5](https://expressjs.com/)
-   **Banco de Dados:** [PostgreSQL 15](https://www.postgresql.org/)
-   **Autenticação:** [JWT](https://jwt.io/) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
-   **Validação:** [Express Validator](https://express-validator.github.io/)
-   **Documentação:** [Swagger/OpenAPI](https://swagger.io/)

### Frontend 🎨

-   **Framework Web:** [Next.js 15](https://nextjs.org/)
-   **UI Library:** [React 19](https://react.dev/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [TailwindCSS 4](https://tailwindcss.com/)
-   **Componentes:** [Styled Components](https://styled-components.com/)

### Mobile 📱

-   **Framework:** [React Native](https://reactnative.dev/)
-   **Plataforma:** [Expo SDK 54](https://expo.dev/)
-   **Navegação:** [Expo Router](https://docs.expo.dev/router/introduction/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Gerenciamento de Estado:** React Context API
-   **Segurança:** [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
-   **Temas:** Dark Mode + Light Mode
-   **Compatibilidade:** iOS e Android

### DevOps & Infraestrutura 🚀

-   **Containerização:** [Docker](https://www.docker.com/) + Docker Compose
-   **CI/CD:** [GitHub Actions](https://github.com/features/actions)
-   **Deploy Backend:** [Render](https://render.com/)
-   **Deploy Frontend:** [Vercel](https://vercel.com/)
-   **Banco Produção:** [Supabase PostgreSQL](https://supabase.com/)
-   **Testes:** [Jest](https://jestjs.io/) + [Supertest](https://github.com/visionmedia/supertest)

---

## ✨ Funcionalidades

### 🔐 Gestão de Usuários (`/users`)

| Método   | Endpoint     | Descrição                | Autenticação |
| -------- | ------------ | ------------------------ | ------------ |
| `GET`    | `/users`     | Lista todos os usuários  | 🔒 Professor |
| `GET`    | `/users/:id` | Busca usuário específico | 🔒 Professor |
| `POST`   | `/users`     | Cria novo usuário        | 🔒 Professor |
| `PUT`    | `/users/:id` | Atualiza usuário         | 🔒 Professor |
| `DELETE` | `/users/:id` | Remove usuário           | 🔒 Professor |

### 👨‍🏫 Módulo Professor (`/professor/posts`)

| Método   | Endpoint                          | Descrição                | Autenticação |
| -------- | --------------------------------- | ------------------------ | ------------ |
| `GET`    | `/professor/posts`                | Lista todos os posts     | 🔒 Professor |
| `POST`   | `/professor/posts`                | Cria novo post           | 🔒 Professor |
| `GET`    | `/professor/posts/:id`            | Busca post específico    | 🔒 Professor |
| `PUT`    | `/professor/posts/:id`            | Atualiza post            | 🔒 Professor |
| `DELETE` | `/professor/posts/:id`            | Remove post              | 🔒 Professor |
| `GET`    | `/professor/posts/search?q=termo` | Busca posts por conteúdo | 🔒 Professor |

### 👨‍🎓 Módulo Aluno (`/aluno/posts`)

| Método | Endpoint                      | Descrição                   | Autenticação |
| ------ | ----------------------------- | --------------------------- | ------------ |
| `GET`  | `/aluno/posts`                | Lista posts ativos          | 🌐 Público   |
| `GET`  | `/aluno/posts/:id`            | Busca post ativo específico | 🌐 Público   |
| `GET`  | `/aluno/posts/search?q=termo` | Busca em posts ativos       | 🌐 Público   |

---

## 📂 Estrutura do Projeto

```
📦 ensinai-tech-challenge-fiap-5fsdt/
├── 📁 backend/                     # API Node.js/Express
│   ├── 📁 src/
│   │   ├── 📁 controllers/         # Lógica de negócio
│   │   ├── 📁 routes/              # Definição das rotas
│   │   ├── 📁 middleware/          # Middlewares (auth, etc.)
│   │   └── 📁 db/                  # Conexão e migrations
│   ├── 📁 tests/                   # Testes automatizados
│   ├── 📁 postgres-init/           # Scripts de inicialização do DB
│   ├── 🐳 Dockerfile               # Container do backend
│   └── 📄 package.json
├── 📁 frontend/                    # Aplicação Next.js/React
│   ├── 📁 src/
│   │   ├── 📁 app/                 # Pages (App Router)
│   │   ├── 📁 components/          # Componentes reutilizáveis
│   │   └── 📁 lib/                 # Utilitários
│   ├── 🐳 Dockerfile               # Container do frontend
│   └── 📄 package.json
├── 📁 mobile/                      # 📱 Aplicativo React Native
│   ├── 📁 app/                     # Screens (Expo Router)
│   │   ├── 📁 (tabs)/              # Navegação por tabs
│   │   ├── 📁 login/               # Tela de login
│   │   ├── 📁 register/            # Cadastro
│   │   ├── 📁 posts/               # Listagem e detalhes
│   │   └── 📁 profile/             # Perfil do usuário
│   ├── 📁 components/              # Componentes reutilizáveis
│   ├── 📁 src/
│   │   ├── 📁 api/                 # Serviços de API
│   │   ├── 📁 contexts/            # Context API (Auth, Theme)
│   │   └── 📁 types/               # Definições TypeScript
│   ├── 📁 constants/               # Constantes (cores, etc.)
│   └── 📄 package.json
├── 📁 docs/                        # 📚 Documentação do projeto
│   ├── 📁 diagramas/               # Diagramas de arquitetura
│   ├── 📄 guia-de-uso.md          # Manual do usuário
│   └── 📄 arquitetura.md          # Documentação técnica
├── 📁 .github/workflows/           # Pipeline CI/CD
├── 🐳 docker-compose.yml           # Orquestração dos containers
├── 📄 README.md                    # Este arquivo
└── 📄 CONTEXT.md                   # Contexto para ferramentas de IA
```

---

## 🚀 Instalação e Execução

### Pré-requisitos

-   **Node.js** v18+
-   **Docker & Docker Compose** (para backend e banco)
-   **PostgreSQL** (ou usar via Docker)
-   **Git**
-   **Expo CLI** (opcional, para mobile): `npm install -g expo-cli`

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt.git
cd ensinai-tech-challenge-fiap-5fsdt
```

### 2️⃣ Configuração das Variáveis de Ambiente

Copie e configure o arquivo de ambiente:

```bash
# Backend
cp backend/.env.example backend/.env
```

Configure as variáveis no arquivo `backend/.env`:

```bash
DB_USER=userblog
DB_PASSWORD=passwordblog
DB_DATABASE=blogdb
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_secreta_super_forte_aqui
```

### 3️⃣ Execução com Docker (Recomendado)

```bash
# Inicia todos os serviços
docker-compose up -d

# Verifica os logs
docker-compose logs -f
```

### 4️⃣ Execução Manual (Desenvolvimento)

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend Web (em outro terminal)
cd frontend
npm install
npm run dev

# Mobile (em outro terminal)
cd mobile
npm install
npx expo start
```

### 5️⃣ Acesso às Aplicações

-   **Frontend**: http://localhost (Docker) ou http://localhost:3001 (manual)
-   **Backend API**: http://localhost:3000
-   **Documentação Swagger**: http://localhost:3000/api-docs

---

## 📱 Aplicativo Mobile

### Pré-requisitos Mobile

-   **Node.js** v18+
-   **Expo CLI**: `npm install -g expo-cli`
-   **Expo Go** (app no iOS/Android) ou emulador

### Instalação e Execução

```bash
# Entre na pasta mobile
cd mobile

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Executar no Dispositivo

1. **Instale o Expo Go**:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escaneie o QR Code** que aparece no terminal

3. **Ou use um emulador**:
   ```bash
   # Android
   npm run android
   
   # iOS (apenas macOS)
   npm run ios
   ```

### Funcionalidades Mobile

#### 🔐 Autenticação
-   Login com email e senha
-   Registro de novos usuários
-   Recuperação de senha (fluxo completo)
-   Armazenamento seguro de tokens (SecureStore)
-   Lembrar credenciais

#### 🏠 Tela Principal (Home)
-   Listagem de posts educacionais
-   Busca em tempo real com debounce
-   Pull-to-refresh
-   Filtros por status (professores)
-   Navegação fluida entre telas

#### 👤 Perfil e Configurações
-   Visualização e edição de perfil
-   Configurações de notificações
-   Temas: Dark Mode e Light Mode
-   Gerenciamento de conta
-   Sobre o aplicativo

#### 📝 Gerenciamento de Posts (Professores)
-   Criar novos posts
-   Editar posts existentes
-   Excluir posts
-   Alterar status (ativo/inativo)
-   Upload de conteúdo

#### 👥 Gerenciamento de Usuários (Professores)
-   Listar todos os usuários
-   Criar novos usuários
-   Editar informações
-   Excluir usuários
-   Filtros e busca

### Configuração da API

O aplicativo se conecta ao backend via arquivo `mobile/src/api/api.ts`:

```typescript
const api = axios.create({
  // Produção
  baseURL: 'https://blog-api-prod-mcw6.onrender.com',
  
  // Ou Local (desenvolvimento)
  // baseURL: 'http://SEU_IP_LOCAL:3000',
});
```

**Importante**: Para desenvolvimento local, use o IP da sua máquina na rede local, não `localhost`.

### Estrutura do App Mobile

```
mobile/
├── app/                    # Screens (Expo Router)
│   ├── (tabs)/            # Navegação principal
│   │   ├── index.tsx      # Home - Lista de posts
│   │   ├── posts-admin.tsx # Admin de posts
│   │   ├── users.tsx      # Gestão de usuários
│   │   └── account.tsx    # Conta do usuário
│   ├── login.tsx          # Tela de login
│   ├── register.tsx       # Cadastro
│   ├── forgot-password/   # Fluxo de recuperação
│   ├── post/              # Detalhes do post
│   └── profile/           # Perfil e configurações
├── components/            # Componentes reutilizáveis
│   ├── PostCard.tsx      # Card de post
│   ├── Themed.tsx        # Componentes temáticos
│   └── ...
├── src/
│   ├── api/              # Serviços de API
│   │   ├── api.ts        # Configuração Axios
│   │   ├── postsService.ts
│   │   └── usersService.ts
│   ├── contexts/         # Contextos React
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   └── types/            # TypeScript types
└── constants/
    └── Colors.ts         # Paleta de cores
```

---

## 🔒 Autenticação e Autorização

### Sistema JWT

A aplicação utiliza **JSON Web Tokens** para autenticação:

1. **Registro**: `POST /auth/register`
2. **Login**: `POST /auth/login`
3. **Token**: Incluir no header `Authorization: Bearer <token>`

### Exemplo de Uso

```bash
# Registrar usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Professor Silva",
    "email": "silva@email.com",
    "password": "senha123",
    "role": "professor"
  }'

# Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "silva@email.com",
    "password": "senha123"
  }'

# Usar o token retornado
curl -X GET http://localhost:3000/professor/posts \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📄 Documentação da API

### Swagger/OpenAPI

A documentação interativa está disponível em:

-   **Produção**: [https://blog-api-prod-mcw6.onrender.com/api-docs](https://blog-api-prod-mcw6.onrender.com/api-docs)
-   **Local**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Exemplos de Requisições

Também disponível o arquivo `backend/requests-dev.http` com exemplos práticos para teste com VS Code REST Client.

---

## 🧪 Testes

### Testes Automatizados

```bash
cd backend
npm test
```

### Cobertura dos Testes

-   ✅ Endpoints de Professor
-   ✅ Endpoints de Aluno
-   ✅ Endpoints de Usuários
-   ✅ Autenticação e Autorização
-   ✅ Busca com PostgreSQL + unaccent

### Pipeline de CI/CD

Os testes são executados automaticamente no GitHub Actions a cada push/PR.

---

## 📱 Fase 4 - Mobile

A quarta fase do projeto consiste na migração da experiência do usuário para dispositivos móveis utilizando **React Native** e **Expo**.

### 🛠️ Tecnologias Mobile
- **React Native** (expo-router)
- **TypeScript**
- **Axios** para consumo de API
- **Expo Secure Store** para autenticação persistente

### 👥 Divisão do Time (Fase 4)
- **Felipe:** Core, Autenticação e Configuração Base.
- **Nicholas:** Módulo de Conteúdo (Listagem de Posts, Busca e Filtros).
- **Seiji:** Módulo Administrativo (CRUD de Posts).
- **Tiago:** Gestão de Usuários (Professores e Alunos).

### 🚀 Como executar o Mobile
1. Instale o aplicativo **Expo Go** em seu celular.
2. No terminal: `cd mobile && npm install && npx expo start`.
3. Escaneie o QR Code gerado.

---

## 🐳 Docker

### Desenvolvimento

```bash
docker-compose up -d
```

### Produção

Os Dockerfiles estão otimizados para produção com multi-stage builds:

-   **Backend**: `backend/Dockerfile`
-   **Frontend**: `frontend/Dockerfile`

---

## ☁️ CI/CD e Produção

### GitHub Actions

Pipeline automatizado que executa:

1. 🧪 **Testes** - Jest + Supertest
2. 🏗️ **Build** - Aplicações e containers
3. 🚀 **Deploy** - Automático para produção

### Ambientes de Produção

| Ambiente            | URL                                     | Descrição            |
| ------------------- | --------------------------------------- | -------------------- |
| **Desenvolvimento** | http://localhost:3000                   | Local com Docker     |
| **CI/CD**           | GitHub Actions                          | Testes automatizados |
| **Produção**        | https://blog-api-prod-mcw6.onrender.com | Deploy automático    |

### Processo de Deploy

1. **Commit** na branch `main`
2. **GitHub Actions** executa:
    - Setup Node.js 18
    - Instalar dependências
    - Inicializar banco PostgreSQL
    - Executar testes com Jest
3. **Se testes passam:**
    - Dispara webhook do Render
    - Deploy automático em produção

### Configuração de Secrets

No GitHub, configure em `Settings > Secrets and variables > Actions`:

```
DB_USER=usuario_prod
DB_PASSWORD=senha_prod
DB_DATABASE=blogdb_prod
JWT_SECRET=chave_super_secreta
RENDER_DEPLOY_HOOK=https://api.render.com/deploy/...
```

---

## 🔍 Busca Inteligente

### Recursos Avançados

-   **PostgreSQL Extensions**: `unaccent` + `pg_trgm`
-   **Busca Fuzzy**: Tolerante a erros de digitação
-   **Índices GIN**: Performance otimizada
-   **Busca sem Acentos**: Resultados mais abrangentes

### Exemplo de Busca

```bash
# Busca por "geometria" encontra também "GEOMETRÍA", "geometria", etc.
GET /aluno/posts/search?q=geometria
```

---

## 🗄️ Banco de Dados

### Estrutura

```sql
-- Tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'ativo',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Migrações

As migrações são executadas automaticamente na inicialização via `backend/src/db/migrate.js`.

---

## 📚 Documentação

O projeto conta com documentação completa na pasta `docs/`:

### 📋 Documentos Disponíveis

-   **[Arquitetura do Sistema](docs/arquitetura.md)** - Documentação técnica completa
-   **[Guia de Uso](docs/guia-de-uso.md)** - Manual do usuário final
-   **[Diagramas](docs/diagramas/)** - Diagramas de arquitetura (C4 Model)

### 🏗️ Arquitetura Técnica

-   Padrões de design utilizados
-   Estrutura de pastas detalhada
-   Decisões arquiteturais
-   Diagramas C4 (Contexto, Container, Componente)

### 👥 Manual do Usuário

-   Guia de uso para professores
-   Guia de uso para alunos
-   Screenshots da aplicação
-   Casos de uso práticos

---

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

-   **Backend**: ESLint + Prettier
-   **Frontend**: ESLint + TypeScript
-   **Commits**: Conventional Commits

---

## 📬 Contato

### Desenvolvedores

**Felipe Laudano** - Pós-Graduação FIAP Full Stack Development (5FSDT)

-   📧 Email: [fdal.felipe@gmail.com](mailto:fdal.felipe@gmail.com)
-   💼 LinkedIn: [@felipelaudano](https://www.linkedin.com/in/felipe-laudano/)
-   🐱 GitHub: [@fdal-felipe](https://github.com/fdal-felipe)

**Felipe Seiji** - Pós-Graduação FIAP Full Stack Development (5FSDT)

-   📧 Email: [seijimatie@gmail.com](mailto:seijimatie@gmail.com)
-   💼 LinkedIn: [@felipeseiji](https://www.linkedin.com/in/felipe-seiji-souza-matie-82835a150/)
-   🐱 GitHub: [@FeSeiji](https://github.com/FeSeiji)

**Nicholas Gerade** - Pós-Graduação FIAP Full Stack Development (5FSDT)

-   📧 Email: [nicholasgerade@gmail.com](mailto:nicholasgerade@gmail.com)
-   💼 LinkedIn: [@nicholasgerade](https://www.linkedin.com/in/nicholas-gerade-b21a8019b/)
-   🐱 GitHub: [@nigerade](https://github.com/nigerade)

**Tiago Mendes** - Pós-Graduação FIAP Full Stack Development (5FSDT)

-   📧 Email: [tiagoletras123@gmail.com](mailto:tiagoletras123@gmail.com)
-   💼 LinkedIn: [@tiagomendes](https://www.linkedin.com/in/tiagomendescarvalho/)
-   🐱 GitHub: [@TiagoMendes-pixel](https://github.com/TiagoMendes-pixel)

### Links do Projeto

-   🌐 **Frontend Web**: [https://ensinai-tech-challenge-fiap-5fsdt.vercel.app/](https://ensinai-tech-challenge-fiap-5fsdt.vercel.app/)
-   📱 **Mobile App**: React Native + Expo (iOS/Android)
-   🔧 **API Backend**: [https://blog-api-prod-mcw6.onrender.com](https://blog-api-prod-mcw6.onrender.com)
-   📚 **Repositório**: [https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt)
-   📖 **API Docs**: [https://blog-api-prod-mcw6.onrender.com/api-docs](https://blog-api-prod-mcw6.onrender.com/api-docs)

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Desenvolvido para o Tech Challenge FIAP - Fase 4**

[![FIAP](https://img.shields.io/badge/FIAP-Tech%20Challenge%20Fase%204-red?style=for-the-badge)](https://www.fiap.com.br/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Expo%2054-blue?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>
