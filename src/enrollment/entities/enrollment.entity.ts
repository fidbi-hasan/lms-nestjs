// enrollment.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column('bigint')
  studentId: number;

  @Column()
  studentName: string;  // Mock student name for testing purposes

  @Column()
  enrollmentDate: Date;

  @Column()
  courseStatus: 'ongoing' | 'finished';
}
