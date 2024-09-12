import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { CharacteristicsDto } from './characteristics.dto';
import { EquipmentDto } from './equipment.dto';

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
  description: DescriptionDto;

  @ApiProperty()
  @ValidateNested()
  characteristics: CharacteristicsDto;

  @ApiProperty()
  @ValidateNested()
  equipment: EquipmentDto;
}
