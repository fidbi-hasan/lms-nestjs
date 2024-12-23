import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; 
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

    const payload = { email: user.email, sub: user.id }; 
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, 
      expiresIn: '1h', 
    });

    return {
      access_token: accessToken, 
    };
  }
}
