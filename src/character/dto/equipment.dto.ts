import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EquipmentDto {
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
