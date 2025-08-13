const express = require('express');
const professorPostsRoutes = require('./routes/professorPosts.js');
const usersRoutes = require('./routes/users.js');
const alunoPostsRoutes = require('./routes/alunoPosts.js');
const authRoutes = require('./routes/auth.js');
const { authenticate, authorizeProfessor } = require('./middleware/auth.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../swagger.config.js');

const app = express();
app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/aluno/posts', alunoPostsRoutes);

app.use('/professor/posts', authenticate, authorizeProfessor, professorPostsRoutes);
app.use('/users', authenticate, authorizeProfessor, usersRoutes);

module.exports = app;