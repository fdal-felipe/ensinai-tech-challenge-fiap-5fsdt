const db = require('../db');

// Listar comentários de um post
exports.index = async (req, res) => {
    const { postId } = req.params;
    try {
        // Join with users to get author name and avatar
        const sql = `
            SELECT c.*, u.name as author_name, u.avatar_url as author_avatar
            FROM comments c
            JOIN users u ON c.author_id = u.id
            WHERE c.post_id = $1
            ORDER BY c.created_at ASC
        `;
        const { rows } = await db.query(sql, [postId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Criar um comentário
exports.store = async (req, res) => {
    const { postId } = req.params;
    const { content, author_id } = req.body;

    if (!content || !author_id) {
        return res.status(400).json({ error: 'Conteúdo e autor são obrigatórios.' });
    }

    try {
        const sql = `
            INSERT INTO comments (content, post_id, author_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [content, postId, author_id];
        const { rows } = await db.query(sql, values);

        // Fetch author details to return complete object
        const newComment = rows[0];
        const userSql = 'SELECT name, avatar_url FROM users WHERE id = $1';
        const userResult = await db.query(userSql, [author_id]);

        if (userResult.rows.length > 0) {
            newComment.author_name = userResult.rows[0].name;
            newComment.author_avatar = userResult.rows[0].avatar_url;
        }

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Atualizar um comentário
exports.update = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório.' });
    }

    try {
        const sql = `
            UPDATE comments
            SET content = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING *
        `;
        const { rows } = await db.query(sql, [content, id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        // Fetch author details to return complete object
        const updatedComment = rows[0];
        const userSql = 'SELECT name, avatar_url FROM users WHERE id = $1';
        const userResult = await db.query(userSql, [updatedComment.author_id]);

        if (userResult.rows.length > 0) {
            updatedComment.author_name = userResult.rows[0].name;
            updatedComment.author_avatar = userResult.rows[0].avatar_url;
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Deletar um comentário
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM comments WHERE id = $1 RETURNING *';
        const { rows } = await db.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
