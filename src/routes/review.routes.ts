export {};
import { Router } from 'express';
import { getReviewsByBook, addReview } from '../controllers/review.controller';

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /books/{id}/reviews:
 *   get:
 *     summary: Get reviews for a book
 *     description: Retrieve all reviews for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/', getReviewsByBook);

/**
 * @swagger
 * /books/{id}/reviews:
 *   post:
 *     summary: Add a review for a book
 *     description: Create a new review for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewText
 *               - rating
 *             properties:
 *               reviewText:
 *                 type: string
 *                 description: The review text
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The rating (1-5)
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.post('/', addReview);

export default router;
