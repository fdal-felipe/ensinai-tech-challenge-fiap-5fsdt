const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/**
 * @openapi
 * components:
 * schemas:
 * User:
 * type: object
 * properties:
 * id:
 * type: integer
 * name:
 * type: string
 * email:
 * type: string
 * format: email
 * password_hash:
 * type: string
 * description: "Atenção: Apenas para criação/atualização. Nunca será retornado."
 * role:
 * type: string
 * enum: [professor, aluno]
 * tags:
 * - name: Users
 * description: API para gerenciamento de usuários
 * paths:
 * /users:
 * get:
 * summary: Lista todos os usuários
 * tags: [Users]
 * responses:
 * "200":
 * description: A lista de usuários.
 * post:
 * summary: Cria um novo usuário
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * responses:
 * "201":
 * description: Usuário criado com sucesso.
 * /users/{id}:
 * get:
 * summary: Obtém um usuário pelo ID
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * "200":
 * description: Detalhes do usuário.
 * put:
 * summary: Atualiza um usuário
 * tags: [Users]
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
 * $ref: '#/components/schemas/User'
 * responses:
 * "200":
 * description: Usuário atualizado com sucesso.
 * delete:
 * summary: Deleta um usuário
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * "204":
 * description: Usuário deletado com sucesso.
 */

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);
router.get("/:id", usersController.getUsersById);
router.put("/:id", usersController.updateUsers);
router.delete("/:id", usersController.deleteUsers);

module.exports = router;