import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccountType } from '../enum/account-type.enum';

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNumber()
  @IsOptional()
  initialBalance?: number;

  @IsEnum(AccountType)
  type!: AccountType;
}
