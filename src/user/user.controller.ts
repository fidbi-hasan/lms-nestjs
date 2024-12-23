import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Request, Param } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return {
      user,
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(+id, updateUserDto);
    return {
      message: 'profile info updated.',
      data,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
    return {
      message: 'user deleted.',
    }
  }

}
