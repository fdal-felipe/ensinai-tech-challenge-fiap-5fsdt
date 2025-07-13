-- ENUM para definir os papéis dos usuários.
-- 'professor' e 'aluno' são os papéis possíveis na plataforma.
CREATE TYPE IF NOT EXISTS user_role AS ENUM ('professor', 'aluno');

-- Tabela para armazenar os usuários da plataforma.
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela para armazenar as postagens do blog.
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_author
        FOREIGN KEY(author_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- --- ÍNDICES PARA OTIMIZAÇÃO DE BUSCAS ---

-- Cria um índice na chave estrangeira para acelerar joins e buscas por autor.
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);

-- Cria um índice GIN para Full-Text Search no título e conteúdo.
CREATE INDEX IF NOT EXISTS idx_posts_search ON posts USING gin(to_tsvector('portuguese', title || ' ' || content));