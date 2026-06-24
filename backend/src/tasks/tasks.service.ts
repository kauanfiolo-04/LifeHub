import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type JwtPayload } from '../auth/types/jwt-payload.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Task not found!');
  }

  @UseGuards(AuthGuard)
  async create(dto: CreateTaskDTO, payload: JwtPayload) {
    const newTask = this.tasksRepository.create({
      userId: payload.sub,
      ...dto
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

  @UseGuards(AuthGuard)
  async update(id: string, dto: UpdateTaskDTO, payload: JwtPayload) {
    if (payload.sub !== id) throw new UnauthorizedException(`You can't change another user task.`);

    const updatedTask = await this.tasksRepository.preload({ id, ...dto });

    if (!updatedTask) this.throwNotFoundException();

    return await this.tasksRepository.save(updatedTask);
  }

  @UseGuards(JwtAuthGuard)
  async remove(id: string, payload: JwtPayload) {
    if (payload.sub !== id) throw new UnauthorizedException(`You can't delete another user task.`);

    const task = await this.findOne(id);

    return await this.tasksRepository.remove(task);
  }

  // toggleComplete(id: string): Task {
  //   const task = this.findOne(id);

  //   return this.update(id, {
  //     completed: !task.completed
  //   });
  // }
}
