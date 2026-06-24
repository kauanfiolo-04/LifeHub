import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import * as bc from 'bcrypt';
import { SignupDTO } from './dto/signup.dto';
import { Credential } from './entities/credential.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.type';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
// import { OAuthAccount } from './entities/oauth-account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
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
      secret: this.configService.get('jwt.jwt_access_secret'),
      expiresIn: this.configService.get('jwt.jwt_ttl')
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.jwt_refresh_secret'),
      expiresIn: this.configService.get('jwt.jwt_refresh_ttl')
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const hash = await bc.hash(refreshToken, 10);

    await this.usersService.update(userId, { hashedRefreshToken: hash });
  }

  async login(user: User) {
    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);

    if (!user?.hashedRefreshToken) throw new UnauthorizedException();

    const isValid = await bc.compare(refreshToken, user.hashedRefreshToken);

    if (!isValid) throw new UnauthorizedException();

    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
