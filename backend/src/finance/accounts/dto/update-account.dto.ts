import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAccountDTO } from './create-account.dto';

export class UpdateAccountDTO extends PartialType(OmitType(CreateAccountDTO, ['initialBalance'])) {}
