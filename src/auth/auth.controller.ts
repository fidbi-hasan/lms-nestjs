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

  // New route for generating mock tokens
  @Post('mock-token')
  generateMockToken(@Body() payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, // Use the server's configured secret
      expiresIn: '1h', // Token expiration time
    });
    return { token };
  }
}
