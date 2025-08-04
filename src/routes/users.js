const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password_hash:
 *           type: string
 *           description: "Atenção: Apenas para criação/atualização. Nunca será retornado."
 *         role:
 *           type: string
 *           enum: [professor, aluno]
 * tags:
 *   - name: Users
 *     description: API para gerenciamento de usuários
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: A lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", usersController.getAllUsers);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: Usuário criado com sucesso.
 */
router.post("/", usersController.createUser);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Detalhes do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "404":
 *         description: Usuário não encontrado.
 */
router.get("/:id", usersController.getUsersById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "200":
 *         description: Usuário atualizado com sucesso.
 *       "404":
 *         description: Usuário não encontrado.
 */
router.put("/:id", usersController.updateUsers);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "204":
 *         description: Usuário deletado com sucesso.
 *       "404":
 *         description: Usuário não encontrado.
 */
router.delete("/:id", usersController.deleteUsers);

module.exports = router;