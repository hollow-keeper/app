import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CharacteristicsDto {
  @ApiProperty()
  @IsNumber()
  level: number = 1;

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
