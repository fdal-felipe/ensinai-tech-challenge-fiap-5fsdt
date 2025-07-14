-- 1. Ativa as extensões necessárias
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Cria uma função "wrapper" imutável para a unaccent
CREATE OR REPLACE FUNCTION f_unaccent(text)
RETURNS text AS $$
SELECT unaccent('unaccent', $1)
$$ LANGUAGE sql IMMUTABLE;

-- 3. Cria o tipo ENUM
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('professor', 'aluno');
    END IF;
END$$;

-- 4. Cria as tabelas
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

-- 5. Cria os índices
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);

DROP INDEX IF EXISTS idx_posts_search;
CREATE INDEX idx_posts_search ON posts USING gin (f_unaccent(title || ' ' || content) gin_trgm_ops);