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

    it('POST professor/posts - deve criar um novo post e retornar 201', async () => {
        const novoPost = {
            title: 'Post para Teste Completo',
            content: 'Conteúdo do post de teste.',
            author_id: testUserId
        };
        const response = await request(app)
            .post('/professor/posts')
            .send(novoPost);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(novoPost.title);
        expect(response.body).toHaveProperty('id');
        postId = response.body.id;
    });

    it('GET professor/posts - deve retornar lista de posts ativos', async () => {
        const response = await request(app).get('/professor/posts');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET professor/posts/:id - deve retornar o post específico recém-criado', async () => {
        const response = await request(app).get(`/professor/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postId);
        expect(response.body.title).toBe('Post para Teste Completo');
    });

    it('GET professor/posts/search?q=Teste - deve buscar posts por palavra-chave', async () => {
        const response = await request(app).get('/professor/posts/search?q=Teste');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(post => post.title.includes('Teste'))).toBe(true);
    });

    it('GET professor/posts/search sem parâmetro - deve retornar erro 400', async () => {
        const response = await request(app).get('/professor/posts/search');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('PUT professor/posts/:id - deve atualizar o post criado e retornar 200', async () => {
        const postAtualizado = {
            title: 'Título do Post Atualizado',
            content: 'Conteúdo do post foi atualizado.',
            status: 'ativo',
            author_id: testUserId
        };
        const response = await request(app)
            .put(`/professor/posts/${postId}`)
            .send(postAtualizado);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Título do Post Atualizado');
        expect(response.body.status).toBe('ativo');
    });

    it('PUT professor/posts/:id com dados faltando - deve retornar erro 400', async () => {
        const postAtualizado = {
            title: '',
            content: '',
            status: ''
        };
        const response = await request(app)
            .put(`/professor/posts/${postId}`)
            .send(postAtualizado);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('DELETE professor/posts/:id - deve deletar o post e retornar 204', async () => {
        const response = await request(app).delete(`/professor/posts/${postId}`);
        expect(response.statusCode).toBe(204);
    });

    it('GET professor/posts/:id - deve retornar 404 para um post que foi deletado', async () => {
        const response = await request(app).get(`/professor/posts/${postId}`);
        expect(response.statusCode).toBe(404);
    });

    it('DELETE professor/posts/:id inexistente - deve retornar 404', async () => {
        const response = await request(app).delete(`/professor/posts/999999`);
        expect(response.statusCode).toBe(404);
    });
});

describe('Testes dos Endpoints de Aluno Posts', () => {
    let alunoId;
    let postId;

    beforeAll(async () => {
        await db.query('DELETE FROM posts');
        await db.query('DELETE FROM users');
        const userData = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
            ['Aluno Teste', 'aluno@teste.com', 'senha_hash', 'aluno']
        );
        alunoId = userData.rows[0].id;
        const postData = await db.query(
            "INSERT INTO posts (title, content, author_id, status) VALUES ($1, $2, $3, $4) RETURNING id",
            ['Post do Aluno', 'Conteúdo do aluno', alunoId, 'ativo']
        );
        postId = postData.rows[0].id;
    });

    it('GET /aluno/posts - deve retornar lista de posts ativos', async () => {
        const response = await request(app).get('/aluno/posts');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /aluno/posts/:id - deve retornar o post específico', async () => {
        const response = await request(app).get(`/aluno/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postId);
        expect(response.body.title).toBe('Post do Aluno');
    });

    it('GET /aluno/posts/search?q=Aluno - deve buscar posts por palavra-chave', async () => {
        const response = await request(app).get('/aluno/posts/search?q=Aluno');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(post => post.title.includes('Aluno'))).toBe(true);
    });

    it('GET /aluno/posts/search sem parâmetro - deve retornar erro 400', async () => {
        const response = await request(app).get('/aluno/posts/search');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('GET /aluno/posts/:id inexistente - deve retornar 404', async () => {
        const response = await request(app).get('/aluno/posts/999999');
        expect(response.statusCode).toBe(404);
    });
});

describe('Testes dos Endpoints de Usuários', () => {
    let userId;

    beforeAll(async () => {
        await db.query('DELETE FROM users');
        const userData = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
            ['User Teste', 'user@teste.com', 'senha_hash', 'professor']
        );
        userId = userData.rows[0].id;
    });

    it('GET /users - deve retornar lista de usuários', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /users/:id - deve retornar o usuário específico', async () => {
        const response = await request(app).get(`/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(userId);
        expect(response.body.name).toBe('User Teste');
    });

    it('POST /users - deve criar um novo usuário e retornar 201', async () => {
        const novoUser = {
            name: 'Novo Usuário',
            email: 'novo@teste.com',
            password_hash: 'senha_hash',
            role: 'aluno'
        };
        const response = await request(app)
            .post('/users')
            .send(novoUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(novoUser.name);
        expect(response.body).toHaveProperty('id');
    });

    it('PUT /users/:id - deve atualizar o usuário e retornar 200', async () => {
        const userAtualizado = {
            name: 'User Atualizado',
            email: 'useratualizado@teste.com',
            password_hash: 'nova_senha',
            role: 'professor'
        };
        const response = await request(app)
            .put(`/users/${userId}`)
            .send(userAtualizado);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('User Atualizado');
    });

    it('PUT /users/:id com dados faltando - deve retornar erro 400', async () => {
        const userAtualizado = {
            name: '',
            email: '',
            password_hash: '',
            role: ''
        };
        const response = await request(app)
            .put(`/users/${userId}`)
            .send(userAtualizado);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('DELETE /users/:id - deve deletar o usuário e retornar 204', async () => {
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.statusCode).toBe(204);
    });

    it('GET /users/:id - deve retornar 404 para usuário deletado', async () => {
        const response = await request(app).get(`/users/${userId}`);
        expect(response.statusCode).toBe(404);
    });

    it('DELETE /users/:id inexistente - deve retornar 404', async () => {
        const response = await request(app).delete(`/users/999999`);
        expect(response.statusCode).toBe(404);
    });
});

afterAll(async () => {
    await db.pool.end();
});