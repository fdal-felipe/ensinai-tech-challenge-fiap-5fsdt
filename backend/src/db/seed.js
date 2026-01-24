const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const users = [
    { name: 'Professor Teste', email: 'professor_teste@mail.com', password: 'senha_teste123', role: 'professor' },
    { name: 'Professor', email: 'professor@mail.com', password: '123456', role: 'professor' },
    { name: 'Nicholas Gerade', email: 'nicholasgerade@gmail.com', password: '123456', role: 'aluno' },
    { name: 'Felipe Seiji', email: 'seijimatie@mail.com', password: 'fe280699', role: 'professor' },
    { name: 'Gustavo Guanabara', email: 'guanabara@mail.com', password: 'gafanhotos123', role: 'professor' }
];

const posts = [
    {
        title: 'O Corpo Humano: Sistemas e Órgãos',
        content: 'Uma visão geral sobre os principais sistemas do corpo humano: digestório, respiratório, circulatório e nervoso. Como eles trabalham em conjunto?',
        email: 'seijimatie@mail.com' // Felipe Seiji
    },
    {
        title: 'Introdução à Programação com Python',
        content: 'Neste post, exploramos os conceitos básicos da linguagem Python, desde variáveis até estruturas de controle como if e while.',
        email: 'guanabara@mail.com' // Gustavo Guanabara
    },
    {
        title: 'Gestão de Projetos Ágeis',
        content: 'Entenda como o Scrum e o Kanban podem melhorar a produtividade da sua equipe e a entrega de valor ao cliente.',
        email: 'professor@mail.com'
    }
];

async function seed() {
    console.log('Iniciando semeadura...');

    try {
        // 1. Seed Users
        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            const sql = 'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING';
            const values = [user.name, user.email, hashedPassword, user.role];

            await pool.query(sql, values);
            console.log(`Usuário ${user.email} processado.`);
        }

        // 2. Seed Posts
        console.log('Semeando posts...');
        for (const post of posts) {
            // Find author id by email
            const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [post.email]);
            if (rows.length > 0) {
                const author_id = rows[0].id;
                const sql = 'INSERT INTO posts (title, content, author_id, status) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING';
                await pool.query(sql, [post.title, post.content, author_id, 'ativo']);
                console.log(`Post "${post.title}" criado.`);
            }
        }

        console.log('Semeadura concluída com sucesso!');
    } catch (error) {
        console.error('Erro durante a semeadura:', error);
    } finally {
        await pool.end();
    }
}

seed();
