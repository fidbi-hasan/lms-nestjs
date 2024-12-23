
// src/reviews/dto/create-review.dto.ts

import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // Rating from 1 to 5

  @IsString()
  @IsNotEmpty()
  comment: string; // Review comment

  courseId: number; // The course ID to associate the review with
}
