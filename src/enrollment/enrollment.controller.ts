// enrollment.controller.ts
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enroll')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get(':courseId/students')
  @UseGuards(JwtAuthGuard) // Ensure the teacher is authorized to view the students
  async findEnrolledStudents(@Param('courseId') courseId: number) {
    const enrollments = await this.enrollmentService.findByCourse(courseId);
    return enrollments.map((enrollment) => ({
      studentId: enrollment.studentId,
      studentName: enrollment.studentName, // Use the mocked student name
      courseStatus: enrollment.courseStatus,
      enrollmentDate: enrollment.enrollmentDate,
    }));
  }

  @Post(':courseId')
  async enroll(@Param('courseId') courseId: number) {
    // Directly calling the service to enroll the student in the course
    return this.enrollmentService.enrollStudent(courseId);
  }
}
