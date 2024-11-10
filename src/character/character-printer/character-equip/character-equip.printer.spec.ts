import { GameClass } from '../../character.consts';
import { CharacterEquipAdapter } from './character-equip.adapter';
import { CharacterEquipPrinter } from './character-equip.printer';

describe('CharacterEquipPrinter', () => {
  beforeEach(async () => {});

  it('should normal adapt', () => {
    const chars = {
      level: '8',
      souls: '16',
      humanity: '14',
      helmet: 'helmet',
      armor: 'armor',
      arms: 'arms',
      legs: 'legs',
      ring1: 'ring1',
      ring2: 'ring2',
      leftWeapon1: 'left_weapon_primary',
      rightWeapon1: 'right_weapon_primary',
      leftWeapon2: 'left_weapon_secondary',
      rightWeapon2: 'right_weapon_secondary',
      spells: [
        {
          key: 'test',
          value: '10',
        },
      ],
      spellSlots: '43',
    };

    const printer = new CharacterEquipPrinter(chars as any, 70);
    expect(printer.print())
      .toEqual(` Уровень:                                                           8
 Души:                                                             16
 Человечность:                                                     14
----------------------------------------------------------------------
 Шлем:                                                         helmet
 Доспех:                                                        armor
 Руки:                                                           arms
 Ноги:                                                           legs
 Кольцо:                                                        ring1
 Кольцо:                                                        ring2
 Активное левое оружие:                           left_weapon_primary
 Активное правое оружие:                         right_weapon_primary
 Не активное левое оружие:                      left_weapon_secondary
 Не активное правое оружие:                    right_weapon_secondary
----------------------------------------------------------------------
 Ячеек магии:                                                      43
    test:                                                          10

======================================================================`);
  });
});
