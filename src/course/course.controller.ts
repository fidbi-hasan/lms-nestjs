import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: any) {
    const teacherId = req.user.sub; // Consistent extraction of teacher ID
    return this.courseService.create(createCourseDto, teacherId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: any) {
    const teacherId = req.user.sub;  // Extract teacher ID from the token
    return this.courseService.findAll(teacherId);  // Pass teacherId to service
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number, @Req() req: any) {
    const teacherId = req.user.sub;  // Extract teacher ID from the token
    const course = await this.courseService.findOne(id, teacherId);  // Pass teacherId to service
    return course;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: any) {
    const teacherId = req.user.sub; // Consistent extraction of teacher ID
    return this.courseService.update(+id, updateCourseDto, teacherId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    const teacherId = req.user.sub; // Consistent extraction of teacher ID
    return this.courseService.remove(+id, teacherId);
  }

  // logout
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: any) {
    // This route will be used to log out the user
    // In this case, we simply respond with a message to the client
    return { message: 'Logged out successfully' };
  }
}
