import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const express = require("express");
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors({ 
    credentials: true, 
    origin: true 
  });
  app.use(express.json({ 
    limit: "50mb" 
  }));
  app.use(express.urlencoded({
     limit: "50mb", extended: true 
  }));
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("projectManagement")
    .setDescription("The projectManagement API description")
    .setVersion("1.0")
    .addTag("projectManagement")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apidoc", app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
