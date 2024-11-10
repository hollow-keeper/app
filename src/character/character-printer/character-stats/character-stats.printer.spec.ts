import { GameClass } from '../../character.consts';
import { CharacterStatsAdapter } from './character-stats.adapter';
import { CharacterStatsPrinter } from './character-stats.printer';

describe('CharacterStatsPrinter', () => {
  beforeEach(async () => {});

  it('should normal adapt', () => {
    const chars = new CharacterStatsAdapter({
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
    const printer = new CharacterStatsPrinter(chars, 70);
    expect(printer.print()).toEqual(` ----------------------------------------------------------------------
|                               test1                                |
----------------------------------------------------------------------
----------------------------------------------------------------------
 Уровень:                                                           8
----------------------------------------------------------------------
 Здоровье:                                                    82(d12)
 Ученость:                                                      1(d4)
 Выносливость:                                                  4(d4)
 Сила:                                                         11(d4)
 Ловкость:                                                      3(d4)
 Сопротив.:                                                    10(d4)
 Интеллект:                                                     7(d4)
 Вера:                                                       102(d20)
 Внимание:                                                    62(d10)
 Харизма:                                                       2(d4)

======================================================================
 Здоровье:                                               29(1 points)
 Выносливость:                                          44(27 points)
 Скорость восстановления выносливости:                             45
 Загруженность:                                             30.0/22.0
 Скорость восстановления баланса:                                  20
 Длина шага:                                                       46
 Длина бега:                                                       41
 Стоимость бега:                                                   40
 Уворот:                                                           25
 Длина переката:                                                   38
 Скорость переката:                                                39
 Стоимость переката:                                               37
 Душ до следующего уровня:                                         36
----------------------------------------------------------------------
 Пр. оружие 1:                                                      0
 Пр. оружие 2:                                                      0
 Лев. оружие 1:                                                     0
 Лев. оружие 2:                                                     0
----------------------------------------------------------------------
 Физ. защита:                                        33(51)(6 points)
 От ударов:                                            23()(4 points)
 От рез. ударов:                                       42()(7 points)
 От выпадов:                                           34()(6 points)
 Защ. от магии:                                      32(50)(5 points)
 Защ. от огня:                                       27(48)(4 points)
 Защ. от молнии:                                     28(49)(5 points)

======================================================================
 Баланс:                                                19(15 points)
 Сопр. к кровотеч.:                                      21(7 points)
 Сопр. к отравлен.:                                     35(11 points)
 Сопр. к проклят.:                                       24(8 points)
----------------------------------------------------------------------
 Угроза:                                                       47(d8)
 Убеждение:                                                    26(d6)
 Внимание:                                                     18(d4)
 Поиск предметов:                                              31(1%)

======================================================================`);
  });
});
