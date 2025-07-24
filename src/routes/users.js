const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body, validationResult } = require('express-validator');

router.get("/", usersController.getAllUsers);
router.post(
  "/",
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('author_id').isInt()
  ],
  usersController.createUser
);
router.get("/:id", usersController.getUsersById);
router.put("/:id", usersController.updateUsers);
router.delete("/:id", usersController.deleteUsers);

module.exports = router;