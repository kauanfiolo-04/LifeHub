import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { NotesModule } from '../notes/notes.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import globalConfig from '../global-config/global-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
