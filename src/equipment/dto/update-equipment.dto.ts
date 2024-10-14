import { OmitType, PartialType } from '@nestjs/mapped-types';

import { EquipmentDto } from './equipment.dto';

export class UpdateEquipmentDto extends PartialType(
  OmitType(EquipmentDto, ['souls', 'humanity']),
) {}
