import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsString()
  name: string;

  //TODO: avatar
}
