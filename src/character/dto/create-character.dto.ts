import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';
import { CharacteristicsDto } from './characteristics.dto';

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

class EquipmentDto {
  @ApiProperty()
  @IsString()
  helmet?: string;

  @ApiProperty()
  @IsString()
  armor?: string;

  @ApiProperty()
  @IsString()
  arms?: string;

  @ApiProperty()
  @IsString()
  legs?: string;

  @ApiProperty()
  @IsString()
  ring1?: string;

  @ApiProperty()
  @IsString()
  ring2?: string;

  @ApiProperty()
  @IsString()
  left_weapon_primary?: string;

  @ApiProperty()
  @IsString()
  right_weapon_primary?: string;

  @ApiProperty()
  @IsString()
  left_weapon_secondary?: string;

  @ApiProperty()
  @IsString()
  right_weapon_secondary?: string;

  @ApiProperty()
  @IsNumber()
  souls: number = 0;

  @ApiProperty()
  @IsNumber()
  humanity: number = 0;

  // @Column()
  // spells: ISpell[] = [];
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
