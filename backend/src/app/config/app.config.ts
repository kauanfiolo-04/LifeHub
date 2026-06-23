import { INestApplication, ValidationPipe } from '@nestjs/common';

export default (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove os campos que nao estao no DTO
      forbidNonWhitelisted: true, //traz erro quando campo nao existe
      transform: false // tenta transformar os types dos dados de param e dtos, custa performance
    })
  );

  return app;
};
