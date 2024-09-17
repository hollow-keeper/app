import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateHumanityDto {
  @ApiProperty()
  @IsNumber()
  humanity: number = 0;
}
