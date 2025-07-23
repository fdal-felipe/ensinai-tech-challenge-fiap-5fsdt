const db = require('../db');
// Função para obter todos os usuário
exports.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users ORDER BY created_at DESC';
        const { rows } = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar users:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
    const { name, email, password_hash,role } = req.body;
    if (!name || !email || !password_hash || !role) {
        return res.status(400).json({ error: 'Título, conteúdo e ID do autor são obrigatórios.' });
    }
    try {
        const sql = 'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, email, password_hash,role];
        const { rows } = await db.query(sql, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar usuário.' });
    }
};


// Função para obter um usuário por ID
exports.getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await db.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrada.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao obter users por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para atualizar usuário
exports.updateUsers = async (req, res) => {
    const { id } = req.params;
    const { name, email, password_hash, role } = req.body;
    if (!name || !email || !password_hash || !role) {
        return res.status(400).json({ error: 'Nome, email, password e função são obrigatórios.' });
    }
    try {
        const sql = 'UPDATE users SET name = $1, email = $2, password_hash = $3, role = $4, updated_at = NOW() WHERE id = $5 RETURNING *';
        const values = [name, email, password_hash, role, id];
        const { rows } = await db.query(sql, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar user:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar usuário.' });
    }
};

// Função para deletar uma postagem
exports.deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM users WHERE id = $1';
        const result = await db.query(sql, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario não encontrada para exclusão.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar user:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

/* Função para buscar posts por palavra-chave
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
            WHERE similarity(f_unaccent(p.title || ' ' || p.content), f_unaccent($1)) > 0.01
            ORDER BY similarity(f_unaccent(p.title || ' ' || p.content), f_unaccent($1)) DESC
        `;
        
        const { rows } = await db.query(sql, [q]);
        res.status(200).json(rows);

    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};*/