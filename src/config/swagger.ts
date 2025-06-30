import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Review API',
      version: '1.0.0',
      description: 'A RESTful API for managing books and reviews',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The book ID',
            },
            title: {
              type: 'string',
              description: 'The book title',
            },
            author: {
              type: 'string',
              description: 'The book author',
            },
            publishedDate: {
              type: 'string',
              format: 'date',
              description: 'The publication date',
            },
            reviews: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Review',
              },
              description: 'List of reviews for this book',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The review ID',
            },
            reviewText: {
              type: 'string',
              description: 'The review text',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              description: 'The rating (1-5)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation date',
            },
            book: {
              $ref: '#/components/schemas/Book',
              description: 'The book this review belongs to',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi };