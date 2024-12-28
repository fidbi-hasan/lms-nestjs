import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Request, Param, UnauthorizedException } from '@nestjs/common';
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

  @Get('view-profile')
  @UseGuards(JwtAuthGuard)
  async viewProfile(@Request() req: any) {
    const userIdFromToken = req.user.sub; // Extract user ID from the token
    const user = await this.userService.findOne(userIdFromToken);
    return {
      user,
    };
  }



  @Patch('edit-profile')
  @UseGuards(JwtAuthGuard)
  async editProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userIdFromToken = req.user.sub; // Extract user ID from the token
    const updatedUser = await this.userService.update(userIdFromToken, updateUserDto);
    return {
      message: 'Profile updated successfully.',
      user: updatedUser,
    };
  }


  @Delete('delete-profile')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(@Request() req: any) {
    const userIdFromToken = req.user.sub; // Extract user ID from the token
    await this.userService.remove(userIdFromToken);
    return {
      message: 'Profile deleted successfully.',
    };
  }

  // Generate OTP
  @UseGuards(JwtAuthGuard)
  @Post('generate-otp')
  async generateOtp(@Request() req) {
    const email = req.user.email; // Extract email from token
    return this.userService.generateOtp(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-otp')
  async verifyOtp(@Request() req, @Body('otp') otp: string) {
    const email = req.user.email; // Extract email from token
    return this.userService.validateOtp(email, otp);
  }


  // Change Password
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body('newPassword') newPassword: string,
    @Body('otp') otp: string,
  ) {
    const email = req.user.email; // Extract email from token
    return this.userService.changePassword(email, newPassword, otp);
  }


}
