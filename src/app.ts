import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import bookRoutes from './routes/book.routes';
import reviewRoutes from './routes/review.routes';

app.use('/books', bookRoutes);
app.use('/books/:id/reviews', reviewRoutes);

export default app;