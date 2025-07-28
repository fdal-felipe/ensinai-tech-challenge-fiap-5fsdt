# API de Blog Educacional (Ensinai) - Tech Challenge Fase 2

Projeto desenvolvido como parte do **Tech Challenge** do curso de Pós-Graduação em Full Stack Development da FIAP, com foco na criação de uma API RESTful para uma aplicação de blogging educacional, utilizando Node.js, Express, PostgreSQL, Docker e um pipeline de CI/CD completo.

## 🎯 Objetivo

Criar uma aplicação backend robusta, escalável e bem documentada, permitindo:

-   Professores(as) criarem, editarem, listarem e excluírem postagens.
-   Alunos(as) visualizarem a lista de posts, acessarem o conteúdo completo de cada postagem e realizarem buscas inteligentes por conteúdo.

---

## 🛠️ Tecnologias Utilizadas

-   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **Testes:** [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)
-   **Containerização:** [Docker](https://www.docker.com/), Docker Compose
-   **Documentação da API:** [Swagger (OpenAPI)](https://swagger.io/)
-   **Validação:** [Express Validator](https://express-validator.github.io/)
-   **CI/CD:** [GitHub Actions](https://github.com/features/actions)
-   **Deploy (Produção):** [Render](https://render.com/)

---

## ✅ Funcionalidades

A API foi arquitetada com base em papéis de usuário, oferecendo endpoints distintos para gestão de usuários, para professores (gestão de conteúdo) e para alunos (visualização de conteúdo).

### Gestão de Usuários (`/users`)
-   `GET /users`: Lista todos os usuários.
-   `GET /users/:id`: Busca um usuário específico.
-   `POST /users`: Cria um novo usuário (professor ou aluno).
-   `PUT /users/:id`: Atualiza um usuário existente.
-   `DELETE /users/:id`: Deleta um usuário.

### Módulo do Professor (`/professor/posts`)
Endpoints com controle total sobre as postagens.
-   `GET /professor/posts`: Lista todas as postagens, independente do status.
-   `POST /professor/posts`: Cria uma nova postagem.
-   `PUT /professor/posts/:id`: Atualiza uma postagem, incluindo seu `status` (ativo/inativo).
-   `DELETE /professor/posts/:id`: Deleta uma postagem.
-   `GET /professor/posts/search?q=termo`: Realiza uma busca inteligente em todas as postagens.

### Módulo do Aluno (`/aluno/posts`)
Endpoints de leitura, com acesso apenas a postagens com `status = 'ativo'`.
-   `GET /aluno/posts`: Lista todas as postagens ativas.
-   `GET /aluno/posts/:id`: Busca uma postagem ativa específica.
-   `GET /aluno/posts/search?q=termo`: Realiza uma busca inteligente apenas em postagens ativas.

---

## 📂 Estrutura do Projeto

O repositório está organizado da seguinte forma para manter uma clara separação de responsabilidades:

```
├── .github/workflows/         # Arquivos de configuração do pipeline de CI/CD (GitHub Actions)
├── postgres-init/             # Scripts SQL para a inicialização do banco de dados
├── src/                       # Pasta principal com o código-fonte da aplicação
│   ├── controllers/           # Contém a lógica de negócio de cada rota
│   ├── db/                    # Configuração da conexão com o banco e script de migração
│   ├── routes/                # Definição das rotas da API
│   ├── app.js                 # Arquivo principal de configuração do Express (middlewares, rotas)
│   └── server.js              # Arquivo que inicia o servidor
├── tests/                     # Contém os testes automatizados com Jest e Supertest
├── .env.example               # Arquivo de exemplo para as variáveis de ambiente
├── docker-compose.yml         # Orquestração dos contêineres Docker para o ambiente local
├── Dockerfile                 # Receita para construir a imagem Docker da aplicação
├── jest.config.js             # Arquivo de configuração do Jest, define como os testes devem ser executados
├── package.json               # Manifesto do projeto Node.js, lista as dependências e scripts
├── package-lock.json          # "Trava" as versões exatas de todas as dependências para garantir instalações consistentes
├── requests-dev.http          # Requisições para testar a API em ambiente de desenvolvimento (localhost)
├── requests-prod.http         # Requisições para testar a API em produção (Render)
└── swagger.config.js          # Configuração da documentação Swagger
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
-   [Git](https://git-scm.com/downloads)
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Clonar o Repositório
```bash
git clone [https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt.git](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt.git)
cd ensinai-tech-challenge-fiap-5fsdt
```

### 3. Configurar Variáveis de Ambiente
Crie uma cópia do arquivo `.env.example`, renomeie para `.env` e preencha com as credenciais para o ambiente Docker local:
```env
DB_USER=userblog
DB_PASSWORD=passwordblog
DB_DATABASE=blogdb
DB_HOST=localhost
DB_PORT=5432
```

### 4. Subir os Contêineres com Docker Compose
```bash
docker-compose up --build
```
-   A API estará disponível em `http://localhost:3000`.
-   O banco de dados PostgreSQL estará acessível em `localhost:5432`.
-   Na primeira execução, o banco de dados será automaticamente criado pelo script em `postgres-init/init.sql`.

---

## 🔌 Conectando ao Banco de Dados Local com DBeaver

Com os contêineres rodando, você pode se conectar ao banco de dados para inspecionar os dados.

1.  **Nova Conexão:** No DBeaver, clique em `Database > New Database Connection` e selecione `PostgreSQL`.
2.  **Configurações:** Use as mesmas informações do seu arquivo `.env`:
    * **Host:** `localhost`
    * **Port:** `5432`
    * **Database:** `blogdb`
    * **Username:** `userblog`
    * **Password:** `passwordblog`
3.  **Testar e Conectar:** Clique em "Test Connection..." e depois em "Finish".

---

## 🧪 Testes Automatizados

A suíte de testes garante a qualidade da API.
-   **Para rodar os testes:**
    1.  Garanta que o contêiner do banco esteja no ar: `docker-compose up -d db`.
    2.  Execute o comando no seu terminal:
        ```bash
        npm test
        ```

---

## 📄 Documentação da API

A API está documentada com Swagger, gerando uma interface interativa.
-   **Para acessar a documentação:** Com a aplicação rodando, acesse `http://localhost:3000/api-docs` no seu navegador.

---

## ☁️ Automação (CI/CD) e Produção

O projeto está configurado com um pipeline de Integração e Implantação Contínua (CI/CD) usando GitHub Actions.

-   **CI:** A cada `push` ou `pull request` na branch `main`, o workflow executa a suíte de testes (`npm test`) para validar o código.
-   **CD:** Se os testes passarem, o workflow dispara um "Deploy Hook" no Render, publicando a nova versão em produção.
-   **API em Produção:** `https://blog-api-prod-mcw6.onrender.com`
-   **Documentação em Produção:** `https://blog-api-prod-mcw6.onrender.com/api-docs`

---

## 💡 Relato de Experiências e Desafios

Durante o desenvolvimento, enfrentamos desafios significativos que contribuíram para um grande aprendizado:
-   **Configuração do Ambiente de Testes:** A integração do Jest com um banco de dados em Docker exigiu uma configuração cuidadosa das variáveis de ambiente (`.env` vs. `ci.yml`) e do ciclo de vida da conexão com o banco.
-   **Pipeline de CI/CD:** Garantir que o banco de dados fosse corretamente inicializado no ambiente do GitHub Actions foi um desafio, resolvido com o uso do `psql` nativo para executar o script de setup do banco.
-   **Busca Inteligente no PostgreSQL:** A implementação da busca "fuzzy" com tolerância a erros de digitação nos levou a estudar e implementar extensões do PostgreSQL como `unaccent` e `pg_trgm`, além de entender o funcionamento de índices GIN e funções como `similarity()`.
-   **Evolução do Esquema em Produção:** Após o deploy inicial, novas alterações no banco de dados (como a adição da extensão `pg_trgm`) não eram aplicadas automaticamente. Aprendemos a importância de realizar "migrações" manuais em bancos já existentes para sincronizá-los com as novas versões do código.