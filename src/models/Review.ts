import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reviewText: string;

  @Column('int')
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Book, book => book.reviews)
  @Index()
  book: Book;
}
