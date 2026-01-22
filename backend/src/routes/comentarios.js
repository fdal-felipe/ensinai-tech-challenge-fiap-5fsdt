const express = require("express");
const router = express.Router();
const comentariosController = require("../controllers/comentariosController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         post_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         texto:
 *           type: string
 *         author_name:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     ComentarioCreate:
 *       type: object
 *       properties:
 *         post_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         texto:
 *           type: string
 *     ComentarioUpdate:
 *       type: object
 *       properties:
 *         texto:
 *           type: string
 * tags:
 *   - name: Comentarios
 *     description: Endpoints para gerenciamento de comentarios
 */

/**
 * @openapi
 * /comentarios:
 *   post:
 *     summary: Criar um novo comentário
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioCreate'
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Campos obrigatórios faltando
 *       404:
 *         description: Post ou usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", comentariosController.createComentario);

/**
 * @openapi
 * /comentarios:
 *   get:
 *     summary: Listar todos os comentários
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", comentariosController.getAllComentarios);

/**
 * @openapi
 * /comentarios/{id}:
 *   get:
 *     summary: Obter um comentário específico
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", comentariosController.getComentarioById);

/**
 * @openapi
 * /comentarios/post/{post_id}:
 *   get:
 *     summary: Listar comentários de um post específico
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: post_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentários do post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/post/:post_id", comentariosController.getComentariosByPostId);

/**
 * @openapi
 * /comentarios/{id}:
 *   put:
 *     summary: Atualizar um comentário
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioUpdate'
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Texto obrigatório
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", comentariosController.updateComentario);

/**
 * @openapi
 * /comentarios/{id}:
 *   delete:
 *     summary: Deletar um comentário
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comentário deletado com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", comentariosController.deleteComentario);

module.exports = router;
