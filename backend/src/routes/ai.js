const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
// const authMiddleware = require('../middleware/authMiddleware');

// Route to generate post content
router.post('/generate', aiController.generate);

module.exports = router;
