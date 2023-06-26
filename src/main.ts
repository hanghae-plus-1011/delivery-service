import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwagger(app);

  await app.listen(3000);
}

function initSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Delivery Service')
    .setDescription('Delivery Service API')
    .setVersion(process.env.packageVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
