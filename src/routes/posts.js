const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Define a rota POST para a raiz ('/') do roteador de posts
// Quando uma requisição POST chegar em '/posts', esta função será chamada
router.post('/', postsController.createPost);

// Futuramente, outras rotas como GET, PUT, DELETE virão aqui...
// router.get('/', postsController.getAllPosts);
// router.get('/:id', postsController.getPostById);

module.exports = router;