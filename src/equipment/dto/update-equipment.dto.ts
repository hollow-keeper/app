import { PartialType } from '@nestjs/swagger';
import { EquipmentDto } from './equipment.dto';

export class UpdateEquipmentDto extends PartialType(EquipmentDto) {}
