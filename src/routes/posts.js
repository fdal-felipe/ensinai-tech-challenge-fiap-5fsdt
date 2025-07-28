const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const { body } = require('express-validator');

/**
 * @openapi
 * components:
 * schemas:
 * Post:
 * type: object
 * required:
 * - title
 * - content
 * - author_id
 * properties:
 * id:
 * type: integer
 * description: O ID do post.
 * title:
 * type: string
 * description: O título do post.
 * content:
 * type: string
 * description: O conteúdo do post.
 * author_id:
 * type: integer
 * description: O ID do autor.
 * status:
 * type: string
 * description: O status do post (ex: 'ativo', 'inativo').
 * created_at:
 * type: string
 * format: date-time
 * PostUpdate:
 * type: object
 * required:
 * - title
 * - content
 * - status
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * status:
 * type: string
 * tags:
 * - name: Professor
 * description: Endpoints para gerenciamento total dos posts
 * paths:
 * /professor/posts:
 * get:
 * summary: Lista todos os posts (para professores)
 * tags: [Professor]
 * responses:
 * "200":
 * description: Lista de todos os posts.
 * post:
 * summary: Cria um novo post
 * tags: [Professor]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Post'
 * responses:
 * "201":
 * description: Post criado com sucesso.
 * /professor/posts/{id}:
 * get:
 * summary: Obtém um post específico pelo ID
 * tags: [Professor]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * put:
 * summary: Atualiza um post existente
 * tags: [Professor]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/PostUpdate'
 * responses:
 * "200":
 * description: Post atualizado com sucesso.
 * delete:
 * summary: Deleta um post
 * tags: [Professor]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * "204":
 * description: Post deletado com sucesso.
 */

router.get("/", postsController.getAllPosts);
router.post("/", postsController.createPost);
router.get("/:id", postsController.getPostById);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;