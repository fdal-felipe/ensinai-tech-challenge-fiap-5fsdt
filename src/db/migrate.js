const db = require('./index');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  console.log('Verificando a necessidade de executar migrações...');
  try {
    await db.query("SELECT 'public.users'::regclass");
    console.log('Tabelas já existem. Nenhuma migração necessária.');
  } catch (error) {
    if (error.message.includes('does not exist')) {
      console.log('Tabelas não encontradas, executando script de inicialização...');
      const initSql = fs.readFileSync(path.join(__dirname, '../../postgres-init/init.sql')).toString();
      await db.query(initSql);
      console.log('Banco de dados inicializado com sucesso.');
    } else {
      throw error;
    }
  }
}

module.exports = runMigrations;