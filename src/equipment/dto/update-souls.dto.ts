import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSoulsDto {
  @ApiProperty()
  @IsNumber()
  souls: number = 0;
}
