import { Injectable } from '@nestjs/common';

import { Character, IProperties } from '..';
import {
  CharacterEquipAdapter,
  CharacterEquipPrinter,
} from './character-equip';
import {
  CharacterStatsAdapter,
  CharacterStatsPrinter,
} from './character-stats';

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
