const db = require('../db');

// Função para criar uma nova postagem
exports.createPost = async (req, res) => {
    // Extrai título, conteúdo e ID do autor do corpo da requisição
    const { title, content, author_id } = req.body;

    // Validação simples para garantir que os dados necessários foram enviados
    if (!title || !content || !author_id) {
        return res.status(400).json({ error: 'Título, conteúdo e ID do autor são obrigatórios.' });
    }

    try {
        const sql = 'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, content, author_id];
        
        const { rows } = await db.query(sql, values);

        // Retorna o post recém-criado com status 201 (Created)
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar postagem.' });
    }
};