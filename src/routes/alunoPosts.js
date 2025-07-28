const express = require("express");
const router = express.Router();
const alunoPostsController = require("../controllers/alunoPostsController");

/**
 * @openapi
 * tags:
 * - name: Aluno
 * description: Endpoints de visualização de posts para alunos (somente posts ativos)
 * paths:
 * /aluno/posts:
 * get:
 * summary: Lista todos os posts ativos
 * tags: [Aluno]
 * responses:
 * "200":
 * description: Uma lista de posts com status 'ativo'.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Post'
 * /aluno/posts/search:
 * get:
 * summary: Busca posts ativos por palavra-chave
 * tags: [Aluno]
 * parameters:
 * - in: query
 * name: q
 * required: true
 * schema:
 * type: string
 * responses:
 * "200":
 * description: Uma lista de posts ativos que correspondem à busca.
 * /aluno/posts/{id}:
 * get:
 * summary: Obtém um post ativo específico pelo ID
 * tags: [Aluno]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * "200":
 * description: Detalhes do post.
 * "404":
 * description: Post não encontrado ou inativo.
 */

router.get("/", alunoPostsController.getAllPosts);
router.get("/search", alunoPostsController.searchPosts);
router.get("/:id", alunoPostsController.getPostById);

module.exports = router;