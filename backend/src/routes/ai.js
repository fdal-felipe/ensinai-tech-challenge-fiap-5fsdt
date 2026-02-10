const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticate } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: AI
 *     description: Endpoints para agente de IA
 */

/**
 * @swagger
 * /ai/generate:
 *   post:
 *     summary: Gerar sugestão de conteúdo
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Node.js best practices"
 *     responses:
 *       200:
 *         description: Sugestão de conteúdo gerada
 *       400:
 *         description: Título obrigatório
 */
router.post('/generate', authenticate, aiController.generate);

/**
 * @swagger
 * /ai/analyze:
 *   post:
 *     summary: Analisar post e gerar insights
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Análise completa do post
 *       400:
 *         description: Título e conteúdo obrigatórios
 */
router.post('/analyze', authenticate, aiController.analyze);

/**
 * @swagger
 * /ai/moderate:
 *   post:
 *     summary: Moderar conteúdo
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *                 example: "post"
 *     responses:
 *       200:
 *         description: Resultado da moderação
 *       400:
 *         description: Conteúdo obrigatório
 */
router.post('/moderate', authenticate, aiController.moderate);

/**
 * @swagger
 * /ai/respond:
 *   post:
 *     summary: Gerar resposta automática para comentário
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentText:
 *                 type: string
 *               postId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Resposta automática gerada
 *       400:
 *         description: Texto do comentário obrigatório
 */
router.post('/respond', authenticate, aiController.generateResponse);

module.exports = router;
