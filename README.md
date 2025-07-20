# Ensinai Blog Educacional - Node.js & PostgreSQL

Projeto desenvolvido como parte do **Tech Challenge** do curso Fullstack, com foco na criação de uma API de blogging educacional para professores e alunos da rede pública, utilizando Node.js, Express e PostgreSQL.

## 🎯 Objetivo

Criar uma aplicação backend funcional, permitindo:

- Professores(as) criarem, editarem, listarem e excluírem postagens.
- Alunos(as) visualizarem a lista de posts e acessarem o conteúdo completo de cada postagem.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/) & [Supertest](https://github.com/visionmedia/supertest)
- [Draw.io](https://draw.io/) (modelagem do banco)

---

## ✅ Funcionalidades

### Área do Aluno
- Visualizar lista de postagens (`GET /posts`)
- Ler o conteúdo completo de uma postagem (`GET /posts/:id`)
- Buscar posts por palavra-chave (`GET /posts/search?q=palavra`)

### Área do Professor (Admin)
- Criar postagens (`POST /posts`)
- Editar postagens existentes (`PUT /posts/:id`)
- Listar todas as postagens (`GET /posts`)
- Excluir postagens (`DELETE /posts/:id`)

---

## 📦 Estrutura do Projeto

```
├── docker-compose.yml         # Orquestração dos containers (app e banco)
├── Dockerfile                 # Build da imagem Node.js
├── .env / .env.example        # Variáveis de ambiente
├── package.json               # Dependências e scripts
├── src/
│   ├── server.js              # Inicialização do servidor Express
│   ├── app.js                 # Configuração principal do app
│   ├── controllers/           # Lógica dos endpoints
│   ├── models/                # Modelos de dados
│   ├── db/                    # Conexão e migração do banco
│   └── routes/                # Rotas da API
├── tests/                     # Testes automatizados (Jest/Supertest)
├── postgres-init/             # Scripts de inicialização do banco
├── swagger.config.js          # Configuração da documentação Swagger
├── requests-dev.http          # Exemplos de requisições para desenvolvimento
├── requests-prod.http         # Exemplos de requisições para produção
└── resources/                 # Diagramas e documentação extra
```

---

## 🚀 Como Executar Localmente

1. **Pré-requisitos:**
   - Docker instalado
   - Node.js >= 18 (para desenvolvimento local sem Docker)

2. **Configuração do ambiente:**
   - Copie `.env.example` para `.env` e preencha com suas credenciais locais.

3. **Subir com Docker:**
   ```bash
   docker-compose up --build
   ```
   - O backend estará disponível em `http://localhost:3000`.
   - O banco PostgreSQL estará disponível em `localhost:5432`.

4. **Rodar localmente (sem Docker):**
   ```bash
   npm install
   npm run dev
   ```

---

## 🧪 Testes Automatizados

- Os testes estão em `tests/` e usam Jest + Supertest.
- Para rodar os testes:
  ```bash
  npm test
  ```

---

## 📄 Documentação da API

- A documentação Swagger está disponível em `/api-docs` após subir o servidor.
- Configuração em `swagger.config.js`.
- Exemplos de requisições em `requests-dev.http` e `requests-prod.http`.

---

## 🗄️ Banco de Dados

- Scripts de inicialização em `postgres-init/init.sql`.
- Modelagem do banco em `resources/bd.drawio`.

---

## 📝 Observações

- As variáveis de ambiente nunca devem ser versionadas (`.env` está no `.gitignore`).
- Para produção, adapte as variáveis e endpoints conforme necessário.