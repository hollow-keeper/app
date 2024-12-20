import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

import { EDamageType } from '../../entities';

export class CreateWeaponDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNumber()
  balance: number;

  @ApiProperty({
    nullable: true,
    type: 'object',
    example: { dexterity: 3, strength: 1 },
  })
  @IsObject()
  characteristics_bonus?: Record<string, number>;

  @ApiProperty({
    nullable: true,
    type: 'object',
    example: { armor: 2, balance: 4 },
  })
  @IsObject()
  properties_bonus?: Record<string, number>;

  @ApiProperty()
  @IsNumber()
  damage: number;

  @ApiProperty()
  @IsNumber()
  damage_type: EDamageType;
}
