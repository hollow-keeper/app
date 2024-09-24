import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EquipmentDto {
  @ApiProperty()
  @IsNumber()
  helmet_id?: number;

  @ApiProperty()
  @IsNumber()
  armor_id?: number;

  @ApiProperty()
  @IsNumber()
  arms_id?: number;

  @ApiProperty()
  @IsNumber()
  legs_id?: number;

  @ApiProperty()
  @IsNumber()
  ring1_id?: number;

  @ApiProperty()
  @IsNumber()
  ring2_id?: number;

  @ApiProperty()
  @IsNumber()
  left_weapon_primary_id?: number;

  @ApiProperty()
  @IsNumber()
  right_weapon_primary_id?: number;

  @ApiProperty()
  @IsNumber()
  left_weapon_secondary_id?: number;

  @ApiProperty()
  @IsNumber()
  right_weapon_secondary_id?: number;

  @ApiProperty()
  @IsNumber()
  souls: number = 0;

  @ApiProperty()
  @IsNumber()
  humanity: number = 0;

  // @Column()
  // spells: ISpell[] = [];
}
