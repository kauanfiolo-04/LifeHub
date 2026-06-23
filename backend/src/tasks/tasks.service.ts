import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(dto: CreateTaskDTO): Task {
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException(`Task com id ${id} não encontrada`);
    }

    return task;
  }

  update(id: string, dto: UpdateTaskDTO): Task {
    const task = this.findOne(id);

    const updatedTask: Task = {
      ...task,
      ...dto,
      updatedAt: new Date()
    };

    const index = this.tasks.findIndex(t => t.id === id);
    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  remove(id: string): void {
    const taskIndex = this.tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task com id ${id} não encontrada`);
    }

    this.tasks.splice(taskIndex, 1);
  }

  toggleComplete(id: string): Task {
    const task = this.findOne(id);

    return this.update(id, {
      completed: !task.completed
    });
  }
}
