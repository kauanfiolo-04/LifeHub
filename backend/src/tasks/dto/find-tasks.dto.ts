import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TaskSortBy } from '../enum/task-sort-by';
import { TaskStatus } from '../enum/task-status.enum';
import { Transform } from 'class-transformer';
import { TaskPriority } from '../enum/task-priority.enum';
import { TaskDateFilter } from '../enum/task-date-filter.enum';

// aceita "a,b" ou ?status=a&status=b
const toArray = (value: unknown): string[] | undefined => {
  const raw: unknown[] = Array.isArray(value) ? value : [value];

  const items = raw
    .filter((item): item is string | number => typeof item === 'string' || typeof item === 'number')
    .flatMap(item => String(item).split(','))
    .map(item => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
};

export class FindTasksDTO extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskSortBy)
  sortBy?: TaskSortBy;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => toArray(value))
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  status?: TaskStatus[];

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => toArray(value)?.map(Number)) // priority é number
  @IsArray()
  @IsEnum(TaskPriority, { each: true })
  priority?: TaskPriority[];

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => toArray(value))
  @IsArray()
  @IsEnum(TaskDateFilter, { each: true })
  dateFilters?: TaskDateFilter[];
}
