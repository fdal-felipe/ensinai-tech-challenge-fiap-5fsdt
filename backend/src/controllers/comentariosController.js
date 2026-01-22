const db = require('../db');

exports.createComentario = async (req, res) => {
    const { post_id, user_id, texto } = req.body;
    if (!post_id || !user_id || !texto) {
        return res.status(400).json({ error: 'post_id, user_id e texto são obrigatórios.' });
    }

    try {
        // Verifica se o post existe
        const postExists = await db.query('SELECT id FROM posts WHERE id = $1', [post_id]);
        if (postExists.rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        // Verifica se o usuário existe
        const userExists = await db.query('SELECT id FROM users WHERE id = $1', [user_id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const sql = 'INSERT INTO comentarios (post_id, user_id, texto) VALUES ($1, $2, $3) RETURNING *';
        const values = [post_id, user_id, texto];
        const { rows } = await db.query(sql, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar comentário.' });
    }
};

exports.getAllComentarios = async (req, res) => {
    try {
        const sql = `
            SELECT c.*, u.name as author_name 
            FROM comentarios c
            JOIN users u ON c.user_id = u.id
            ORDER BY c.created_at DESC
        `;
        const { rows } = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.getComentarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT c.*, u.name as author_name 
            FROM comentarios c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = $1
        `;
        const { rows } = await db.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao obter comentário por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.getComentariosByPostId = async (req, res) => {
    const { post_id } = req.params;
    try {
        // Verifica se o post existe
        const postExists = await db.query('SELECT id FROM posts WHERE id = $1', [post_id]);
        if (postExists.rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        const sql = `
            SELECT c.*, u.name as author_name 
            FROM comentarios c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = $1
            ORDER BY c.created_at DESC
        `;
        const { rows } = await db.query(sql, [post_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar comentários do post:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.updateComentario = async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ error: 'O texto é obrigatório.' });
    }

    try {
        // Verifica se o comentário existe
        const comentarioExists = await db.query('SELECT id FROM comentarios WHERE id = $1', [id]);
        if (comentarioExists.rows.length === 0) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        const sql = `
            UPDATE comentarios
            SET texto = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING *
        `;
        const values = [texto, id];
        const { rows } = await db.query(sql, values);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar comentário.' });
    }
};

exports.deleteComentario = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM comentarios WHERE id = $1';
        const result = await db.query(sql, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Comentário não encontrado para exclusão.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
