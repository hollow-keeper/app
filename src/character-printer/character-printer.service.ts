import { Injectable } from '@nestjs/common';
import {
  CharacterStatsAdapter,
  CharacterStatsPrinter,
} from './character-stats';
import { Character } from 'src/character/entities/character.entity';
import { IProperties } from 'src/properties-calculator/properties-calculator.types';

@Injectable()
export class CharacterPrinterService {
  print(character: Character & { properties: IProperties }, length: number) {
    const characterStatAdapter = new CharacterStatsAdapter(character);
    const characterStatsPrinter = new CharacterStatsPrinter(
      characterStatAdapter,
      length,
    );
    return `${characterStatsPrinter.print()}`;
  }
}
