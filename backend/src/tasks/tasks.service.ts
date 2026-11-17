import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskSortBy } from './enum/task-sort-by';
import { type FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, ILike, Repository } from 'typeorm';
import { type JwtPayload } from '../auth/types/jwt-payload.type';
import { Paginated } from '../common/types/paginated.type';
import { FindTasksDTO } from './dto/find-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Task not found!');
  }

  async getDetail(id: string, payload: JwtPayload) {
    const detailedItem = await this.findOne(id, { user: true }, { user: { id: true } });

    if (payload.sub !== detailedItem.user.id)
      throw new UnauthorizedException(`You can't get data from another user's task.`);

    return detailedItem;
  }

  async create(dto: CreateTaskDTO, payload: JwtPayload) {
    const newTask = this.tasksRepository.create({
      ...dto,
      user: { id: payload.sub }
    });

    await this.tasksRepository.save(newTask);

    return newTask;
  }

  async findAll(payload: JwtPayload, { search, sortBy, page, limit }: FindTasksDTO): Promise<Paginated<Task>> {
    const searchTerm = search?.trim();

    let order: FindOptionsOrder<Task> | undefined;

    switch (sortBy) {
      case TaskSortBy.DUE_DATE:
        order = { dueDate: 'asc' };
        break;

      case TaskSortBy.PRIORITY:
        order = { priority: 'desc' };
        break;

      case TaskSortBy.CREATED_AT:
        order = { createdAt: 'desc' };
        break;

      case TaskSortBy.UPDATED_AT:
        order = { updatedAt: 'desc' };
        break;

      default:
        order = { createdAt: 'desc' };
        break;
    }

    const [data, total] = await this.tasksRepository.findAndCount({
      where: searchTerm
        ? [
            { user: { id: payload.sub }, title: ILike(`%${searchTerm}%`) },
            { user: { id: payload.sub }, description: ILike(`%${searchTerm}%`) }
          ]
        : { user: { id: payload.sub } },
      order,
      relations: {
        user: true
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
  }

  async findOne(id: string, relations?: FindOptionsRelations<Task>, select?: FindOptionsSelect<Task>) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations,
      select
    });

    if (!task) this.throwNotFoundException();

    return task;
  }

  async update(id: string, dto: UpdateTaskDTO, payload: JwtPayload) {
    const task = await this.findOne(id, { user: true }, { user: { id: true } });

    if (!task) this.throwNotFoundException();

    if (payload.sub !== task.user.id) throw new UnauthorizedException(`You can't change another user task.`);

    Object.assign(task, dto);

    const response = await this.tasksRepository.save(task);

    const { user: _, ...data } = response;

    return data;
  }

  async remove(id: string, payload: JwtPayload) {
    const task = await this.findOne(id, { user: true }, { user: { id: true } });

    if (!task) this.throwNotFoundException();

    if (payload.sub !== task.user.id) throw new UnauthorizedException(`You can't delete another user task.`);

    return await this.tasksRepository.remove(task);
  }
}
