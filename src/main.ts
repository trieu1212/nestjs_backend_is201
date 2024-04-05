import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Api Nestjs')
    .setDescription('List Api By Triệu')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Service')
    .addTag('Post')
    .addTag('Order')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
