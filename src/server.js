const app = require('./app'); // Importa o app do novo arquivo

const port = 3000;

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});