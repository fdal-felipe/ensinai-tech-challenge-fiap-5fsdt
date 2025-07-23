const express = require("express");
const router = express.Router();
const alunoPostsController = require("../controllers/alunoPostsController");

router.get("/", alunoPostsController.getAllPosts);
router.get("/search", alunoPostsController.searchPosts);
router.get("/:id", alunoPostsController.getPostById);

module.exports = router;