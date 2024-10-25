import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EquipmentDto {
  @ApiProperty({ nullable: true, default: 7 })
  @IsNumber()
  helmet_id?: number;

  @ApiProperty({ nullable: true, default: null })
  @IsNumber()
  armor_id?: number;

  @ApiProperty({ nullable: true, default: 8 })
  @IsNumber()
  arms_id?: number;

  @ApiProperty({ nullable: true, default: null })
  @IsNumber()
  legs_id?: number;

  @ApiProperty({ nullable: true, default: null })
  @IsNumber()
  ring1_id?: number;

  @ApiProperty({ nullable: true, default: null })
  @IsNumber()
  ring2_id?: number;

  @ApiProperty({ nullable: true, default: 5 })
  @IsNumber()
  left_weapon_primary_id?: number;

  @ApiProperty({ nullable: true, default: 1 })
  @IsNumber()
  right_weapon_primary_id?: number;

  @ApiProperty({ nullable: true, default: 8 })
  @IsNumber()
  left_weapon_secondary_id?: number;

  @ApiProperty({ nullable: true, default: 6 })
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
