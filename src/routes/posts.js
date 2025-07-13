const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const { body, validationResult } = require('express-validator');

/**
 * @openapi
 * openapi: 3.0.0
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author_id
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente para o post.
 *         title:
 *           type: string
 *           description: O título do post.
 *         content:
 *           type: string
 *           description: O conteúdo do post.
 *         author_id:
 *           type: integer
 *           description: O ID do autor do post.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: A data de criação do post.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: A data da última atualização do post.
 *       example:
 *         id: 1
 *         title: "Meu Primeiro Post"
 *         content: "Este é o conteúdo do meu primeiro post."
 *         author_id: 1
 *         created_at: "2025-07-08T14:00:00.000Z"
 *         updated_at: "2025-07-08T14:00:00.000Z"
 * tags:
 *   - name: Posts
 *     description: API para gerenciamento de posts
 * paths:
 *   /posts:
 *     get:
 *       summary: Retorna a lista de todos os posts
 *       tags: [Posts]
 *       responses:
 *         "200":
 *           description: A lista de posts.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Post'
 *     post:
 *       summary: Cria um novo post
 *       tags: [Posts]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       responses:
 *         "201":
 *           description: Post criado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         "400":
 *           description: Erro de validação nos dados enviados.
 *   /posts/search:
 *     get:
 *       summary: Busca posts por palavra-chave
 *       tags: [Posts]
 *       parameters:
 *         - in: query
 *           name: q
 *           schema:
 *             type: string
 *           required: true
 *           description: O termo a ser buscado no título ou conteúdo dos posts.
 *       responses:
 *         "200":
 *           description: Uma lista de posts que correspondem ao termo de busca.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Post'
 *         "400":
 *           description: Parâmetro de busca 'q' não fornecido.
 *   /posts/{id}:
 *     get:
 *       summary: Obtém um post específico pelo seu ID
 *       tags: [Posts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: O ID do post.
 *       responses:
 *         "200":
 *           description: Detalhes do post.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         "404":
 *           description: Post não encontrado.
 *     put:
 *       summary: Atualiza um post existente
 *       tags: [Posts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: O ID do post a ser atualizado.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       responses:
 *         "200":
 *           description: Post atualizado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         "404":
 *           description: Post não encontrado.
 *     delete:
 *       summary: Deleta um post
 *       tags: [Posts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: O ID do post a ser deletado.
 *       responses:
 *         "204":
 *           description: Post deletado com sucesso (sem conteúdo).
 *         "404":
 *           description: Post não encontrado.
 */

// Rotas
router.get("/", postsController.getAllPosts);
router.post(
  "/",
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('author_id').isInt()
  ],
  postsController.createPost
);
router.get("/search", postsController.searchPosts);
router.get("/:id", postsController.getPostById);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;