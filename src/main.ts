import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppLogger } from './shared/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  app.useLogger(new AppLogger());
  initSwagger(app);
  await app.listen(8000);
  console.log('delivery-service app running');
}

function initSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Delivery Service')
    .setDescription('Delivery Service API')
    .setVersion(process.env.PACKAGE_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
