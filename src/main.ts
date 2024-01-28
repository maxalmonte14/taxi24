import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Taxi24 API')
    .setDescription('The Taxi24 API specification')
    .setVersion('1.0')
    .addTag('drivers')
    .addTag('passengers')
    .addTag('rides')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, options));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
