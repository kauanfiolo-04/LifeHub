import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayload } from '../auth/decorators/user.decorator';
import { type JwtPayload } from '../auth/types/jwt-payload.type';
import { FindTasksDTO } from './dto/find-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateTaskDTO, @TokenPayload() payload: JwtPayload) {
    return this.tasksService.create(body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@TokenPayload() payload: JwtPayload, @Query() query: FindTasksDTO) {
    return this.tasksService.findAll(payload, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.tasksService.getDetail(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDTO, @TokenPayload() payload: JwtPayload) {
    return this.tasksService.update(id, body, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayload() payload: JwtPayload) {
    return this.tasksService.remove(id, payload);
  }
}
