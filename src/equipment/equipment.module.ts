import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { CharacterModule } from '../character';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities';
import { ItemModule } from '../item';

@Module({
  imports: [ItemModule, CharacterModule, TypeOrmModule.forFeature([Equipment])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
