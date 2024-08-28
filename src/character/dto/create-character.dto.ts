import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  description: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  characteristics: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  equipment: string;
}
