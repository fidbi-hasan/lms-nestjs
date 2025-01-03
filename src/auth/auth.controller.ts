// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto); // Return JWT token after login
  }

  // Test
  @Post('mock-token')
  generateMockToken(@Body() payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, 
      expiresIn: '1h', 
    });
    return { token };
  }
}
