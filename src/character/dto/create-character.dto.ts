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
