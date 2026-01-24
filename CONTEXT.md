# CONTEXT.md

## Visão Geral

Este projeto é uma aplicação de blogging educacional desenvolvida para o Tech Challenge FIAP (5FSDT). 
- **Fase 3:** Backend (Node.js/Express) + Frontend Web (Next.js).
- **Fase 4 (Atual):** Transformação em Aplicação Mobile utilizando (React Native/Expo).

## Instruções para Ferramentas de IA

**IMPORTANTE:** Ao trabalhar neste projeto, siga estas diretrizes:

- **Idioma:** Sempre responda em **Português do Brasil**
- **Expertise:** Especialista em Node.js, Express, PostgreSQL, Next.js, React, React Native (Expo), TypeScript, Docker, GitHub Actions.
- **Sinceridade:** Transparência total sobre dúvidas ou limitações.
- **Boas Práticas:** Padrões industriais, Clean Code e UX/UI Mobile premium.

## Backend (Base)

-   **Stack:** Node.js, Express, PostgreSQL, Docker
-   **Funcionalidades:** CRUD de posts, gestão de usuários (papéis: professor/aluno), busca avançada (unaccent/trgm), autenticação JWT.
-   **Estrutura:** `src/controllers/`, `src/routes/`, `src/db/`, `postgres-init/`.

## Mobile (Fase 4 - Foco Nicholas)

-   **Stack:** React Native, Expo (Managed Workflow), Expo Router, TypeScript.
-   **Navegação:** React Navigation (Tabs + Stack) via Expo Router.
-   **Persistência:** `expo-secure-store` para JWT.
-   **Módulo Nicholas:**
    -   **Listagem de Posts:** Tela principal com busca funcional e filtros por papel (Aluno vê ativos, Professor vê todos).
    -   **Leitura de Post:** Tela de detalhes completa.
    -   **Melhoria:** Suporte a imagens no corpo da postagem.

## Testes e CI/CD

-   **Backend:** Jest/Supertest.
-   **Mobile:** Preparação para testes de componente/integração.
-   **Pipeline:** GitHub Actions para CI/CD (Backend e Web).

## Como usar este contexto

Utilize este documento para manter o alinhamento sobre as responsabilidades de Nicholas na Fase 4 e a integração com os serviços existentes desenvolvidos nas fases anteriores.

---
