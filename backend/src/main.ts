import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000', // React frontend URL
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Task CRUD and Auth API for the fullstack React/NestJS project')
    .setVersion('1.0')
    .addBearerAuth() // Adds JWT auth to Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Expose docs at /api

  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger docs available at: ${await app.getUrl()}/api`);
}
bootstrap();
