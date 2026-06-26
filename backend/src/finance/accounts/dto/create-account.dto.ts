import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AccountType } from '../enum/account-type.enum';

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEnum(AccountType)
  type!: AccountType;
}
