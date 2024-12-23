import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable detailed logging
  app.useLogger(['log', 'error', 'warn']);

  // Apply globally the JwtAuthGuard
  // app.useGlobalGuards(app.get(JwtAuthGuard));

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(3000);
}

bootstrap();
