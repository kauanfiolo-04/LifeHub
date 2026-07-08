import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import * as bc from 'bcrypt';
import { SignupDTO } from './dto/signup.dto';
import { Credential } from './entities/credential.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './types/jwt-payload.type';
import { OAuthProfile } from './types/oauth-profile.type';
import { OAuthAccount } from './entities/oauth-account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(OAuthAccount)
    private readonly oauthRepo: Repository<OAuthAccount>,
    @InjectRepository(Credential)
    private readonly credentialsRepository: Repository<Credential>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async signup(dto: SignupDTO) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) throw new ConflictException('Email already in use');

    const user = await this.usersService.create({ email: dto.email, name: dto.name });

    const passwordHash = await bc.hash(dto.password, 10);

    await this.credentialsRepository.save({
      userId: user.id,
      passwordHash
    });

    return user;
  }

  async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid Credentials!'); // email errado ou inexistente

    const credential = await this.credentialsRepository.findOne({ where: { userId: user.id } });

    if (!credential) throw new NotFoundException('Credential not found!');

    const isValid = await bc.compare(password, credential.passwordHash);

    if (!isValid) throw new UnauthorizedException('Invalid Credentials!');

    return user;
  }

  async generateTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('globalConfig.jwt.jwt_access_secret'),
      expiresIn: this.configService.get('globalConfig.jwt.jwt_ttl')
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('globalConfig.jwt.jwt_refresh_secret'),
      expiresIn: this.configService.get('globalConfig.jwt.jwt_refresh_ttl')
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(refreshToken: string) {
    const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
      secret: this.configService.get('globalConfig.jwt.jwt_refresh_secret')
    });

    const hash = await bc.hash(refreshToken, 10);

    await this.usersService.update(payload.sub, { hashedRefreshToken: hash }, payload);
  }

  async login(user: User) {
    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(tokens.refreshToken);

    return tokens;
  }

  async logout(payload: JwtPayload) {
    await this.usersService.update(payload.sub, { hashedRefreshToken: undefined }, payload);

    return { success: true };
  }

  async refreshTokens(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.get('globalConfig.jwt.jwt_refresh_secret')
      });
    } catch {
      throw new UnauthorizedException('Error generating payload');
    }

    const user = await this.usersService.findOne(payload.sub);

    if (!user?.hashedRefreshToken) throw new UnauthorizedException('User without hashedRefreshToken');

    const isValid = await bc.compare(refreshToken, user.hashedRefreshToken);

    if (!isValid) throw new UnauthorizedException('Invalid comparision');

    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(tokens.refreshToken);

    return tokens;
  }

  async oauthLogin(data: OAuthProfile) {
    if (!data.email) {
      throw new UnauthorizedException('OAuth provider did not return email');
    }

    let oauth = await this.oauthRepo.findOne({
      where: {
        provider: data.provider,
        providerAccountId: data.providerAccountId
      },
      relations: {
        user: true
      }
    });

    let user: User;

    if (oauth) {
      user = oauth.user;
    } else {
      const existingUser = await this.usersService.findByEmail(data.email);

      if (existingUser) {
        user = existingUser;
      } else {
        user = await this.usersService.create({
          email: data.email,
          name: data.name ?? 'User'
        });
      }

      oauth = this.oauthRepo.create({
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        user
      });

      await this.oauthRepo.save(oauth);
    }

    return this.login(user);
  }

  async getMe(userId: string) {
    const user = await this.usersService.findOne(userId);

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
