import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskSortBy } from '../enum/task-sort-by';

export class GetTasksDTO {
  @IsOptional()
  @IsEnum(TaskSortBy)
  sortBy?: TaskSortBy = TaskSortBy.CREATED_AT;

  @IsOptional()
  @IsString()
  search?: string;
}
