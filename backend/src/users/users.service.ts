import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return await this.userRepository.findOne({ where: { email } });
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

  async update(id: string, dto: UpdateUserDTO) {
    const updatedUser = await this.userRepository.preload({ id, ...dto });

    if (!updatedUser) this.throwNotFoundException();

    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return await this.userRepository.remove(user);
  }
}
