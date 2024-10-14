import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities';
import { PropertiesCalculatorModule } from '../properties-calculator';
import { CharacterPrinterModule } from '../character-printer';
import { ItemModule } from '../item';

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
