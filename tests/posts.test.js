const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db");

describe("Testes dos Endpoints de Professor (/professor/posts)", () => {
    let professorToken;
    let professorUserId;
    let postId;

    beforeAll(async () => {
        await db.query("DELETE FROM posts");
        await db.query("DELETE FROM users");

        await request(app).post("/auth/register").send({
            name: "Professor de Teste",
            email: "professor.teste@email.com",
            password: "password123",
            role: "professor",
        });

        const loginRes = await request(app).post("/auth/login").send({
            email: "professor.teste@email.com",
            password: "password123",
        });

        professorToken = loginRes.body.token;
        const user = await db.query(
            "SELECT id FROM users WHERE email = 'professor.teste@email.com'"
        );
        professorUserId = user.rows[0].id;
    });

    it("POST /professor/posts - deve falhar ao criar um post sem token", async () => {
        const response = await request(app).post("/professor/posts").send({
            title: "Post Falho",
            content: "...",
            author_id: professorUserId,
        });
        expect(response.statusCode).toBe(401);
    });

    it("POST /professor/posts - deve criar um novo post com token válido", async () => {
        const novoPost = {
            title: "Post Autenticado",
            content: "Conteúdo do post de teste.",
            author_id: professorUserId,
        };
        const response = await request(app)
            .post("/professor/posts")
            .set("Authorization", `Bearer ${professorToken}`)
            .send(novoPost);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(novoPost.title);
        postId = response.body.id;
    });

    it("GET /professor/posts - deve listar todos os posts com token", async () => {
        const response = await request(app)
            .get("/professor/posts")
            .set("Authorization", `Bearer ${professorToken}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("GET /professor/posts/:id - deve retornar o post específico com token", async () => {
        const response = await request(app)
            .get(`/professor/posts/${postId}`)
            .set("Authorization", `Bearer ${professorToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postId);
    });

    it("GET /professor/posts/search?q=Autenticado - deve buscar posts por palavra-chave", async () => {
        const response = await request(app)
            .get("/professor/posts/search?q=Autenticado")
            .set("Authorization", `Bearer ${professorToken}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(
            response.body.some((post) => post.title.includes("Autenticado"))
        ).toBe(true);
    });

    it("GET /professor/posts/search sem parâmetro - deve retornar erro 400", async () => {
        const response = await request(app)
            .get("/professor/posts/search")
            .set("Authorization", `Bearer ${professorToken}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it("PUT /professor/posts/:id - deve atualizar o post com token", async () => {
        const postAtualizado = {
            title: "Título Atualizado",
            content: "Conteúdo atualizado.",
            status: "inativo",
        };
        const response = await request(app)
            .put(`/professor/posts/${postId}`)
            .set("Authorization", `Bearer ${professorToken}`)
            .send(postAtualizado);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Título Atualizado");
        expect(response.body.status).toBe("inativo");
    });

    it("PUT /professor/posts/:id com dados faltando - deve retornar erro 400", async () => {
        const postAtualizado = {
            title: "",
            content: "",
            status: "",
        };
        const response = await request(app)
            .put(`/professor/posts/${postId}`)
            .set("Authorization", `Bearer ${professorToken}`)
            .send(postAtualizado);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it("DELETE /professor/posts/:id inexistente - deve retornar 404", async () => {
        const response = await request(app)
            .delete(`/professor/posts/999999`)
            .set("Authorization", `Bearer ${professorToken}`);
        expect(response.statusCode).toBe(404);
    });

    it("DELETE /professor/posts/:id - deve deletar o post com token", async () => {
        const response = await request(app)
            .delete(`/professor/posts/${postId}`)
            .set("Authorization", `Bearer ${professorToken}`);

        expect(response.statusCode).toBe(204);
    });

    it("GET /professor/posts/:id - deve retornar 404 para post deletado", async () => {
        const response = await request(app)
            .get(`/professor/posts/${postId}`)
            .set("Authorization", `Bearer ${professorToken}`);

        expect(response.statusCode).toBe(404);
    });
});

describe("Testes dos Endpoints de Aluno (/aluno/posts)", () => {
    let autorId;
    let postAtivoId;
    let postInativoId;

    beforeAll(async () => {
        await db.query("DELETE FROM posts");
        await db.query("DELETE FROM users");

        const userData = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id",
            [
                "Autor para Aluno",
                "autor.aluno@teste.com",
                "senha_hash",
                "professor",
            ]
        );
        autorId = userData.rows[0].id;

        const postAtivo = await db.query(
            "INSERT INTO posts (title, content, author_id, status) VALUES ($1, $2, $3, 'ativo') RETURNING id",
            ["Post Ativo para Aluno", "Conteúdo visível", autorId]
        );
        postAtivoId = postAtivo.rows[0].id;

        const postInativo = await db.query(
            "INSERT INTO posts (title, content, author_id, status) VALUES ($1, $2, $3, 'inativo') RETURNING id",
            ["Post Inativo", "Conteúdo invisível", autorId]
        );
        postInativoId = postInativo.rows[0].id;
    });

    it("GET /aluno/posts - deve retornar apenas posts ativos", async () => {
        const response = await request(app).get("/aluno/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe("Post Ativo para Aluno");
    });

    it("GET /aluno/posts/:id - deve retornar um post ativo pelo ID", async () => {
        const response = await request(app).get(`/aluno/posts/${postAtivoId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postAtivoId);
    });

    it("GET /aluno/posts/:id inexistente - deve retornar 404", async () => {
        const response = await request(app).get(`/aluno/posts/999999`);
        expect(response.statusCode).toBe(404);
    });

    it("GET /aluno/posts/search?q=Aluno - deve buscar posts por palavra-chave", async () => {
        const response = await request(app).get("/aluno/posts/search?q=Aluno");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some((post) => post.title.includes("Aluno"))).toBe(
            true
        );
    });

    it("GET /aluno/posts/search sem parâmetro - deve retornar erro 400", async () => {
        const response = await request(app).get("/aluno/posts/search");
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("Testes dos Endpoints de Usuários (/users)", () => {
    let adminToken;
    let userId;

    beforeAll(async () => {
        await db.query("DELETE FROM users");

        await request(app).post("/auth/register").send({
            name: "Admin User",
            email: "admin@teste.com",
            password: "password123",
            role: "professor",
        });

        const loginRes = await request(app)
            .post("/auth/login")
            .send({ email: "admin@teste.com", password: "password123" });

        adminToken = loginRes.body.token;

        const user = await db.query(
            "SELECT id FROM users WHERE email = 'admin@teste.com'"
        );
        userId = user.rows[0].id;
    });

    it("GET /users - deve falhar sem um token de professor", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(401);
    });

    it("GET /users - deve retornar a lista de usuários com token de professor", async () => {
        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("GET /users/:id - deve retornar o usuário específico", async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(userId);
        expect(response.body.name).toBe("Admin User");
    });

    it("POST /users - deve criar um novo usuário e retornar 201", async () => {
        const novoUser = {
            name: "Novo Usuário",
            email: "novo@teste.com",
            password_hash: "senha_hash",
            role: "aluno",
        };
        const response = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(novoUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(novoUser.name);
        expect(response.body).toHaveProperty("id");
    });

    it("PUT /users/:id - deve atualizar o usuário e retornar 200", async () => {
        const userAtualizado = {
            name: "User Atualizado",
            email: "useratualizado@teste.com",
            password_hash: "nova_senha",
            role: "professor",
        };
        const response = await request(app)
            .put(`/users/${userId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send(userAtualizado);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("User Atualizado");
    });

    it("PUT /users/:id com dados faltando - deve retornar erro 400", async () => {
        const userAtualizado = {
            name: "",
            email: "",
            password_hash: "",
            role: "",
        };
        const response = await request(app)
            .put(`/users/${userId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send(userAtualizado);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it("DELETE /users/:id inexistente - deve retornar 404", async () => {
        const response = await request(app)
            .delete(`/users/999999`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.statusCode).toBe(404);
    });

    it("DELETE /users/:id - deve deletar o usuário e retornar 204", async () => {
        const response = await request(app)
            .delete(`/users/${userId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(204);
    });

    it("GET /users/:id - deve retornar 404 para usuário deletado", async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.statusCode).toBe(404);
    });
});

afterAll(async () => {
    await db.pool.end();
});