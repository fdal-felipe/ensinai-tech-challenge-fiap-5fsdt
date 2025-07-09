const request = require('supertest');
const app = require('../src/app'); // Importamos o app, não o server!
const db = require('../src/db');

// Descreve o conjunto de testes para os endpoints de posts
describe('Endpoints de Posts', () => {

    // Limpa o banco de dados antes de todos os testes
    beforeAll(async () => {
        await db.query('DELETE FROM posts');
    });
    
    // Garante que a conexão com o banco seja fechada após os testes
    afterAll(async () => {
        await db.pool.end();
    });

    it('GET /posts - deve retornar uma lista vazia de posts inicialmente', async () => {
        const response = await request(app).get('/posts');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(0);
    });

    it('POST /posts - deve criar um novo post', async () => {
        const novoPost = {
            title: 'Post de Teste',
            content: 'Conteúdo do post de teste.',
            author_id: 1 // Assumindo que o usuário 1 existe para o teste
        };

        const response = await request(app)
            .post('/posts')
            .send(novoPost);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(novoPost.title);
        expect(response.body).toHaveProperty('id');
    });
    
    it('GET /posts - deve retornar uma lista com um post após a criação', async () => {
        const response = await request(app).get('/posts');
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe('Post de Teste');
    });
});