import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from '../../course/entities/course.entity'; // Import Course entity

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  specialization: string;

  // Define the reverse relation (One user can have many courses)
  @OneToMany(() => Course, course => course.teacher)
  courses: Course[]; // This is the array of courses the user teaches
}
