import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Book } from '../models/Book';
import { getFromCache, setInCache, deleteFromCache } from '../config/redis';

const bookRepo = AppDataSource.getRepository(Book);

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const cached = await getFromCache('books');
    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    const books = await bookRepo.find();
    await setInCache('books', JSON.stringify(books), 60); // cache for 60s
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, publishedDate } = req.body;
    const book = bookRepo.create({ title, author, publishedDate });
    const saved = await bookRepo.save(book);
    
    await deleteFromCache('books'); // clear cache

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add book' });
  }
};