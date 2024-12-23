import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ensure you have this in your environment variables
      signOptions: { expiresIn: '1h' }, // Example expiration
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, JwtModule], 
})
export class UserModule {}
