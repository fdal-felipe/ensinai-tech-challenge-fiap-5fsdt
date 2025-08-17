# CONTEXT.md

## Visão Geral

Este projeto é uma aplicação de blogging educacional desenvolvida para o Tech Challenge FIAP (5FSDT), composta por backend (Node.js/Express/PostgreSQL) e frontend (Next.js/React/TypeScript), com integração Docker e CI/CD via GitHub Actions.

## Instruções para Ferramentas de IA

**IMPORTANTE:** Ao trabalhar neste projeto, siga estas diretrizes:

- **Idioma:** Sempre responda em **Português do Brasil**
- **Expertise:** Atue como especialista nas tecnologias utilizadas neste projeto (Node.js, Express, PostgreSQL, Next.js, React, TypeScript, Docker, GitHub Actions)
- **Sinceridade:** Se não souber algo ou tiver dúvidas, seja transparente e honesto
- **Contexto:** Use as informações deste documento para entender a arquitetura e propósito do projeto
- **Boas Práticas:** Sempre sugira soluções seguindo as melhores práticas das tecnologias envolvidas

## Backend

-   **Stack:** Node.js, Express, PostgreSQL, Docker
-   **Funcionalidades:**
    -   Professores podem criar, editar, listar e excluir posts.
    -   Alunos podem visualizar posts ativos e buscar por conteúdo.
    -   Gestão de usuários com autenticação JWT.
-   **Estrutura:**
    -   `src/controllers/`: lógica dos endpoints (posts, usuários, autenticação)
    -   `src/routes/`: rotas RESTful separadas por papel (professor, aluno, usuário, auth)
    -   `src/db/`: conexão e migração do banco
    -   `src/middleware/auth.js`: validação JWT
    -   `postgres-init/`: scripts SQL para inicialização do banco (inclui tipos, tabelas, índices e extensões)
    -   Testes automatizados com Jest e Supertest em `tests/`
-   **Documentação:** Swagger configurado em `swagger.config.js`
-   **Variáveis de ambiente:** `.env` e `.env.example`
-   **Docker:** `Dockerfile` para build e execução, integrado ao `docker-compose.yml`
-   **CI/CD:** Pipeline no GitHub Actions (`.github/workflows/ci.yml`) com build, testes e deploy automático.

## Frontend

-   **Stack:** Next.js 15, React 19, TypeScript, TailwindCSS 4
-   **Funcionalidades:** Interface para visualização e interação com o conteúdo do blog.
-   **Estrutura:**
    -   `src/app/`: páginas, layout, estilos globais (App Router)
    -   `public/`: assets estáticos
    -   Configurações: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`
-   **Docker:** Dockerfile para build e execução do frontend.

## Testes

-   **Backend:** Testes de endpoints REST (professor, aluno, usuário) usando Jest/Supertest
-   **CI/CD:** Testes executados automaticamente no pipeline antes do deploy
-   **Configuração:** Jest configurado em `jest.config.js` com setup em `src/tests/setup.ts`

## Banco de Dados

-   **PostgreSQL:** Scripts de inicialização criam extensões (`unaccent`, `pg_trgm`), tipos ENUM, tabelas (`users`, `posts`), índices e funções auxiliares para busca textual.

## Deploy

-   **Produção:** Backend hospedado no Render, banco de dados hospeado no Supabase e frontend pode ser hospedado em Vercel ou similar.
-   **Pipeline:** CI/CD automatizado para build, testes e deploy.

## Como usar este contexto

Utilize este documento para fornecer informações essenciais sobre arquitetura, tecnologias, estrutura de pastas, fluxo de CI/CD, e principais funcionalidades do projeto. Ferramentas de IA podem usar este contexto para responder dúvidas, sugerir melhorias, gerar código ou auxiliar na resolução de problemas relacionados ao projeto.

---
