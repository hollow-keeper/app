import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { CharacteristicsDto } from './characteristics.dto';
import { EquipmentDto } from './equipment.dto';
import { Type } from 'class-transformer';

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

export class CreateCharacterDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => DescriptionDto)
  description: DescriptionDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CharacteristicsDto)
  characteristics: CharacteristicsDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => EquipmentDto)
  equipment: EquipmentDto;
}
