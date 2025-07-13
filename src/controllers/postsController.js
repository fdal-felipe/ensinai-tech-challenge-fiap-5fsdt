const db = require('../db');

// Função para criar uma nova postagem
exports.createPost = async (req, res) => {
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).json({ error: 'Título, conteúdo e ID do autor são obrigatórios.' });
    }
    try {
        const sql = 'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, content, author_id];
        const { rows } = await db.query(sql, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar postagem.' });
    }
};

// Função para obter todas as postagens
exports.getAllPosts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
        const { rows } = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para obter uma postagem por ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM posts WHERE id = $1';
        const { rows } = await db.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Postagem não encontrada.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao obter post por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para atualizar uma postagem
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }
    try {
        const sql = 'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *';
        const values = [title, content, id];
        const { rows } = await db.query(sql, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Postagem não encontrada.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar postagem.' });
    }
};

// Função para deletar uma postagem
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM posts WHERE id = $1';
        const result = await db.query(sql, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Postagem não encontrada para exclusão.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para buscar posts por palavra-chave
exports.searchPosts = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
    }

    try {
        const searchTerm = q.split(' ').filter(word => word).map(word => word + ':*').join(' & ');
        const sql = `
            SELECT p.*, u.name as author_name 
            FROM posts p
            JOIN users u ON p.author_id = u.id 
            WHERE to_tsvector('pt_unaccent', p.title || ' ' || p.content) @@ to_tsquery('pt_unaccent', $1)
        `;
        const { rows } = await db.query(sql, [searchTerm]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};