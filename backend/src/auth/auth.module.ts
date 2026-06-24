import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { OAuthAccount } from './entities/oauth-account.entity';
import { Credential } from './entities/credential.entity';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Credential]), UsersModule],
  providers: [AuthService, JwtAuthGuard, JwtService],
  controllers: [AuthController],
  exports: [JwtAuthGuard]
})
export class AuthModule {}
