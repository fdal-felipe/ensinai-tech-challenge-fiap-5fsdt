const serverUrl = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Blog Educacional - Tech Challenge',
      version: '1.0.0',
      description: 'Esta é a documentação da API de blogging criada para o Tech Challenge da FIAP, com rotas separadas para Professores, Alunos e gerenciamento de Usuários.',
    },
    servers: [
      {
        url: serverUrl,
        description: process.env.NODE_ENV === 'production' ? 'Servidor de Produção' : 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

module.exports = options;