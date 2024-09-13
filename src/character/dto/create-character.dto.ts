import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested, IsDefined } from 'class-validator';
import { EquipmentDto } from './equipment.dto';
import { Type } from 'class-transformer';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsString()
  name: string;

  //TODO:
  @IsDefined()
  @ApiProperty()
  @ValidateNested()
  @Type(() => EquipmentDto)
  equipment: EquipmentDto;

  //avatar
}
