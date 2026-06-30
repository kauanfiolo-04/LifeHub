import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
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

    return newCategory;
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({ order: { createdAt: 'desc' } });

    return categories;
  }

  async findOne(id: string, relations?: FindOptionsRelations<Category>, select?: FindOptionsSelect<Category>) {
    const category = await this.categoriesRepository.findOne({ where: { id }, relations, select });

    if (!category) this.throwNotFoundException();

    return category;
  }

  async update(id: string, dto: UpdateCategoryDTO, payload: JwtPayload) {
    const category = await this.findOne(id, { user: true }, { user: { id: true } });

    if (!category) this.throwNotFoundException();

    if (payload.sub !== category.user.id) throw new UnauthorizedException(`You can't change another user category.`);

    Object.assign(category, dto);

    return await this.categoriesRepository.save(category);
  }

  async remove(id: string, payload: JwtPayload) {
    const category = await this.findOne(id, { user: true }, { user: { id: true } });

    if (payload.sub !== category.user.id) throw new UnauthorizedException(`You can't delete another user category.`);

    return await this.categoriesRepository.remove(category);
  }
}
