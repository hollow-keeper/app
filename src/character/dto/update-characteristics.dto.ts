import { PartialType } from '@nestjs/mapped-types';
import { CharacteristicsDto } from './characteristics.dto';

export class UpdateCharacteristicsDto extends PartialType(CharacteristicsDto) {}
