require('dotenv').config();

const app = require('./app');
const runMigrations = require('./db/migrate');

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await runMigrations();
    app.listen(port, () => {
      console.log(`Aplicação rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();