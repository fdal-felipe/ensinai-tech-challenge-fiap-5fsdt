# Backend API - Plataforma Educacional Ensinai 🔧📚

> API RESTful para gestão de posts educacionais, usuários e comentários, com suporte a IA generativa. Desenvolvida com **Node.js**, **Express** e **PostgreSQL**.

[![Node.js Version](https://img.shields.io/badge/node-18+-brightgreen?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-30-C21325?logo=jest)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)

---

## 📋 Índice

- [🎯 Objetivo](#-objetivo)
- [🏗️ Arquitetura](#️-arquitetura)
- [🛠️ Tecnologias](#️-tecnologias)
- [📂 Estrutura](#-estrutura)
- [⚙️ Configuração](#️-configuração)
- [🚀 Execução](#-execução)
- [📡 API Endpoints](#-api-endpoints)
- [🔒 Autenticação](#-autenticação)
- [🤖 Agente de IA](#-agente-de-ia)
- [💬 Comentários](#-comentários)
- [🔍 Busca Avançada](#-busca-avançada)
- [🗄️ Banco de Dados](#️-banco-de-dados)
- [🧪 Testes](#-testes)
- [🐳 Docker](#-docker)
- [📮 Insomnia](#-insomnia)
- [☁️ Deploy](#️-deploy)

---

## 🎯 Objetivo

API backend que serve como núcleo da plataforma educacional Ensinai, fornecendo:

- ✅ **CRUD completo** de posts educacionais
- ✅ **Gestão de usuários** (professores e alunos)
- ✅ **Sistema de comentários** em posts
- ✅ **Autenticação JWT** com controle de acesso por roles
- ✅ **Agente de IA** para geração e análise de conteúdo
- ✅ **Busca inteligente** com suporte a acentos e relevância
- ✅ **Documentação automática** via Swagger/OpenAPI

### Separação por Papéis

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/auth/*` | 🌐 Público | Registro e login |
| `/aluno/posts/*` | 🌐 Público | Visualização de posts ativos |
| `/professor/posts/*` | 🔒 Professor | Gestão completa de posts |
| `/users/*` | 🔒 Autenticado | Gestão de usuários |
| `/posts/:id/comments/*` | 🌐 Público | Sistema de comentários |
| `/ai/*` | 🔒 Autenticado | Funcionalidades de IA |

---

## 🏗️ Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │     │   Backend API   │     │   PostgreSQL    │
│   (Next.js)     │────►│   (Express.js)  │────►│   (Docker)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │
         │              ┌───────┴───────┐
         │              │               │
┌────────▼────────┐     │      JWT      │
│   Mobile        │     │   Auth        │
│   (React Native)│─────┘               │
└─────────────────┘                     │
                                ┌───────▼───────┐
                                │   AI Service  │
                                │   (Mock/API)  │
                                └───────────────┘
```

### Estrutura MVC

```
Request → Routes → Middleware (Auth) → Controller → Database → Response
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Node.js](https://nodejs.org/) | 18+ | Runtime JavaScript |
| [Express](https://expressjs.com/) | 5.1.0 | Framework web minimalista |
| [PostgreSQL](https://www.postgresql.org/) | 15+ | Banco de dados relacional |
| [pg](https://node-postgres.com/) | 8.16.3 | Cliente PostgreSQL para Node.js |
| [JWT](https://jwt.io/) | 9.0.2 | Autenticação via tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 3.0.2 | Hash de senhas |
| [Swagger](https://swagger.io/) | 6.2.8 | Documentação da API |
| [Jest](https://jestjs.io/) | 30.0.4 | Framework de testes |
| [Supertest](https://github.com/visionmedia/supertest) | 7.1.3 | Testes de integração HTTP |
| [Docker](https://www.docker.com/) | - | Containerização |

---

## 📂 Estrutura

```
📁 backend/
├── 📁 src/
│   ├── 📄 app.js                    # Configuração do Express
│   ├── 📄 server.js                 # Entry point da aplicação
│   ├── 📁 controllers/              # Lógica de negócio
│   │   ├── 📄 aiController.js       # Funcionalidades de IA
│   │   ├── 📄 alunoPostsController.js
│   │   ├── 📄 authController.js
│   │   ├── 📄 commentsController.js # CRUD de comentários
│   │   ├── 📄 professorPostsController.js
│   │   └── 📄 usersController.js
│   ├── 📁 routes/                   # Definição das rotas
│   │   ├── 📄 ai.js                 # Rotas de IA
│   │   ├── 📄 alunoPosts.js
│   │   ├── 📄 auth.js
│   │   ├── 📄 comments.js           # Rotas de comentários
│   │   ├── 📄 professorPosts.js
│   │   └── 📄 users.js
│   ├── 📁 middleware/               # Middlewares
│   │   └── 📄 auth.js               # Autenticação JWT
│   └── 📁 db/                       # Conexão com banco
│       ├── 📄 index.js              # Pool de conexões
│       ├── 📄 migrate.js            # Migrações automáticas
│       └── 📄 seed.js               # Dados de seed
├── 📁 tests/                        # Testes automatizados
│   ├── 📄 posts.test.js
│   └── 📄 setup.js
├── 📁 postgres-init/                # Scripts SQL
│   ├── 📄 init.sql                  # Inicialização (produção)
│   └── 📄 init.ci.sql               # Inicialização (CI/CD)
├── 📁 resources/                    # Recursos do projeto
│   └── 📄 bd.drawio                 # Diagrama do banco
├── 📄 docker-compose.yml            # Orquestração local
├── 📄 Dockerfile                    # Container da aplicação
├── 📄 package.json                  # Dependências
├── 📄 swagger.config.js             # Configuração Swagger
├── 📄 jest.config.js                # Configuração Jest
├── 📄 test-api.js                   # Script de testes automatizados
├── 📄 test-api.http                 # Requisições HTTP para testes
├── 📄 Insomnia_Collection_ready.json # Coleção Insomnia
├── 📄 requests-dev.http             # Requisições de teste (dev)
└── 📄 requests-prod.http            # Requisições de teste (prod)
```

---

## ⚙️ Configuração

### Pré-requisitos

- **Node.js 18+**
- **Docker & Docker Compose** (recomendado)
- **PostgreSQL 15+** (ou via Docker)

### 1️⃣ Instalar Dependências

```bash
cd backend
npm install
```

### 2️⃣ Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```bash
# Banco de Dados PostgreSQL
DB_USER=ensinai_user
DB_PASSWORD=ensinai_password
DB_DATABASE=ensinai_db
DB_HOST=localhost      # ou "postgres" se usar docker-compose
DB_PORT=5432

# Autenticação JWT
JWT_SECRET=sua_chave_secreta_super_forte_aqui

# Ambiente
NODE_ENV=development
PORT=3000
```

---

## 🚀 Execução

### Com Docker (Recomendado) 🐳

```bash
# Iniciar PostgreSQL + App
docker-compose up --build -d

# Verificar containers
docker ps
# Esperado: ensinai_postgres (healthy) e ensinai_app (running)

# Ver logs
docker logs ensinai_app -f
```

### Sem Docker (Desenvolvimento)

```bash
# Certifique-se que o PostgreSQL está rodando localmente

# Com hot-reload (nodemon)
npm run dev

# Ou diretamente
node src/server.js
```

### Acessos

| Serviço | URL |
|---------|-----|
| API | http://localhost:3000 |
| Swagger UI | http://localhost:3000/api-docs |

---

## 📡 API Endpoints

### Autenticação (`/auth`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/auth/register` | Registra novo usuário | 🌐 |
| `POST` | `/auth/login` | Login (retorna JWT) | 🌐 |

#### Exemplo: Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "professor@email.com", "password": "senha123"}'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "role": "professor",
  "user": {
    "id": 1,
    "name": "Professor",
    "email": "professor@email.com"
  }
}
```

---

### Posts de Aluno (`/aluno/posts`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/aluno/posts` | Lista posts ativos | 🌐 |
| `GET` | `/aluno/posts/:id` | Busca post por ID | 🌐 |
| `GET` | `/aluno/posts/search?q=termo` | Busca por palavra-chave | 🌐 |

---

### Posts de Professor (`/professor/posts`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/professor/posts` | Lista todos os posts | 🔒 |
| `POST` | `/professor/posts` | Cria novo post | 🔒 |
| `GET` | `/professor/posts/:id` | Busca post por ID | 🔒 |
| `PUT` | `/professor/posts/:id` | Atualiza post | 🔒 |
| `DELETE` | `/professor/posts/:id` | Remove post | 🔒 |
| `GET` | `/professor/posts/search?q=termo` | Busca por palavra-chave | 🔒 |

#### Exemplo: Criar Post

```bash
curl -X POST http://localhost:3000/professor/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "title": "Introdução à Matemática",
    "content": "Conteúdo educacional sobre matemática básica...",
    "author_id": 1
  }'
```

---

### Usuários (`/users`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/users` | Lista todos os usuários | 🔒 |
| `POST` | `/users` | Cria novo usuário | 🔒 |
| `GET` | `/users/:id` | Busca usuário por ID | 🔒 |
| `PUT` | `/users/:id` | Atualiza usuário | 🔒 |
| `DELETE` | `/users/:id` | Remove usuário | 🔒 |

---

## 🔒 Autenticação

### JWT (JSON Web Token)

A API utiliza JWT para autenticação. O token deve ser enviado no header `Authorization`:

```
Authorization: Bearer <token>
```

### Fluxo de Autenticação

```
1. POST /auth/register → Cria conta
2. POST /auth/login → Recebe token JWT
3. Incluir token no header das requisições protegidas
4. Token válido por 1 hora
```

### Middleware de Autenticação

```javascript
// Verifica se o token é válido
exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
};

// Verifica se o usuário é professor
exports.authorizeProfessor = (req, res, next) => {
    if (req.user.role !== 'professor') {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
};
```

### Roles (Papéis)

| Role | Permissões |
|------|------------|
| `professor` | CRUD completo de posts e usuários, acesso à IA |
| `aluno` | Visualização de posts ativos, comentários |

---

## 🤖 Agente de IA

O backend inclui um agente de IA para auxiliar na criação de conteúdo educacional.

### Endpoints de IA (`/ai`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/ai/generate` | Gera sugestão de conteúdo | 🔒 |
| `POST` | `/ai/analyze` | Analisa post e gera insights | 🔒 |
| `POST` | `/ai/moderate` | Modera conteúdo | 🔒 |
| `POST` | `/ai/respond` | Gera resposta automática | 🔒 |

### Exemplo: Gerar Conteúdo

```bash
curl -X POST http://localhost:3000/ai/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"topic": "Fotossíntese para 6º ano"}'
```

**Resposta:**
```json
{
  "title": "A Magia das Plantas: Entendendo a Fotossíntese",
  "content": "<p>Você já se perguntou como as plantas se alimentam?...</p>",
  "tags": ["ciências", "biologia", "fotossíntese"]
}
```

### Exemplo: Analisar Post

```bash
curl -X POST http://localhost:3000/ai/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "title": "Matemática Básica",
    "content": "Conteúdo sobre números e operações..."
  }'
```

**Resposta:**
```json
{
  "summary": "Resumo do conteúdo...",
  "tags": ["matemática", "números"],
  "topics": ["aritmética", "operações básicas"],
  "readability": "Adequado para ensino fundamental"
}
```

> **Nota:** Os endpoints de IA atualmente usam mocks. Para integrar com OpenAI/Gemini, edite `src/controllers/aiController.js`.

---

## 💬 Comentários

Sistema de comentários em posts educacionais.

### Endpoints de Comentários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/posts/:postId/comments` | Lista comentários do post | 🌐 |
| `GET` | `/posts/:postId/comments/:commentId` | Busca comentário específico | 🌐 |
| `POST` | `/posts/:postId/comments` | Cria comentário | 🌐 |
| `PUT` | `/comments/:id` | Atualiza comentário | 🌐 |
| `DELETE` | `/comments/:id` | Remove comentário | 🌐 |

### Exemplo: Criar Comentário

```bash
curl -X POST http://localhost:3000/posts/1/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Ótimo conteúdo! Muito didático.",
    "author_id": 2
  }'
```

---

## 🔍 Busca Avançada

O sistema utiliza recursos avançados do PostgreSQL para busca inteligente:

### Características

- **Busca sem acentos**: "matematica" encontra "Matemática"
- **Busca por similaridade**: Ordenação por relevância
- **Full-text search**: Busca em título e conteúdo

### Extensões PostgreSQL

```sql
-- Extensões utilizadas
CREATE EXTENSION IF NOT EXISTS unaccent;  -- Remove acentos
CREATE EXTENSION IF NOT EXISTS pg_trgm;   -- Similaridade de texto

-- Índice otimizado para busca
CREATE INDEX idx_posts_search ON posts 
USING gin (f_unaccent(title || ' ' || content) gin_trgm_ops);
```

---

## 🗄️ Banco de Dados

### Diagrama ER

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     users       │       │     posts       │       │    comments     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ PK id           │◄──────│ FK author_id    │       │ PK id           │
│    name         │       │ PK id           │◄──────│ FK post_id      │
│    email        │       │    title        │       │ FK author_id    │
│    password_hash│       │    content      │       │    content      │
│    role         │       │    status       │       │    created_at   │
│    created_at   │       │    image_url    │       │    updated_at   │
│    updated_at   │       │    created_at   │       └─────────────────┘
└─────────────────┘       │    updated_at   │
                          └─────────────────┘
```

### Tabela `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | SERIAL | Chave primária |
| `name` | VARCHAR(255) | Nome do usuário |
| `email` | VARCHAR(255) | E-mail (único) |
| `password_hash` | VARCHAR(255) | Senha hasheada (bcrypt) |
| `role` | ENUM | `'professor'` ou `'aluno'` |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `updated_at` | TIMESTAMPTZ | Data de atualização |

### Tabela `posts`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | SERIAL | Chave primária |
| `title` | VARCHAR(255) | Título do post |
| `content` | TEXT | Conteúdo do post |
| `author_id` | INTEGER | FK para users |
| `status` | VARCHAR(20) | `'ativo'` ou `'inativo'` |
| `image_url` | TEXT | URL da imagem (opcional) |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `updated_at` | TIMESTAMPTZ | Data de atualização |

### Tabela `comments`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | SERIAL | Chave primária |
| `post_id` | INTEGER | FK para posts |
| `author_id` | INTEGER | FK para users |
| `content` | TEXT | Conteúdo do comentário |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `updated_at` | TIMESTAMPTZ | Data de atualização |

### Seed de Dados

Para popular o banco com dados de exemplo:

```bash
node src/db/seed.js
```

Usuários criados pelo seed:

| Email | Senha | Role |
|-------|-------|------|
| professor@mail.com | 123456 | professor |
| professor_teste@mail.com | senha_teste123 | professor |
| nicholasgerade@gmail.com | 123456 | aluno |

---

## 🧪 Testes

### Testes com Jest

```bash
# Todos os testes
npm test

# Com coverage
npm test -- --coverage

# Modo watch
npm test -- --watch
```

### Script de Testes Automatizados

O projeto inclui um script que testa todos os endpoints:

```bash
# Certifique-se que a API está rodando
node test-api.js
```

O script:
1. Registra um usuário de teste
2. Faz login e obtém token
3. Testa todos os endpoints (posts, users, comments, AI)
4. Exibe resumo de testes passados/falhados

### Estrutura dos Testes

Os testes Jest cobrem:

- ✅ Endpoints de Professor (`/professor/posts`)
- ✅ Endpoints de Aluno (`/aluno/posts`)
- ✅ Endpoints de Usuários (`/users`)
- ✅ Autenticação e autorização
- ✅ Validações de entrada
- ✅ Casos de erro (404, 400, 403)

---

## 🐳 Docker

### Docker Compose (Local)

O backend possui seu próprio `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: ensinai_postgres
    environment:
      POSTGRES_USER: ${DB_USER:-ensinai_user}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-ensinai_password}
      POSTGRES_DB: ${DB_DATABASE:-ensinai_db}
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-ensinai_user}"]

  app:
    build: .
    container_name: ensinai_app
    ports:
      - "3000:3000"
    environment:
      DB_HOST: postgres
      # ...outras variáveis
    depends_on:
      postgres:
        condition: service_healthy
```

### Comandos Docker

```bash
# Iniciar tudo
docker-compose up --build -d

# Ver logs
docker logs ensinai_app -f

# Parar tudo
docker-compose down

# Limpar volumes (reset do banco)
docker-compose down -v
```

### Dockerfile (Multi-stage)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY ./src ./src
EXPOSE 3000
CMD ["node", "src/server.js"]
```

---

## 📮 Insomnia

O projeto inclui uma coleção pronta para o Insomnia.

### Importar Coleção

1. Abra o **Insomnia**
2. Vá em **File → Import → From File**
3. Selecione `Insomnia_Collection_ready.json`

### Configurar Environment

1. Abra o Environment **Development**
2. Configure:
   - `base_url`: `http://localhost:3000`
   - `token`: Cole o JWT obtido no login

### Grupos de Requests

| Grupo | Descrição |
|-------|-----------|
| 🔐 Autenticação | Register, Login |
| 👤 Users | CRUD de usuários |
| 📝 Posts (Professor) | CRUD completo |
| 📖 Posts (Aluno) | Listagem e busca |
| 💬 Comments | Sistema de comentários |
| 🤖 AI | Endpoints de IA |

---

## ☁️ Deploy

### Render

A aplicação está deployada no [Render](https://render.com/).

**URL de Produção:** https://blog-api-prod-mcw6.onrender.com

**Swagger:** https://blog-api-prod-mcw6.onrender.com/api-docs

### Variáveis de Ambiente (Produção)

| Variável | Descrição |
|----------|-----------|
| `DB_USER` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `DB_DATABASE` | Nome do banco |
| `DB_HOST` | Host do banco (Supabase) |
| `DB_PORT` | Porta do banco (5432) |
| `JWT_SECRET` | Chave secreta para JWT |
| `NODE_ENV` | `production` |
| `RENDER_EXTERNAL_URL` | URL do deploy |

---

## 🐛 Troubleshooting

### Problemas Comuns

| Erro | Solução |
|------|---------|
| `401 Unauthorized` | Verifique se o token foi copiado corretamente |
| `404 Not Found` | Confira a URL e se a rota existe |
| `500 Internal Server Error` | Verifique os logs: `docker logs ensinai_app` |
| Docker não inicia | Certifique-se que Docker Desktop está rodando |
| Banco não conecta | Verifique se o container postgres está healthy |

### Verificar Logs

```bash
# Logs da aplicação
docker logs ensinai_app -f

# Logs do PostgreSQL
docker logs ensinai_postgres -f
```

---

## 📚 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `nodemon src/server.js` | Inicia com hot-reload |
| `test` | `jest` | Executa testes |
| `seed` | `node src/db/seed.js` | Popula banco com dados |
| `test-api` | `node test-api.js` | Testes automatizados |

---

## 📬 Suporte

Em caso de dúvidas ou problemas, consulte a [documentação principal do projeto](../README.md) ou abra uma issue no repositório.

---

<p align="center">
  <b>Ensinai</b> - Transformando a educação com tecnologia 🎓
</p>
