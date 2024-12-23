import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CourseModule } from './course/course.module';
import { Course } from './course/entities/course.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Enrollment } from './enrollment/entities/enrollment.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Use a secure secret in production
      signOptions: { expiresIn: '60m' }, // Token expiry time
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Course, Review, Enrollment],
        synchronize: true
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CourseModule,
    ReviewModule,
    EnrollmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
