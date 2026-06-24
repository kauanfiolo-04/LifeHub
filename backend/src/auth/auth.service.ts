import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import * as bc from 'bcrypt';
import { SignupDTO } from './dto/signup.dto';
import { Credential } from './entities/credential.entity';
// import { OAuthAccount } from './entities/oauth-account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Credential)
    private readonly credentialsRepository: Repository<Credential>
  ) {}

  async signup(dto: SignupDTO) {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) throw new ConflictException('Email already in use');

    const user = await this.userService.create({ email: dto.email, name: dto.name });

    const passwordHash = await bc.hash(dto.password, 10);

    await this.credentialsRepository.save({
      userId: user.id,
      passwordHash
    });

    return user;
  }
}
