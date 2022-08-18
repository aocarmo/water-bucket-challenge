import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createdocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('water-bucket-challenge-api')
    .setDescription('Water Bucket Challenge API')
    .setVersion('1.0')
    .addTag('water-bucket-challenge-api')
    .addServer(`http://localhost:${process.env.PORT}`, 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  return document;
}
