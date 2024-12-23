import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(courseId: number, studentId: number, createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      courseId,
      studentId,
      ...createReviewDto,
    });
    return await this.reviewRepository.save(review);
  }

  async findByCourseWithDetails(courseId: number) {
    return this.reviewRepository.find({
      where: { courseId },
      relations: ['course'], // Include course details
      select: {
        course: {
          title: true, // course name
        },
        studentId: true,
        rating: true,
        comment: true,
        time: true,
      },
    });
  }

  findAll() {
    return `Please specify unique course id to see review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
