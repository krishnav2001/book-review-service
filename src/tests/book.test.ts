import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../config/data-source';
import { Book } from '../models/Book';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await AppDataSource.initialize();
  await AppDataSource.getRepository(Book).clear();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Book API', () => {
  it('should create a new book', async () => {
    const response = await request(app).post('/books').send({
      title: 'Test Driven Development',
      author: 'Kent Beck',
      publishedDate: '2003-05-15',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Driven Development');
  });

  it('should get all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});