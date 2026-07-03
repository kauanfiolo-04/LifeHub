import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmExceptionFilter } from '../../common/filters/typeorm/typeorm.filter';
import cookieParser from 'cookie-parser';

export default (app: INestApplication) => {
  app.enableCors({
    origin: ['http://localhost:3000']
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove os campos que nao estao no DTO
      forbidNonWhitelisted: true, //traz erro quando campo nao existe
      transform: false // tenta transformar os types dos dados de param e dtos, custa performance
    })
  );

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  return app;
};
