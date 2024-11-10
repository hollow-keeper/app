import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Equipment } from './entities';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { ItemModule } from '../../item';
import { CharacterModule } from '../character.module';

@Module({
  imports: [ItemModule, CharacterModule, TypeOrmModule.forFeature([Equipment])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
