# API de Blog Educacional - Tech Challenge Fase 2

Projeto desenvolvido como parte do **Tech Challenge** do curso de Pós-Graduação em Full Stack Development, com foco na criação de uma API RESTful para uma aplicação de blogging educacional, utilizando Node.js, Express, PostgreSQL, Docker e um pipeline de CI/CD completo.

## 🎯 Objetivo

Criar uma aplicação backend robusta, escalável e bem documentada, permitindo:

-   Professores(as) criarem, editarem, listarem e excluírem postagens.
-   Alunos(as) e professores(as) visualizarem a lista de posts, acessarem o conteúdo completo de cada postagem e realizarem buscas inteligentes por conteúdo.

---

## 🛠️ Tecnologias Utilizadas

-   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **Testes:** [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)
-   **Containerização:** [Docker](https://www.docker.com/), Docker Compose
-   **Documentação da API:** [Swagger (OpenAPI)](https://swagger.io/)
-   **CI/CD:** [GitHub Actions](https://github.com/features/actions)
-   **Deploy (Produção):** [Render](https://render.com/)

---

## ✅ Funcionalidades

A API conta com um CRUD completo para o recurso de postagens e uma busca inteligente.

-   `GET /posts`: Lista todas as postagens.
-   `GET /posts/:id`: Busca uma postagem específica por seu ID.
-   `POST /posts`: Cria uma nova postagem.
-   `PUT /posts/:id`: Atualiza uma postagem existente.
-   `DELETE /posts/:id`: Deleta uma postagem.
-   `GET /posts/search?q=termo`: Realiza uma busca por palavra-chave no título e conteúdo dos posts, com suporte a prefixos e tolerância a erros de digitação (fuzzy search).

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 1. Pré-requisitos

Garanta que você tenha os seguintes softwares instalados:
-   [Git](https://git-scm.com/downloads)
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Clonar o Repositório

```bash
git clone [https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt.git](https://github.com/fdal-felipe/ensinai-tech-challenge-fiap-5fsdt.git)
cd ensinai-tech-challenge-fiap-5fsdt
```

### 3. Configurar Variáveis de Ambiente

O projeto utiliza um arquivo `.env` para gerenciar as credenciais do banco de dados.

1.  Crie uma cópia do arquivo de exemplo `.env.example` e renomeie-a para `.env`.
2.  Abra o arquivo `.env` e preencha com as credenciais para o ambiente Docker local:

    ```env
    # Credenciais do Banco de Dados para Desenvolvimento Local
    DB_USER=userblog
    DB_PASSWORD=passwordblog
    DB_DATABASE=blogdb
    DB_HOST=localhost
    DB_PORT=5432
    ```

### 4. Subir os Contêineres com Docker Compose

Com as variáveis configuradas, o Docker Compose irá orquestrar todo o ambiente para você.

```bash
docker-compose up --build
```

-   A API estará disponível em `http://localhost:3000`.
-   O banco de dados PostgreSQL estará acessível em `localhost:5432`.
-   Na primeira execução, o banco de dados será automaticamente criado e populado com as tabelas necessárias pelo script em `postgres-init/init.sql`.

---

## 🧪 Testes Automatizados

A suíte de testes foi construída com Jest e Supertest para garantir a qualidade e a estabilidade da API.

-   **Para rodar os testes:**
    1.  Garanta que o contêiner do banco de dados esteja no ar: `docker-compose up -d db`.
    2.  Execute o comando de teste no seu terminal:
        ```bash
        npm test
        ```

---

## 📄 Documentação da API

A API está documentada utilizando o padrão OpenAPI (Swagger), gerando uma interface interativa.

-   **Para acessar a documentação:** Com a aplicação rodando, acesse `http://localhost:3000/api-docs` no seu navegador.

Lá, você pode visualizar todos os endpoints, seus parâmetros, schemas e testá-los em tempo real.

---

## ☁️ Automação (CI/CD) e Produção

O projeto está configurado com um pipeline de Integração e Implantação Contínua (CI/CD) usando GitHub Actions.

-   **Integração Contínua (CI):** A cada `push` ou `pull request` na branch `main`, o workflow definido em `.github/workflows/ci.yml` é acionado. Ele cria um ambiente de teste, inicializa um banco de dados e executa a suíte de testes (`npm test`) para garantir que nenhuma alteração quebrou a aplicação.

-   **Implantação Contínua (CD):** Se os testes passarem na etapa de CI, o workflow automaticamente dispara um "Deploy Hook" no Render, que publica a nova versão da aplicação em produção.

-   **Aplicação em Produção:**
    -   A API está disponível publicamente no Render: **[COLOQUE AQUI O LINK DA SUA API NO RENDER]**
    -   A documentação em produção está em: **[LINK DA API]/api-docs**

---

## 💡 Relato de Experiências e Desafios

Durante o desenvolvimento, enfrentamos desafios significativos que contribuíram para um grande aprendizado:
-   **Configuração do Ambiente de Testes:** A integração do Jest com um banco de dados rodando em Docker exigiu uma configuração cuidadosa das variáveis de ambiente (`.env` vs. `ci.yml`) e do ciclo de vida da conexão com o banco.
-   **Pipeline de CI/CD:** Garantir que o banco de dados fosse corretamente inicializado no ambiente efêmero do GitHub Actions foi um desafio. A solução foi evoluir de um script Node.js para o uso do `psql` nativo, que se mostrou mais robusto.
-   **Busca Inteligente no PostgreSQL:** A implementação da busca "fuzzy" com tolerância a erros de digitação nos levou a estudar e implementar extensões do PostgreSQL como `unaccent` e `pg_trgm`, além de entender o funcionamento de índices GIN e funções como `similarity()`.