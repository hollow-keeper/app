import { GameClass } from '../../character.consts';
import { CharacterEquipAdapter } from './character-equip.adapter';
import { CharacterEquipPrinter } from './character-equip.printer';

describe('CharacterEquipPrinter', () => {
  beforeEach(async () => {});

  it('should normal adapt', () => {
    const chars = new CharacterEquipAdapter({
      characteristics: {
        attunement: 1,
        charisma: 2,
        dexterity: 3,
        endurance: 4,
        faith: 102,
        id: 6,
        intelligence: 7,
        level: 8,
        perception: 62,
        resistance: 10,
        strength: 11,
        vitality: 82,
      },
      description: {
        game_class: GameClass.bandit,
        id: 13,
        name: 'test1',
        origin: 'test2',
      },
      equipment: {
        humanity: 14,
        id: 15,
        souls: 16,
        helmet: {
          name: 'helmet',
        } as any,
        armor: {
          name: 'armor',
        } as any,
        arms: {
          name: 'arms',
        } as any,
        left_weapon_primary: {
          name: 'left_weapon_primary',
        } as any,
        left_weapon_secondary: {
          name: 'left_weapon_secondary',
        } as any,
        legs: {
          name: 'legs',
        } as any,
        right_weapon_primary: {
          name: 'right_weapon_primary',
        } as any,
        right_weapon_secondary: {
          name: 'right_weapon_secondary',
        } as any,
        ring1: {
          name: 'ring1',
        } as any,
        ring2: {
          name: 'ring2',
        } as any,
      },
      id: 17,
      properties: {
        attentiveness: 18,
        balance: 19,
        balanceRecoveryRate: 20,
        bleedingResistance: 21,
        carryingCapacity: 22,
        crushProtection: 23,
        curseResistance: 24,
        dodgeChance: 25,
        eloquence: 26,
        flameProtection: 27,
        flashProtection: 28,
        health: 29,
        loaded: 30,
        luck: 31,
        magicalProtection: 32,
        physicalProtection: 33,
        pierceProtection: 34,
        poisonResistance: 35,
        requiredSouls: 36,
        rollCost: 37,
        rollLength: 38,
        rollTime: 39,
        runCost: 40,
        runLength: 41,
        slashProtection: 42,
        spellSlots: 43,
        stamina: 44,
        staminaRecoveryRate: 45,
        stepLength: 46,
        threat: 47,
        unarmoredFlameProtection: 48,
        unarmoredFlashProtection: 49,
        unarmoredMagicalProtection: 50,
        unarmoredPhysicalProtection: 51,
      },
    });
    const printer = new CharacterEquipPrinter(chars, 70);
    expect(printer.print()).toEqual(` Уровень:                                                           8
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

======================================================================`);
  });
});
