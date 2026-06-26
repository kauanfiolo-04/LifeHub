import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type JwtPayload } from '../auth/types/jwt-payload.type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Task not found!');
  }

  async create(dto: CreateTaskDTO, payload: JwtPayload) {
    const newTask = this.tasksRepository.create({
      ...dto,
      user: { id: payload.sub }
    });

    await this.tasksRepository.save(newTask);

    return newTask;
  }

  async findAll() {
    const tasks = await this.tasksRepository.find({ order: { createdAt: 'desc' } });

    return tasks;
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) this.throwNotFoundException();

    return task;
  }

  async update(id: string, dto: UpdateTaskDTO, payload: JwtPayload) {
    const updatedTask = await this.tasksRepository.preload({ id, ...dto });

    if (!updatedTask) this.throwNotFoundException();

    if (payload.sub !== updatedTask.user.id) throw new UnauthorizedException(`You can't change another user task.`);

    return await this.tasksRepository.save(updatedTask);
  }

  async remove(id: string, payload: JwtPayload) {
    const task = await this.findOne(id);

    if (payload.sub !== task.user.id) throw new UnauthorizedException(`You can't delete another user task.`);

    return await this.tasksRepository.remove(task);
  }
}
