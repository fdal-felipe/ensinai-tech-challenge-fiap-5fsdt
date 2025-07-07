const express = require('express');
const db = require('./db'); // Importa nossa conexão com o banco

const app = express();
const port = 3000;

app.use(express.json());

const postsRoutes = require('./routes/posts'); // 1. Importa o arquivo de rotas

// 2. Diz ao app para usar o postsRoutes para qualquer requisição que comece com '/posts'
app.use('/posts', postsRoutes); 

app.get('/', async (req, res) => {
    try {
        // Tenta fazer uma consulta simples para verificar a conexão
        const result = await db.query('SELECT NOW()');
        res.send(`<h1>Conectado ao PostgreSQL!</h1><p>Hora do banco: ${result.rows[0].now}</p>`);
    } catch (error) {
        res.status(500).send(`<h1>Erro ao conectar ao banco de dados</h1><p>${error.message}</p>`);
    }
});

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});