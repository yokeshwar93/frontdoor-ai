import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Frontdoor Api')
    .setDescription('Api endpoints for Frontdoor')
    .setVersion('1.0')
    .addTag('Hyprvisor')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
