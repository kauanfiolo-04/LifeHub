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
    const newCategory = this.categoriesRepository.create({
      ...dto,
      user: { id: payload.sub }
    });

    await this.categoriesRepository.save(newCategory);
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({ order: { createdAt: 'desc' } });

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) this.throwNotFoundException();

    return category;
  }

  async update(id: string, dto: UpdateCategoryDTO, payload: JwtPayload) {
    const updatedCategory = await this.categoriesRepository.preload({ id, ...dto });

    if (!updatedCategory) this.throwNotFoundException();

    if (payload.sub !== updatedCategory.user.id)
      throw new UnauthorizedException(`You can't change another user category.`);

    return await this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: string, payload: JwtPayload) {
    const category = await this.findOne(id);

    if (payload.sub !== category.user.id) throw new UnauthorizedException(`You can't delete another user category.`);

    return await this.categoriesRepository.remove(category);
  }
}
