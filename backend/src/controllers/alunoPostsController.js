const db = require('../db');

exports.getAllPosts = async (req, res) => {
    try {
        const sql = `
            SELECT p.*, u.name as author_name
            FROM posts p
            JOIN users u ON p.author_id = u.id
            WHERE p.status = 'ativo'
            ORDER BY p.created_at DESC
        `;
        const { rows } = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT p.*, u.name as author_name
            FROM posts p
            JOIN users u ON p.author_id = u.id
            WHERE p.id = $1 AND p.status = 'ativo'
        `;
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

exports.searchPosts = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
    }

    try {
        let sql;
        const searchTerm = q.trim();

        // Para buscas curtas (1-2 caracteres), usar ILIKE para match direto
        // Para buscas maiores, usar similarity para busca semântica
        if (searchTerm.length <= 2) {
            sql = `
                SELECT p.*, u.name as author_name
                FROM posts p
                JOIN users u ON p.author_id = u.id
                WHERE (f_unaccent(p.title) ILIKE f_unaccent($1) OR f_unaccent(p.content) ILIKE f_unaccent($1))
                AND p.status = 'ativo'
                ORDER BY p.created_at DESC
            `;
            const { rows } = await db.query(sql, [`%${searchTerm}%`]);
            return res.status(200).json(rows);
        } else {
            sql = `
                SELECT p.*, u.name as author_name
                FROM posts p
                JOIN users u ON p.author_id = u.id
                WHERE word_similarity(f_unaccent(p.title || ' ' || p.content), f_unaccent($1)) > 0.15 
                AND p.status = 'ativo'
                ORDER BY similarity(f_unaccent(p.title || ' ' || p.content), f_unaccent($1)) DESC
            `;
            const { rows } = await db.query(sql, [searchTerm]);
            return res.status(200).json(rows);
        }

    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};