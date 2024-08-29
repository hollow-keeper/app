import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hollow Keeper Swagger')
    .setDescription('Api Docs for Hollow Keeper')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customCss = fs.readFileSync(
    path.join(__dirname, '../public/swagger-dark-theme.css'),
    'utf8',
  );

  SwaggerModule.setup('docs', app, document, {
    customCss,
  });

  await app.listen(3000);
}

bootstrap();
