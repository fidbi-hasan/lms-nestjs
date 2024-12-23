// src/review/entities/review.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Course } from '../../course/entities/course.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @Column()
  studentId: number; 

  @Column('decimal', { precision: 2, scale: 1 })
  rating: number; // E.g., 4.5

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn()
  time: Date;

  @ManyToOne(() => Course, (course) => course.reviews)
  @JoinColumn({ name: 'courseId' })
  course: Course; // This defines the relationship to fetch the course
}
