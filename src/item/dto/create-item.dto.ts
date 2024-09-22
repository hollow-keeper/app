import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateItemDto {
  name: string;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNumber()
  balance: number;

  @ApiProperty()
  characteristics_bonus?: Record<string, string>;

  @ApiProperty()
  properties_bonus?: Record<string, string>;
}
