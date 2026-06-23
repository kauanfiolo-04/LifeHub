import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsArray } from 'class-validator';

export class UpdateNoteDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}
