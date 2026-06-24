import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';
import { TaskPriority } from '../enum/task-priority.enum';
import { Type } from 'class-transformer';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  dueDate?: Date;
}
