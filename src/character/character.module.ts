import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { PropertiesCalculatorModule } from 'src/properties-calculator/properties-calculator.module';
import { CharacterPrinterModule } from 'src/character-printer';

@Module({
  imports: [PropertiesCalculatorModule, TypeOrmModule.forFeature([Character]), CharacterPrinterModule],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
