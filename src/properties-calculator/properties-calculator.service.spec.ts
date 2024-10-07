import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesCalculatorService } from './properties-calculator.service';
import { Character } from 'src/character/entities/character.entity';
import { Characteristics } from 'src/character/entities/characteristics.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';

const defaultEquipment = {
  helmet: null,
  armor: null,
  arms: null,
  legs: null,
  ring1: null,
  ring2: null,
  left_weapon_primary: null,
  right_weapon_primary: null,
  left_weapon_secondary: null,
  right_weapon_secondary: null,
  souls: 0,
  humanity: 0,
};

const weapon = {
  id: 1,
  name: 'noj',
  weight: 2,
  balance: 3,
  characteristics_bonus: {
    strength: 1,
    dexterity: 3,
  },
  properties_bonus: {
    armor: 2,
    balance: 4,
  },
};

const characteristics = {
  level: 4,
  vitality: 11,
  attunement: 8,
  endurance: 12,
  strength: 13,
  dexterity: 13,
  resistance: 11,
  intelligence: 9,
  faith: 9,
  perception: 0,
  charisma: 9,
};

const attunementTestCases = [
  { attunement: 9, expected: 0, description: 'attunement 9' },
  { attunement: 10, expected: 0, description: 'attunement 10' },
  { attunement: 11, expected: 1, description: 'attunement 11' },
  { attunement: 12, expected: 2, description: 'attunement 12' },
  { attunement: 14, expected: 3, description: 'attunement 14' },
  { attunement: 16, expected: 4, description: 'attunement 16' },
  { attunement: 19, expected: 5, description: 'attunement 19' },
  { attunement: 23, expected: 6, description: 'attunement 23' },
  { attunement: 28, expected: 7, description: 'attunement 28' },
  { attunement: 34, expected: 8, description: 'attunement 34' },
  { attunement: 41, expected: 9, description: 'attunement 41' },
  { attunement: 50, expected: 10, description: 'attunement 50' },
  { attunement: 99, expected: 10, description: 'attunement 99 (max)' },
];

describe('PropertiesCalculatorService', () => {
  let service: PropertiesCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertiesCalculatorService],
    }).compile();

    service = module.get<PropertiesCalculatorService>(
      PropertiesCalculatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('character should have properties', () => {
    const character = {
      equipment: {
        ...defaultEquipment,
        right_weapon_primary: weapon,
      },
      characteristics,
    };

    expect(service.calculate(character as unknown as Character)).toEqual({
      health: 594,
      stamina: 95,
      carryingCapacity: 52,
      unarmoredPhysicalProtection: 23,
      physicalProtection: 23,
      crushProtection: 23,
      slashProtection: 23,
      pierceProtection: 23,
      unarmoredMagicalProtection: 17,
      magicalProtection: 17,
      unarmoredFlameProtection: 20,
      flameProtection: 20,
      unarmoredFlashProtection: 16,
      flashProtection: 16,
      bleedingResistance: 48,
      poisonResistance: 36,
      curseResistance: 30,
      threat: 1,
      eloquence: 0,
      attentiveness: 0,
      luck: 100,
      spellSlots: 0,
      staminaRecoveryRate: 43,
      balanceRecoveryRate: 24,
      balance: 3,
      runLength: 7,
      stepLength: 3,
      runCost: 8,
      rollLength: 5,
      dodgeChance: 13,
      rollCost: 8,
      rollTime: 1,
      requiredSouls: 724,
      loaded: 2,
    });
  });

  it('should require correct souls quantitiy', () => {
    expect(service.requiredSouls(13)).toEqual(1038);
  });

  attunementTestCases.forEach(({ attunement, expected, description }) => {
    it(`should return ${expected} spell slots for ${description}`, () => {
      const characteristics: Partial<Characteristics> = { attunement };
      const equipment: Equipment = {} as Equipment;
      jest.spyOn(service, 'propertiesBonus').mockReturnValue({});

      expect(
        service.spellSlots(characteristics as Characteristics, equipment),
      ).toBe(expected);
    });
  });

  it('should add equipment bonus to spell slots', () => {
    const characteristics: Partial<Characteristics> = { attunement: 23 };
    const equipment: Equipment = {} as Equipment;
    jest.spyOn(service, 'propertiesBonus').mockReturnValue({ spellSlots: 2 });

    expect(
      service.spellSlots(characteristics as Characteristics, equipment),
    ).toBe(8); // 6 from attunement + 2 from equipment
  });
});
