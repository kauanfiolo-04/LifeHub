import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import {
  Between,
  type FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  Repository
} from 'typeorm';
import { type JwtPayload } from '../auth/types/jwt-payload.type';
import { Paginated } from '../common/types/paginated.type';
import { FindTasksDTO } from './dto/find-tasks.dto';
import { TaskDateFilter } from './enum/task-date-filter.enum';
import { TaskSortBy } from './enum/task-sort-by';

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

  private buildDateWhere(filter: TaskDateFilter): FindOptionsWhere<Task> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);

    switch (filter) {
      case TaskDateFilter.TODAY:
        return { dueDate: Between(startOfDay, endOfDay) };

      case TaskDateFilter.THIS_WEEK: {
        const endOfWeek = new Date(startOfDay);
        endOfWeek.setDate(startOfDay.getDate() + (6 - startOfDay.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        return { dueDate: Between(startOfDay, endOfWeek) };
      }

      case TaskDateFilter.OVERDUE:
        return { dueDate: LessThan(startOfDay) };

      case TaskDateFilter.NO_DATE:
        return { dueDate: IsNull() };

      default:
        return {};
    }
  }

  private buildOrder(sortBy?: TaskSortBy): FindOptionsOrder<Task> {
    switch (sortBy) {
      case TaskSortBy.DUE_DATE:
        return { dueDate: 'asc' };
      case TaskSortBy.PRIORITY:
        return { priority: 'desc' };
      case TaskSortBy.CREATED_AT:
        return { createdAt: 'desc' };
      case TaskSortBy.UPDATED_AT:
        return { updatedAt: 'desc' };
      default:
        return { createdAt: 'desc' };
    }
  }

  async findAll(
    payload: JwtPayload,
    { search, sortBy, page, limit, status, priority, dateFilters }: FindTasksDTO
  ): Promise<Paginated<Task>> {
    const searchTerm = search?.trim();

    const baseWhere: FindOptionsWhere<Task> = {
      user: { id: payload.sub },
      ...(status?.length && { status: In(status) }),
      ...(priority?.length && { priority: In(priority) })
    };

    const dateClauses: FindOptionsWhere<Task>[] = dateFilters?.length
      ? dateFilters.map(f => this.buildDateWhere(f))
      : [{}];

    const searchClauses: FindOptionsWhere<Task>[] = searchTerm
      ? [{ title: ILike(`%${searchTerm}%`) }, { description: ILike(`%${searchTerm}%`) }]
      : [{}];

    const where = dateClauses.flatMap(date => searchClauses.map(s => ({ ...baseWhere, ...date, ...s })));

    const [data, total] = await this.tasksRepository.findAndCount({
      where,
      order: this.buildOrder(sortBy),
      relations: { user: true },
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
