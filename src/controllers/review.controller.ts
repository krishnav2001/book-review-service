import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Book } from '../models/Book';
import { Review } from '../models/Review';

const bookRepo = AppDataSource.getRepository(Book);
const reviewRepo = AppDataSource.getRepository(Review);

export const getReviewsByBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = parseInt(req.params.id);

    const book = await bookRepo.findOne({ where: { id: bookId } });
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    const reviews = await reviewRepo.find({
      where: { book: { id: bookId } },
      order: { createdAt: 'DESC' },
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch reviews' });
  }
};

export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = parseInt(req.params.id);
    const { reviewText, rating } = req.body;

    const book = await bookRepo.findOne({ where: { id: bookId } });
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    const review = reviewRepo.create({ reviewText, rating, book });
    const saved = await reviewRepo.save(review);

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add review' });
  }
};
