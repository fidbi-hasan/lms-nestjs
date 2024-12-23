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

  // Enroll a student into a course (mocking the student data for testing purposes)
  async enrollStudent(courseId: number) {
    // Dynamically generate a new mock student ID and name.
    const studentId = Date.now(); // Use timestamp as a unique student ID for simplicity
    const studentName = `Student #${studentId}`; // Generate a mock name based on the student ID
  
    const enrollment = this.enrollmentRepository.create({
      courseId,
      studentId,
      studentName,
      courseStatus: 'ongoing', // You can change the status based on your requirement
      enrollmentDate: new Date(),
    });
  
    return this.enrollmentRepository.save(enrollment);
  }
  
}
