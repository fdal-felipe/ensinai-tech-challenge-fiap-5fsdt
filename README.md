# API de Blog Educacional (Ensinai) - Tech Challenge Fase 2 🎓

> Projeto desenvolvido como parte do **Tech Challenge** do curso de Pós-Graduação em Full Stack Development da FIAP, com foco na criação de uma aplicação completa de blogging educacional.

[![CI/CD Pipeline](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt/actions/workflows/ci.yml/badge.svg)](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Índice

-   [🎯 Objetivo](#-objetivo)
-   [🏗️ Arquitetura](#️-arquitetura)
-   [🛠️ Tecnologias](#️-tecnologias)
-   [✨ Funcionalidades](#-funcionalidades)
-   [📂 Estrutura do Projeto](#-estrutura-do-projeto)
-   [🚀 Instalação e Execução](#-instalação-e-execução)
-   [🔒 Autenticação e Autorização](#-autenticação-e-autorização)
-   [📄 Documentação da API](#-documentação-da-api)
-   [🧪 Testes](#-testes)
-   [🐳 Docker](#-docker)
-   [☁️ CI/CD e Produção](#️-cicd-e-produção)
-   [🔍 Busca Inteligente](#-busca-inteligente)
-   [🗄️ Banco de Dados](#️-banco-de-dados)
-   [📬 Contato](#-contato)

---

## 🎯 Objetivo

Criar uma aplicação **full-stack** robusta, escalável e bem documentada para blogging educacional, que permite:

### Para Professores 👨‍🏫

-   ✅ Criar, editar, listar e excluir postagens
-   ✅ Gerenciar usuários (professores e alunos)
-   ✅ Controlar status das postagens (ativo/inativo)
-   ✅ Busca avançada em todo o conteúdo

### Para Alunos 👨‍🎓

-   ✅ Visualizar postagens ativas
-   ✅ Buscar conteúdo por palavra-chave
-   ✅ Acessar conteúdo educacional de qualidade
-   ✅ Interface moderna e responsiva

---

## 🏗️ Arquitetura

```mermaid
graph TB
    A[Frontend - Next.js] --> B[API Gateway - Express]
    B --> C[Middleware - JWT Auth]
    C --> D[Controllers]
    D --> E[PostgreSQL Database]

    F[GitHub Actions] --> G[Testes Automatizados]
    G --> H[Deploy Render]

    I[Docker Compose] --> J[Desenvolvimento Local]
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

-   **Framework:** [Next.js 15](https://nextjs.org/)
-   **UI Library:** [React 19](https://react.dev/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [TailwindCSS 4](https://tailwindcss.com/)
-   **Componentes:** [Styled Components](https://styled-components.com/)

### DevOps & Infraestrutura 🚀

-   **Containerização:** [Docker](https://www.docker.com/) + Docker Compose
-   **CI/CD:** [GitHub Actions](https://github.com/features/actions)
-   **Deploy Backend:** [Render](https://render.com/)
-   **Deploy Frontend:** [Vercel](https://vercel.com/) _(configurável)_
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

| Método   | Endpoint                          | Descrição                 | Autenticação |
| -------- | --------------------------------- | ------------------------- | ------------ |
| `GET`    | `/professor/posts`                | Lista todas as postagens  | 🔒 Professor |
| `POST`   | `/professor/posts`                | Cria nova postagem        | 🔒 Professor |
| `GET`    | `/professor/posts/:id`            | Busca postagem específica | 🔒 Professor |
| `PUT`    | `/professor/posts/:id`            | Atualiza postagem         | 🔒 Professor |
| `DELETE` | `/professor/posts/:id`            | Remove postagem           | 🔒 Professor |
| `GET`    | `/professor/posts/search?q=termo` | Busca inteligente         | 🔒 Professor |

### 👨‍🎓 Módulo Aluno (`/aluno/posts`)

| Método | Endpoint                      | Descrição                 | Autenticação |
| ------ | ----------------------------- | ------------------------- | ------------ |
| `GET`  | `/aluno/posts`                | Lista postagens ativas    | 🌐 Público   |
| `GET`  | `/aluno/posts/:id`            | Visualiza postagem ativa  | 🌐 Público   |
| `GET`  | `/aluno/posts/search?q=termo` | Busca em postagens ativas | 🌐 Público   |

### 🔑 Autenticação (`/auth`)

| Método | Endpoint         | Descrição                |
| ------ | ---------------- | ------------------------ |
| `POST` | `/auth/register` | Registro de usuário      |
| `POST` | `/auth/login`    | Login e geração de token |

---

## 📂 Estrutura do Projeto

```
📦 ensinai-tech-challenge-fiap-5fsdt/
├── 📁 .github/workflows/          # Pipeline CI/CD
│   └── 📄 ci.yml                 # GitHub Actions
├── 📁 backend/                   # API Backend
│   ├── 📁 postgres-init/         # Scripts SQL inicialização
│   │   ├── 📄 init.sql          # Ambiente local
│   │   └── 📄 init.ci.sql       # Ambiente CI/CD
│   ├── 📁 src/                  # Código-fonte principal
│   │   ├── 📁 controllers/       # Lógica de negócio
│   │   │   ├── 📄 professorPosts.js
│   │   │   ├── 📄 alunoPosts.js
│   │   │   ├── 📄 users.js
│   │   │   └── 📄 auth.js
│   │   ├── 📁 db/               # Configuração banco
│   │   │   ├── 📄 index.js      # Conexão PostgreSQL
│   │   │   └── 📄 migrate.js    # Migrações automáticas
│   │   ├── 📁 middleware/       # Middlewares
│   │   │   └── 📄 auth.js       # Autenticação JWT
│   │   ├── 📁 routes/           # Definição de rotas
│   │   │   ├── 📄 professorPosts.js
│   │   │   ├── 📄 alunoPosts.js
│   │   │   ├── 📄 users.js
│   │   │   └── 📄 auth.js
│   │   ├── 📄 app.js            # Configuração Express
│   │   └── 📄 server.js         # Inicialização servidor
│   ├── 📁 tests/                # Testes automatizados
│   │   ├── 📄 setup.js          # Configuração Jest
│   │   └── 📄 posts.test.js     # Suíte de testes
│   ├── 📄 Dockerfile            # Container backend
│   ├── 📄 package.json          # Dependências Node.js
│   ├── 📄 jest.config.js        # Configuração testes
│   └── 📄 swagger.config.js     # Documentação API
├── 📁 frontend/                 # Interface Next.js
│   ├── 📁 src/app/              # App Router Next.js 15
│   ├── 📄 Dockerfile            # Container frontend
│   ├── 📄 package.json          # Dependências frontend
│   ├── 📄 tsconfig.json         # Configuração TypeScript
│   ├── 📄 tailwind.config.ts    # TailwindCSS
│   └── 📄 next.config.ts        # Configuração Next.js
├── 📄 docker-compose.yml        # Orquestração containers
├── 📄 README.md                 # Este arquivo
└── 📄 CONTEXT.md                # Contexto para IAs
```

---

## 🚀 Instalação e Execução

### 🔧 Pré-requisitos

-   [Git](https://git-scm.com/downloads)
-   [Node.js 18+](https://nodejs.org/)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 📥 1. Clone o Repositório

```bash
git clone https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt.git
cd ensinai-tech-challenge-fiap-5fsdt
```

### ⚙️ 2. Configuração Backend

```bash
# Navegar para o backend
cd backend

# Copiar e configurar variáveis de ambiente
cp .env.example .env
```

**Edite o arquivo `.env`:**

```env
DB_USER=userblog
DB_PASSWORD=passwordblog
DB_DATABASE=blogdb
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_secreta_super_forte_aqui
```

### ⚙️ 3. Configuração Frontend

```bash
# Navegar para o frontend
cd ../frontend

# Instalar dependências
npm install
```

### 🐳 4. Executar com Docker (Recomendado)

**Na raiz do projeto:**

```bash
# Subir toda a aplicação
docker-compose up --build

# Em modo detach (background)
docker-compose up --build -d
```

**Serviços disponíveis:**

-   🌐 **Frontend:** http://localhost:80
-   🔌 **Backend API:** http://localhost:3000
-   📚 **Documentação:** http://localhost:3000/api-docs
-   🗄️ **PostgreSQL:** localhost:5432

### 🏃‍♂️ 5. Executar Manualmente (Desenvolvimento)

**Terminal 1 - Banco de Dados:**

```bash
docker-compose up -d db
```

**Terminal 2 - Backend:**

```bash
cd backend
npm install
npm run dev
```

**Terminal 3 - Frontend:**

```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Autenticação e Autorização

### 🎫 Fluxo de Autenticação

1. **Registro:** `POST /auth/register`

```json
{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123",
    "role": "professor"
}
```

2. **Login:** `POST /auth/login`

```json
{
    "email": "joao@email.com",
    "password": "senha123"
}
```

3. **Resposta com Token:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "name": "João Silva",
        "email": "joao@email.com",
        "role": "professor"
    }
}
```

### 🛡️ Usando o Token

**Headers das requisições protegidas:**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### 👥 Níveis de Acesso

| Papel         | Permissões                                                  |
| ------------- | ----------------------------------------------------------- |
| **Professor** | ✅ CRUD posts<br/>✅ Gestão usuários<br/>✅ Busca completa  |
| **Aluno**     | ✅ Visualizar posts ativos<br/>✅ Busca em conteúdo público |

---

## 📄 Documentação da API

### 🌐 Swagger UI Interativo

-   **Local:** http://localhost:3000/api-docs
-   **Produção:** https://blog-api-prod-mcw6.onrender.com/api-docs

### 🔓 Testando Endpoints Protegidos

1. Acesse a documentação Swagger
2. Clique em **"Authorize"** (🔒)
3. Cole o token JWT: `Bearer SEU_TOKEN_AQUI`
4. Teste os endpoints diretamente na interface

### 📋 Exemplos de Requisição

**Criar Post (Professor):**

```http
POST /professor/posts
Authorization: Bearer TOKEN_AQUI
Content-Type: application/json

{
  "title": "Introdução à Matemática",
  "content": "Conceitos fundamentais...",
  "author_id": 1
}
```

**Buscar Posts (Aluno):**

```http
GET /aluno/posts/search?q=matemática
```

---

## 🧪 Testes

### 🎯 Cobertura de Testes

-   ✅ **Autenticação:** Registro, login, validação JWT
-   ✅ **Autorização:** Controle de acesso por papel
-   ✅ **CRUD Posts:** Criação, leitura, atualização, exclusão
-   ✅ **Busca:** Funcionalidade de pesquisa textual
-   ✅ **Validação:** Dados obrigatórios e formatos

### 🏃‍♂️ Executar Testes

```bash
# Garantir que o banco esteja rodando
docker-compose up -d db

# Executar suíte de testes
cd backend
npm test

# Com coverage
npm test -- --coverage
```

### 📊 Resultados Esperados

```
✅ Testes dos Endpoints de Professor (/professor/posts)
✅ Testes dos Endpoints de Aluno (/aluno/posts)
✅ Testes dos Endpoints de Usuários (/users)
✅ Testes de Autenticação (/auth)

Test Suites: 1 passed
Tests: 20+ passed
```

---

## 🐳 Docker

### 🏗️ Multi-Container Setup

```yaml
# docker-compose.yml
services:
    db: # PostgreSQL 15 + extensões
    app: # Backend Node.js
    frontend: # Frontend Next.js
```

### 📦 Comandos Úteis

```bash
# Construir e subir todos os serviços
docker-compose up --build

# Apenas o banco (para desenvolvimento)
docker-compose up -d db

# Ver logs específicos
docker-compose logs app
docker-compose logs frontend

# Parar todos os serviços
docker-compose down

# Limpar volumes (CUIDADO: apaga dados!)
docker-compose down -v
```

### 🔍 Conectar ao Banco com DBeaver

| Campo    | Valor          |
| -------- | -------------- |
| Host     | `localhost`    |
| Port     | `5432`         |
| Database | `blogdb`       |
| Username | `userblog`     |
| Password | `passwordblog` |

---

## ☁️ CI/CD e Produção

### 🔄 Pipeline Automatizado

```mermaid
graph LR
    A[Push/PR] --> B[GitHub Actions]
    B --> C[Build & Test]
    C --> D{Testes OK?}
    D -->|✅| E[Deploy Render]
    D -->|❌| F[Falha]
```

### 🚀 Ambientes

| Ambiente            | URL                                     | Descrição            |
| ------------------- | --------------------------------------- | -------------------- |
| **Desenvolvimento** | http://localhost:3000                   | Local com Docker     |
| **CI/CD**           | GitHub Actions                          | Testes automatizados |
| **Produção**        | https://blog-api-prod-mcw6.onrender.com | Deploy automático    |

### 📋 Processo de Deploy

1. **Commit** na branch `main`
2. **GitHub Actions** executa:
    - Setup Node.js 18
    - Instalar dependências
    - Inicializar banco PostgreSQL
    - Executar testes com Jest
3. **Se testes passam:**
    - Dispara webhook do Render
    - Deploy automático em produção

### 🔧 Configuração de Secrets

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

### 🧠 Recursos Avançados

-   **📝 Busca Textual:** Título + conteúdo
-   **🔤 Normalização:** Remove acentos automaticamente
-   **🎯 Similaridade:** Algoritmo trigram para palavras similares
-   **⚡ Performance:** Índices GIN otimizados

### 🛠️ Implementação Técnica

**Extensões PostgreSQL:**

```sql
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

**Função de Busca:**

```sql
CREATE OR REPLACE FUNCTION public.f_unaccent(text)
RETURNS text AS $$
SELECT extensions.unaccent($1)
$$ LANGUAGE sql IMMUTABLE;
```

**Índice Otimizado:**

```sql
CREATE INDEX idx_posts_search ON posts
USING gin (f_unaccent(title || ' ' || content) gin_trgm_ops);
```

### 📝 Exemplos de Busca

```javascript
// Busca por "matemática" encontra:
// - "Matemática Básica"
// - "matematica avançada"
// - "Conceitos matemáticos"

GET /aluno/posts/search?q=matematica
GET /professor/posts/search?q=geometria
```

---

## 🗄️ Banco de Dados

### 📊 Modelo Relacional

```mermaid
erDiagram
    USERS {
        serial id PK
        varchar name
        varchar email UK
        varchar password_hash
        user_role role
        timestamptz created_at
        timestamptz updated_at
    }

    POSTS {
        serial id PK
        varchar title
        text content
        integer author_id FK
        varchar status
        timestamptz created_at
        timestamptz updated_at
    }

    USERS ||--o{ POSTS : "author_id"
```

### 🏷️ Tipos Customizados

```sql
-- Enum para papéis de usuário
CREATE TYPE user_role AS ENUM ('professor', 'aluno');

-- Status das postagens
status VARCHAR(20) DEFAULT 'ativo'  -- 'ativo' | 'inativo'
```

### 🔧 Migrações Automáticas

O sistema executa migrações automaticamente na inicialização:

```javascript
// src/db/migrate.js
async function runMigrations() {
    // Verifica e aplica mudanças no schema
    // Cria extensões, tabelas e índices
}
```

---

## 🚨 Solução de Problemas

### ❓ Problemas Comuns

**🐳 Docker não inicia:**

```bash
# Verificar se o Docker Desktop está rodando
docker --version

# Limpar containers antigos
docker system prune -f
```

**🔒 Erro de autenticação:**

```bash
# Verificar se o JWT_SECRET está configurado
echo $JWT_SECRET

# Gerar novo token via login
POST /auth/login
```

**🗄️ Banco não conecta:**

```bash
# Verificar se o container do DB está rodando
docker-compose ps

# Ver logs do banco
docker-compose logs db
```

**🧪 Testes falhando:**

```bash
# Garantir que o banco de teste está limpo
docker-compose down -v
docker-compose up -d db
npm test
```

### 📋 Checklist de Verificação

-   [ ] Docker Desktop rodando
-   [ ] Arquivo `.env` configurado
-   [ ] Portas 3000, 5432 e 80 disponíveis
-   [ ] Node.js 18+ instalado
-   [ ] Dependências instaladas com `npm install`

---

## 🔮 Próximos Passos

### 🌟 Melhorias Planejadas

-   [ ] **📱 App Mobile:** React Native
-   [ ] **🔔 Notificações:** WebSocket em tempo real
-   [ ] **📊 Analytics:** Dashboard de métricas
-   [ ] **🎨 Temas:** Dark/Light mode
-   [ ] **🌐 i18n:** Internacionalização
-   [ ] **🔍 Elasticsearch:** Busca ainda mais avançada
-   [ ] **📷 Upload:** Imagens nas postagens
-   [ ] **💬 Comentários:** Sistema de feedback

### 🎯 Roadmap Técnico

-   [ ] **Microserviços:** Separação por domínio
-   [ ] **GraphQL:** API mais flexível
-   [ ] **Redis:** Cache distribuído
-   [ ] **Kubernetes:** Orquestração avançada
-   [ ] **Monitoramento:** Prometheus + Grafana

---

## 💡 Experiências e Aprendizados

### 🎓 Desafios Superados

**🔧 Configuração CI/CD:**

> A integração do Jest com PostgreSQL no GitHub Actions exigiu configuração cuidadosa das variáveis de ambiente e scripts SQL específicos para o ambiente de testes.

**🔍 Busca Inteligente:**

> Implementar busca com tolerância a erros e acentos nos levou a estudar extensões PostgreSQL avançadas como `unaccent` e `pg_trgm`, além de otimização com índices GIN.

**🚀 Deploy Contínuo:**

> Sincronizar mudanças de schema entre desenvolvimento e produção exigiu estratégias de migração automática e rollback seguro.

**🐳 Docker Multi-Stage:**

> Otimizar builds para produção com containers menores e mais seguros foi crucial para performance.

### 📚 Conhecimentos Adquiridos

-   **Arquitetura Backend:** Separação clara de responsabilidades
-   **Segurança:** Implementação robusta de JWT e autorização
-   **DevOps:** Pipeline completo de CI/CD com testes automatizados
-   **Banco de Dados:** Modelagem, índices e otimização de queries
-   **Frontend Moderno:** Next.js 15 com App Router e TypeScript

---

## 📬 Contato

### 👨‍💻 Desenvolvedores

**Felipe Laudano**

-   🌐 [LinkedIn](https://www.linkedin.com/in/felipe-laudano/)
-   🐙 [GitHub](https://github.com/fdal-felipe)
-   ✉️ **Email:** fdal.felipe@gmail.com

### 🤝 Contribuições

Contribuições são bem-vindas! Siga o processo:

1. **Fork** o repositório
2. **Clone** sua fork
3. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request

### 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

### 🙏 Agradecimentos

-   **FIAP** - Pela excelente estrutura do curso
-   **Comunidade Open Source** - Pelas tecnologias incríveis
-   **Render & Supabase** - Pela infraestrutura gratuita
-   **GitHub** - Pela plataforma de desenvolvimento colaborativo

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

</div>

---
