import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto, teacherId: number) {
    const newCourse = this.courseRepository.create({ 
      ...createCourseDto, teacherId 
    });
    return await this.courseRepository.save(newCourse);
  }

  async findAll(teacherId: number) {
    return this.courseRepository.find({ where: { teacherId } });
  }

  async findOne(id: number, teacherId: number) {
    const course = await this.courseRepository.findOne({
      where: { id, teacherId },
      relations: ['reviews'], // Include reviews
    });
  
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found or unauthorized`);
    }
  
    return course;
  }
  

  async update(id: number, updateCourseDto: UpdateCourseDto, teacherId: number) {
    const course = await this.findOne(id, teacherId);  // Only pass id here
  
    if (course.teacherId !== teacherId) {
      throw new UnauthorizedException('You are not allowed to update this course.');
    }
  
    const updatedCourse = this.courseRepository.merge(course, updateCourseDto);
    await this.courseRepository.save(updatedCourse);
    return { message: 'Course updated successfully' };
  }
  
  async remove(id: number, teacherId: number) {
    const course = await this.findOne(id, teacherId);  // Only pass id here
  
    if (course.teacherId !== teacherId) {
      throw new UnauthorizedException('You are not allowed to delete this course.');
    }
  
    await this.courseRepository.remove(course);
    return { message: 'Course deleted successfully' };
  }
  
}
