import { GameClass } from '../../character.consts';
import { CharacterStatsAdapter } from './character-stats.adapter';

describe('CharacterStatsAdapter', () => {
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
    expect(chars.name).toEqual('test1');
    expect(chars.level).toEqual('8');
    expect(chars.vitality).toEqual('82(d12)');
    expect(chars.attunement).toEqual('1(d4)');
    expect(chars.endurance).toEqual('4(d4)');
    expect(chars.strength).toEqual('11(d4)');
    expect(chars.dexterity).toEqual('3(d4)');
    expect(chars.resistance).toEqual('10(d4)');
    expect(chars.intelligence).toEqual('7(d4)');
    expect(chars.faith).toEqual('102(d20)');
    expect(chars.perception).toEqual('62(d10)');
    expect(chars.charisma).toEqual('2(d4)');
    expect(chars.health).toEqual('29(1 points)');

    expect(chars.stamina).toEqual('44(27 points)');
    expect(chars.staminaRecoveryRate).toEqual('45');
    expect(chars.loading).toEqual('30.0/22.0');
    expect(chars.balanceRecoveryRate).toEqual('20');
    expect(chars.stepLength).toEqual('46');
    expect(chars.runLength).toEqual('41');
    expect(chars.runCost).toEqual('40');
    expect(chars.dodgeChance).toEqual('25');
    expect(chars.rollLength).toEqual('38');
    expect(chars.rollSpeed).toEqual('39');
    expect(chars.rollCost).toEqual('37');
    expect(chars.requiredSouls).toEqual('36');
    expect(chars.rightHand1Damage).toEqual('0');
    expect(chars.rightHand2Damage).toEqual('0');
    expect(chars.leftHand1Damage).toEqual('0');
    expect(chars.leftHand2Damage).toEqual('0');
    expect(chars.physicalProtection).toEqual('33(51)(6 points)');
    expect(chars.crushProtection).toEqual('23()(4 points)');
    expect(chars.slashProtection).toEqual('42()(7 points)');
    expect(chars.pierceProtection).toEqual('34()(6 points)');
    expect(chars.magicalProtection).toEqual('32(50)(5 points)');
    expect(chars.flameProtection).toEqual('27(48)(4 points)');
    expect(chars.flashProtection).toEqual('28(49)(5 points)');
    expect(chars.balance).toEqual('19(15 points)');
    expect(chars.bleedingResistance).toEqual('21(7 points)');
    expect(chars.poisonResistance).toEqual('35(11 points)');
    expect(chars.curseResistance).toEqual('24(8 points)');
    expect(chars.threat).toEqual('47(d8)');
    expect(chars.eloquence).toEqual('26(d6)');
    expect(chars.attentiveness).toEqual('18(d4)');
    expect(chars.luck).toEqual('31(1%)');
  });
});
