import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/types/jwt-payload.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('User not found!');
  }

  async create(dto: CreateUserDTO) {
    try {
      const newUser = this.userRepository.create(dto);

      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.log(typeof error);

      // if (error? === '23505') {
      //   throw new ConflictException('Email já cadastrado');
      // }

      throw error;
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) this.throwNotFoundException();

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find({ order: { createdAt: 'desc' } });

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) this.throwNotFoundException();

    return user;
  }

  async update(id: string, dto: UpdateUserDTO, payload: JwtPayload) {
    if (payload.sub !== id) throw new UnauthorizedException(`You can't update another user.`);

    const updatedUser = await this.userRepository.preload({ id, ...dto });

    if (!updatedUser) this.throwNotFoundException();

    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string, payload: JwtPayload) {
    if (payload.sub !== id) throw new UnauthorizedException(`You can't delete another user.`);

    const user = await this.findOne(id);

    return await this.userRepository.remove(user);
  }
}
