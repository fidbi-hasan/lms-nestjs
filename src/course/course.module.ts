import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity'; // Make sure you have this
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Make sure the JwtAuthGuard is in place
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Course])], // Import TypeOrmModule with Course entity
  providers: [CourseService], // Inject CourseService
  controllers: [CourseController], // Register the controller
})
export class CourseModule {}
