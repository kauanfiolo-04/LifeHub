import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class FindTransactionDTO extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  accountName?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
