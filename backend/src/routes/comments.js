const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
// const authMiddleware = require('../middleware/authMiddleware'); // Uncomment if needed

// Rotas públicas (ou protegidas, dependendo do requisito. Para MVP deixarei aberto ou vou assumir que o frontend envia author_id)
// Idealmente deveria usar authMiddleware para pegar o user id do token.

console.log('[COMMENTS] Router loaded');

// Test route
router.get('/comments/test', (req, res) => res.json({ ok: true }));

// Listar comentários de um post
router.get('/posts/:postId/comments', (req, res, next) => {
    console.log('[COMMENTS] GET /posts/:postId/comments hit with postId:', req.params.postId);
    next();
}, commentsController.index);

// Criar comentário em um post
router.post('/posts/:postId/comments', commentsController.store);

// Atualizar comentário
router.put('/comments/:id', commentsController.update);

// Deletar comentário (opcional, para autor ou professor)
router.delete('/comments/:id', commentsController.delete);

module.exports = router;
