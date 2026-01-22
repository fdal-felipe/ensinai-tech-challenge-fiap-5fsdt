-- 1. Ativa as extensões necessárias
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Cria uma função "wrapper" imutável para a unaccent
CREATE OR REPLACE FUNCTION public.f_unaccent(text)
RETURNS text AS $$
SELECT unaccent($1)
$$ LANGUAGE sql IMMUTABLE;

-- 3. Cria o tipo ENUM
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('professor', 'aluno');
    END IF;
END$$;

-- 4. Cria as tabelas
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_author
        FOREIGN KEY(author_id)
        REFERENCES public.users(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.comentarios (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_post
        FOREIGN KEY(post_id)
        REFERENCES public.posts(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES public.users(id)
        ON DELETE CASCADE
);

-- 5. Cria os índices
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_post_id ON public.comentarios(post_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_user_id ON public.comentarios(user_id);

DROP INDEX IF EXISTS idx_posts_search;
CREATE INDEX idx_posts_search ON public.posts USING gin (public.f_unaccent(title || ' ' || content) gin_trgm_ops);