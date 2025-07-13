const db = require('./index');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  console.log('Verificando a necessidade de executar migrações...');
  try {
    // Consulta para verificar a existência de todos os objetos necessários de uma só vez
    const checkQuery = `
      SELECT
        (SELECT 1 FROM pg_extension WHERE extname = 'unaccent') as unaccent_exists,
        (SELECT 1 FROM pg_ts_config WHERE cfgname = 'pt_unaccent') as config_exists,
        (SELECT 1 FROM pg_type WHERE typname = 'user_role') as role_exists,
        (SELECT 1 FROM pg_class WHERE relname = 'users') as users_table_exists,
        (SELECT 1 FROM pg_class WHERE relname = 'posts') as posts_table_exists,
        -- ADICIONADO: Verificação da existência dos índices
        (SELECT 1 FROM pg_class WHERE relname = 'idx_posts_author_id') as author_index_exists,
        (SELECT 1 FROM pg_class WHERE relname = 'idx_posts_search') as search_index_exists
    `;
    
    const { rows } = await db.query(checkQuery);
    const checks = rows[0];

    // ADICIONADO: Verifica se algum dos objetos, incluindo os índices, está faltando
    if (
      !checks.unaccent_exists || !checks.config_exists || !checks.role_exists || 
      !checks.users_table_exists || !checks.posts_table_exists ||
      !checks.author_index_exists || !checks.search_index_exists
    ) {
      console.log('Um ou mais objetos de banco de dados (incluindo índices) estão faltando. Executando script de inicialização...');
      const initSql = fs.readFileSync(path.join(__dirname, '../../postgres-init/init.sql')).toString();
      await db.query(initSql);
      console.log('Banco de dados inicializado com sucesso.');
    } else {
      console.log('Todos os objetos do banco de dados já existem. Nenhuma migração necessária.');
    }
  } catch (error) {
    console.error('Falha catastrófica durante a migração:', error);
    throw error;
  }
}

module.exports = runMigrations;