const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         author_id:
 *           type: integer
 *         author_name:
 *           type: string
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     PostUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         status:
 *           type: string
 * tags:
 *   - name: Professor
 *     description: Endpoints para gerenciamento total dos posts
 */

/**
 * @openapi
 * /professor/posts:
 *   get:
 *     summary: Lista todos os posts (para professores)
 *     tags: [Professor]
 *     responses:
 *       "200":
 *         description: Lista de todos os posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", postsController.getAllPosts);

/**
 * @openapi
 * /professor/posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Professor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       "201":
 *         description: Post criado com sucesso.
 */
router.post("/", postsController.createPost);

/**
 * @openapi
 * /professor/posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave (para professores)
 *     tags: [Professor]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Lista de posts encontrados.
 */
router.get("/search", postsController.searchPosts);

/**
 * @openapi
 * /professor/posts/{id}:
 *   get:
 *     summary: Obtém um post específico pelo ID
 *     tags: [Professor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Detalhes do post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get("/:id", postsController.getPostById);

/**
 * @openapi
 * /professor/posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Professor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       "200":
 *         description: Post atualizado com sucesso.
 */
router.put("/:id", postsController.updatePost);

/**
 * @openapi
 * /professor/posts/{id}:
 *   delete:
 *     summary: Deleta um post
 *     tags: [Professor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: Post deletado com sucesso.
 */
router.delete("/:id", postsController.deletePost);

module.exports = router;
