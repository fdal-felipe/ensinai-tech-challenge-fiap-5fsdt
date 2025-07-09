const express = require('express');
const postsRoutes = require('./routes/posts');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../swagger.config.js');

const app = express();

app.use(express.json());

// Rotas
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/posts', postsRoutes);

module.exports = app;