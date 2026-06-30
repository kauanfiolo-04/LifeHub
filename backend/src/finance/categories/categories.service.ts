import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Category not found!');
  }

  async create(dto: CreateCategoryDTO, payload: JwtPayload) {
    const newAccount = this.categoriesRepository.create({
      ...dto,
      user: { id: payload.sub }
    });

    await this.categoriesRepository.save(newAccount);
  }

  async findAll() {
    const tasks = await this.categoriesRepository.find({ order: { createdAt: 'desc' } });

    return tasks;
  }

  async findOne(id: string) {
    const account = await this.categoriesRepository.findOneBy({ id });

    if (!account) this.throwNotFoundException();

    return account;
  }

  async update(id: string, dto: UpdateCategoryDTO, payload: JwtPayload) {
    const updatedAccount = await this.categoriesRepository.preload({ id, ...dto });

    if (!updatedAccount) this.throwNotFoundException();

    if (payload.sub !== updatedAccount.user.id)
      throw new UnauthorizedException(`You can't change another user category.`);

    return await this.categoriesRepository.save(updatedAccount);
  }

  async remove(id: string, payload: JwtPayload) {
    const category = await this.findOne(id);

    if (payload.sub !== category.user.id) throw new UnauthorizedException(`You can't delete another user category.`);

    return await this.categoriesRepository.remove(category);
  }
}
