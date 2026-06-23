import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  throwNotFoundException(): never {
    throw new NotFoundException('Task not found!');
  }

  async create(dto: CreateTaskDTO) {
    const newTask = this.tasksRepository.create(dto);

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

  async update(id: string, dto: UpdateTaskDTO) {
    const updatedTask = await this.tasksRepository.preload({ id, ...dto });

    if (!updatedTask) this.throwNotFoundException();

    return await this.tasksRepository.save(updatedTask);
  }

  async remove(id: string) {
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
