import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OAuthAccount } from './entities/oauth-account.entity';
import { Credential } from './entities/credential.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Credential]), UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
