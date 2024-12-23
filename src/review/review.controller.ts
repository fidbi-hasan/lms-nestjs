import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':courseId')
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: any,
  ) {
    const studentId = req.user.id; // Assuming the user is a "student" for testing
    return this.reviewService.create(courseId, studentId, createReviewDto);
  }

  @Get(':courseId')
  @UseGuards(JwtAuthGuard)
  async findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    const reviews = await this.reviewService.findByCourseWithDetails(courseId);
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException(`No reviews found for course ID ${courseId}`);
    }
    return reviews;
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
