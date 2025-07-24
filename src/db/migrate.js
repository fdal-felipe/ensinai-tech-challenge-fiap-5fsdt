const db = require("./index");
const fs = require("fs");
const path = require("path");

async function runMigrations() {
    console.log("Verificando a necessidade de executar migrações...");
    try {
        const checkQuery = `
      SELECT
        -- Extensões
        (SELECT 1 FROM pg_extension WHERE extname = 'unaccent') as unaccent_exists,
        (SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm') as trgm_exists,

        -- Função
        (SELECT 1 FROM pg_proc WHERE proname = 'f_unaccent') as func_exists,

        -- Tipo ENUM
        (SELECT 1 FROM pg_type WHERE typname = 'user_role') as role_exists,

        -- Tabelas
        (SELECT 1 FROM pg_class WHERE relname = 'users') as users_table_exists,
        (SELECT 1 FROM pg_class WHERE relname = 'posts') as posts_table_exists,

        -- Colunas da tabela users
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'id') as users_id_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'name') as users_name_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'email') as users_email_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'password_hash') as users_password_hash_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') as users_role_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'created_at') as users_created_at_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updated_at') as users_updated_at_col,

        -- Colunas da tabela posts
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'id') as posts_id_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'title') as posts_title_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'content') as posts_content_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'author_id') as posts_author_id_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'status') as posts_status_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'created_at') as posts_created_at_col,
        (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'updated_at') as posts_updated_at_col,

        -- Índices
        (SELECT 1 FROM pg_class WHERE relname = 'idx_posts_author_id') as author_index_exists,
        (SELECT 1 FROM pg_class WHERE relname = 'idx_posts_search') as search_index_exists
    `;

        const { rows } = await db.query(checkQuery);
        const checks = rows[0];

        // Lista de todos os objetos/colunas que devem existir
        const requiredChecks = [
            "unaccent_exists",
            "trgm_exists",
            "func_exists",
            "role_exists",
            "users_table_exists",
            "posts_table_exists",
            "users_id_col",
            "users_name_col",
            "users_email_col",
            "users_password_hash_col",
            "users_role_col",
            "users_created_at_col",
            "users_updated_at_col",
            "posts_id_col",
            "posts_title_col",
            "posts_content_col",
            "posts_author_id_col",
            "posts_status_col",
            "posts_created_at_col",
            "posts_updated_at_col",
            "author_index_exists",
            "search_index_exists",
        ];

        const missing = requiredChecks.filter((key) => !checks[key]);

        if (missing.length > 0) {
            console.log(
                "Um ou mais objetos/colunas do banco de dados estão faltando:",
                missing
            );
            console.log("Executando script de inicialização...");
            const initSql = fs
                .readFileSync(
                    path.join(__dirname, "../../postgres-init/init.sql")
                )
                .toString();
            await db.query(initSql);
            console.log("Banco de dados inicializado com sucesso.");
        } else {
            console.log(
                "Todos os objetos do banco de dados já existem. Nenhuma migração necessária."
            );
        }
    } catch (error) {
        console.error("Falha catastrófica durante a migração:", error);
        throw error;
    }
}

module.exports = runMigrations;
