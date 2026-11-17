import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { NotesSortBy } from '../enum/notes-sort-by';

export class FindNotesDTO extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(NotesSortBy)
  orderBy?: NotesSortBy;
}
