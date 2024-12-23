import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Import UserService to validate the user
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id }; // Payload for the JWT token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, // Explicitly use the secret key
      expiresIn: '1h', // Optional: Set an expiration time
    });

    return {
      access_token: accessToken, // Return the token
    };
  }
}
