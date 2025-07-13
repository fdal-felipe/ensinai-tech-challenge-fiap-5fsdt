const db = require('./index');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  console.log('Verificando a necessidade de executar migrações...');
  try {
    const result = await db.query(`
      SELECT 
        to_regclass('public.users') as users_exists, 
        to_regclass('public.posts') as posts_exists
    `);
    if (!result.rows[0].users_exists || !result.rows[0].posts_exists) {
      console.log('Tabelas não encontradas, executando script de inicialização...');
      const initSql = fs.readFileSync(path.join(__dirname, '../../postgres-init/init.sql')).toString();
      await db.query(initSql);
      console.log('Banco de dados inicializado com sucesso.');
    } else {
      console.log('Tabelas já existem. Nenhuma migração necessária.');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = runMigrations;