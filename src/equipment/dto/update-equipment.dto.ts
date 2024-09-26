import { EquipmentDto } from './equipment.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateEquipmentDto extends PartialType(
  OmitType(EquipmentDto, ['souls', 'humanity']),
) {}
