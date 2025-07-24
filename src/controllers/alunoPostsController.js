const db = require('../db');

// Função para obter todas as postagens
exports.getAllPosts = async (req, res) => {
    try {
        const sql = "SELECT * FROM posts WHERE status = 'ativo' ORDER BY created_at DESC";
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
        const sql = "SELECT * FROM posts WHERE id = $1 AND status = 'ativo'";
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

// Função para buscar posts por palavra-chave
exports.searchPosts = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
    }

    try {
        const sql = `
            SELECT p.*, u.name as author_name
            FROM posts p
            JOIN users u ON p.author_id = u.id
            WHERE similarity(f_unaccent(p.title || ' ' || p.content), f_unaccent($1)) > 0.1 AND status = 'ativo'
            ORDER BY similarity(f_unaccent(p.title || ' ' || p.content), f_unaccent($1)) DESC
        `;
        
        const { rows } = await db.query(sql, [q]);
        res.status(200).json(rows);

    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};