const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Blog para o Tech Challenge',
      version: '1.0.0',
      description: 'Esta é a documentação da API de blogging criada para o Tech Challenge da FIAP.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

module.exports = options;