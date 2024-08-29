import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';

class DescriptionDto {
  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  game_class: string;
}

class CharacteristicsDto {
  @ApiProperty()
  @IsNumber()
  level: number;

  @ApiProperty()
  @IsNumber()
  vitality: number;

  @ApiProperty()
  @IsNumber()
  attunement: number;

  @ApiProperty()
  @IsNumber()
  endurance: number;

  @ApiProperty()
  @IsNumber()
  strength: number;

  @ApiProperty()
  @IsNumber()
  dexterity: number;

  @ApiProperty()
  @IsNumber()
  resistance: number;

  @ApiProperty()
  @IsNumber()
  intelligence: number;

  @ApiProperty()
  @IsNumber()
  faith: number;

  @ApiProperty()
  @IsNumber()
  perception: number;

  @ApiProperty()
  @IsNumber()
  charisma: number;
}

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  @ValidateNested()
  description: DescriptionDto;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  @ValidateNested()
  characteristics: CharacteristicsDto;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  equipment: string;
}
