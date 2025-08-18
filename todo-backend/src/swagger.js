// src/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do API',
      version: '1.0.0',
      description: 'Express + MongoDB 기반 To-Do 리스트 API 문서',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 4000}` }
    ],
  },
  // JSDoc 주석이 달린 라우트 파일 위치
  apis: ['./src/routes/*.js'],
};
options.definition.components = {
  schemas: {
    Todo: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        done: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    TodoInput: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        done: { type: 'boolean' }
      }
    }
  }
};
export const specs = swaggerJsdoc(options);
export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};