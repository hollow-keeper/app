import { Injectable } from '@nestjs/common';

import {
  CharacterStatsAdapter,
  CharacterStatsPrinter,
} from './character-stats';
import { Character, IProperties } from '../character';
import {
  CharacterEquipAdapter,
  CharacterEquipPrinter,
} from './character-equip';

@Injectable()
export class CharacterPrinterService {
  print(character: Character & { properties: IProperties }, length: number) {
    const characterStatAdapter = new CharacterStatsAdapter(character);
    const characterStatsPrinter = new CharacterStatsPrinter(
      characterStatAdapter,
      length,
    );
    const characterEquipAdapter = new CharacterEquipAdapter(character);
    const characterEquipPrinter = new CharacterEquipPrinter(
      characterEquipAdapter,
      length,
    );
    return characterStatsPrinter.print() + '\n' + characterEquipPrinter.print();
  }
}
