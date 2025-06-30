import { DataSource } from 'typeorm';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, // set to false in prod
  logging: false,
  entities: [Book, Review],
});
