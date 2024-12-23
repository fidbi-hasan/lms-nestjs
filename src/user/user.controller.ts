import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('teacher')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { message: 'Registration successful.' };
  }

  @Get()
  async findAll() {
    const user = await this.userService.findAll();
    return {
      success: true,
      user,
      message: 'Users retrieved successfully',
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // Ensure the teacher is logged in
  async findOne(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    return {
      user,
    };
  }

  @Patch('edit-profile')
  @UseGuards(JwtAuthGuard) // Ensure the teacher is logged in
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const teacherId = req.user.id; 
    const updatedTeacher = await this.userService.update(teacherId, updateUserDto);
    return {
      data: updatedTeacher,
    };
  }

  @Delete('delete-profile')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req) {
    const teacherId = req.user.id; 
    await this.userService.remove(teacherId);
    return {
      message: 'Account has been deleted.',
    };
  }

}
