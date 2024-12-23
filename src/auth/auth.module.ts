// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Import UserModule
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport'; 

@Module({
  imports: [
    UserModule,             // Import UserModule here
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',  // Set your JWT secret
      signOptions: { expiresIn: '1h' },  // JWT expiration
    }),
    PassportModule, // If using Passport (for local strategy)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard], // Provide AuthService and JwtAuthGuard
  exports: [JwtAuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
