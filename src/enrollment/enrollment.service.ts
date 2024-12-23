// enrollment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  // Fetch enrollments by courseId
  async findByCourse(courseId: number) {
    const enrollments = await this.enrollmentRepository.find({
      where: { courseId },
    });

    // Mocking the studentName based on studentId for testing
    enrollments.forEach((enrollment) => {
      enrollment.studentName = `Student #${enrollment.studentId}`;
    });

    return enrollments;
  }

  // Enroll a student into a course (test)
  async enrollStudent(courseId: number) {
    
    const studentId = Date.now(); 
    const studentName = `Student #${studentId}`; 
  
    const enrollment = this.enrollmentRepository.create({
      courseId,
      studentId,
      studentName,
      courseStatus: 'ongoing', 
      enrollmentDate: new Date(),
    });
  
    return this.enrollmentRepository.save(enrollment);
  }
  
}
