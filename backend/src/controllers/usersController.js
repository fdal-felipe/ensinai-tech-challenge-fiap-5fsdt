const db = require('../db');
const bcrypt = require('bcryptjs');

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
    const { name, email, password_hash: password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Nome, email, senha e função são obrigatórios.' });
    }
    try {
        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, email, hashedPassword, role];
        const { rows } = await db.query(sql, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
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

// Função para atualizar usuário (senha e role são opcionais)
exports.updateUsers = async (req, res) => {
    const { id } = req.params;
    let { name, email, password_hash, password, role } = req.body;

    // Apenas nome e email são obrigatórios
    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    try {
        // Se password for enviado, gera novo hash
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password_hash = await bcrypt.hash(password, salt);
        }

        const avatar_url = req.body.avatar_url; // Pode ser null ou string

        // Construir query dinamicamente
        let fields = [];
        let values = [];
        let count = 1;

        if (name) { fields.push(`name = $${count++}`); values.push(name); }
        if (email) { fields.push(`email = $${count++}`); values.push(email); }
        if (password_hash) { fields.push(`password_hash = $${count++}`); values.push(password_hash); }
        if (role) { fields.push(`role = $${count++}`); values.push(role); }
        if (avatar_url !== undefined) { fields.push(`avatar_url = $${count++}`); values.push(avatar_url); }

        fields.push(`updated_at = NOW()`);

        // Adiciona ID ao final
        values.push(id);

        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = $${count} RETURNING *`;

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