import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity'; 
import { Review } from 'src/review/entities/review.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('decimal')
  price: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  teacherId: number;

  // Define the ManyToOne relationship (Many courses can have one teacher)
  @ManyToOne(() => User, user => user.courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacherId' }) // Specify the column for the foreign key
  teacher: User;

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
