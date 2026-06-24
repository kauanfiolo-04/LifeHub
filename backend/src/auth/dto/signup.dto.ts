import { CreateUserDTO } from '../../users/dto/create-user.dto';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDTO extends CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password!: string;
}
