import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character } from './entities';
import { CharacterPrinterModule } from '../character-printer';
import { ItemModule } from '../item';
import { PropertiesCalculatorModule } from '../properties-calculator';

@Module({
  imports: [
    PropertiesCalculatorModule,
    TypeOrmModule.forFeature([Character]),
    CharacterPrinterModule,
    ItemModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
