import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { NotesModule } from '../notes/notes.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import globalConfig from '../global-config/global-config';
import { AuthModule } from '../auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DATABASE_TYPE: Joi.string().required(),

        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),

        JWT_TTL: Joi.number().default(3600),
        JWT_REFRESH_TTL: Joi.number().default(86400),

        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development')
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(globalConfig)],
      inject: [globalConfig.KEY],
      useFactory: (config: ConfigType<typeof globalConfig>) => {
        return {
          type: config.database.type,
          url: config.database.url,
          ssl: {
            rejectUnauthorized: false
          },
          autoLoadEntities: config.database.autoLoadEntities,
          synchronize: config.database.synchronize
        };
      }
    }),
    TasksModule,
    NotesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
