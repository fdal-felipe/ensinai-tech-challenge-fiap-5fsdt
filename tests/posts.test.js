const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

describe('Testes dos Endpoints de Posts (CRUD Completo)', () => {

    let testUserId;
    let postId;

    beforeAll(async () => {
        await db.query('DELETE FROM posts');
        await db.query('DELETE FROM users');
        
        const userData = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
            ['Usuário de Teste', 'teste@teste.com', 'senha_hash', 'professor']
        );
        testUserId = userData.rows[0].id;
    });

    afterAll(async () => {
        await db.pool.end();
    });

    it('POST /posts - deve criar um novo post e retornar 201', async () => {
        const novoPost = {
            title: 'Post para Teste Completo',
            content: 'Conteúdo do post de teste.',
            author_id: testUserId
        };
        const response = await request(app)
            .post('/posts')
            .send(novoPost);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(novoPost.title);
        expect(response.body).toHaveProperty('id');
        postId = response.body.id;
    });
    
    it('GET /posts/:id - deve retornar o post específico recém-criado', async () => {
        const response = await request(app).get(`professor/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postId);
        expect(response.body.title).toBe('Post para Teste Completo');
    });

    it('PUT /posts/:id - deve atualizar o post criado e retornar 200', async () => {
        const postAtualizado = {
            title: 'Título do Post Atualizado',
            content: 'Conteúdo do post foi atualizado.',
            author_id: testUserId
        };
        const response = await request(app)
            .put(`/posts/${postId}`)
            .send(postAtualizado);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Título do Post Atualizado');
    });

    it('DELETE /posts/:id - deve deletar o post e retornar 204', async () => {
        const response = await request(app).delete(`professor/posts/${postId}`);
        expect(response.statusCode).toBe(204);
    });

    it('GET /posts/:id - deve retornar 404 para um post que foi deletado', async () => {
        const response = await request(app).get(`professor/posts/${postId}`);
        expect(response.statusCode).toBe(404);
    });
});