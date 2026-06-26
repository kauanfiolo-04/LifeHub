import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import appConfig from './app/config/app.config';
import { TypeOrmExceptionFilter } from './common/filters/typeorm/typeorm.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
