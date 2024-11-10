import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CharacterPrinterService } from './character-printer';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character } from './entities';
import { PropertiesCalculatorService } from './properties-calculator';
import { ItemService } from '../item';
import { GameClass, gameClasses } from './character.consts';
import { CreateCharacterDto } from './dto';

describe('CharacterController', () => {
  let controller: CharacterController;
  let mockRepository: Partial<Record<keyof Repository<Character>, jest.Mock>>;
  let mockPropertiesCalculator: Partial<
    Record<keyof PropertiesCalculatorService, jest.Mock>
  >;
  let mockCharacterPrinterService: Partial<
    Record<keyof CharacterPrinterService, jest.Mock>
  >;
  let mockItemService: Partial<Record<keyof ItemService, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    mockPropertiesCalculator = {
      calculate: jest.fn(),
    };

    mockCharacterPrinterService = {
      print: jest.fn(),
    };
    mockPropertiesCalculator = {
      calculate: jest.fn(),
      requiredSouls: jest.fn(),
    };

    mockItemService = {
      findByName: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        CharacterService,
        {
          provide: getRepositoryToken(Character),
          useValue: mockRepository,
        },
        {
          provide: PropertiesCalculatorService,
          useValue: mockPropertiesCalculator,
        },
        {
          provide: CharacterPrinterService,
          useValue: mockCharacterPrinterService,
        },
        {
          provide: ItemService,
          useValue: mockItemService,
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create character', async () => {
    const gameClass: GameClass = 'warrior' as GameClass;
    const createCharacterDto: CreateCharacterDto = {
      name: 'Test Character',
      origin: 'Test Origin',
    };

    const expectedCharacterData = {
      description: {
        name: createCharacterDto.name,
        origin: createCharacterDto.origin,
        game_class: gameClass,
      },
      characteristics: gameClasses[gameClass].characteristics,
      equipment: {
        humanity: 0,
        right_weapon_primary: undefined,
        souls: 0,
      },
    };

    const createdCharacter = { id: 1, ...expectedCharacterData };
    mockRepository.create.mockReturnValueOnce(createdCharacter);
    mockRepository.save.mockResolvedValueOnce(createdCharacter);

    const result = await controller.create(gameClass, createCharacterDto);

    expect(mockRepository.create).toHaveBeenCalledWith(expectedCharacterData);
    expect(mockRepository.save).toHaveBeenCalledWith(createdCharacter);
    expect(result).toEqual(createdCharacter);
  });

  it('should return all characters with mapped descriptions', async () => {
    const mockCharacters = [
      {
        id: 1,
        description: {
          name: 'Character 1',
          origin: 'Origin 1',
          game_class: 'Warrior',
        },
      },
      {
        id: 2,
        description: {
          name: 'Character 2',
          origin: 'Origin 2',
          game_class: 'Mage',
        },
      },
    ];

    mockRepository.find.mockResolvedValue(mockCharacters);

    const result = await controller.findAll();

    expect(mockRepository.find).toHaveBeenCalledWith({
      relations: { description: true },
    });
    expect(result).toEqual([
      { id: 1, name: 'Character 1', origin: 'Origin 1', game_class: 'Warrior' },
      { id: 2, name: 'Character 2', origin: 'Origin 2', game_class: 'Mage' },
    ]);
  });

  it('should return a character with calculated properties', async () => {
    const mockCharacter = {
      id: 1,
      description: { name: 'Test Character' },
      characteristics: { strength: 10 },
      equipment: {
        helmet: { name: 'Test Helmet' },
        armor: { name: 'Test Armor' },
        arms: { name: 'Test Arms' },
        legs: { name: 'Test Legs' },
        ring1: { name: 'Test Ring 1' },
        ring2: { name: 'Test Ring 2' },
        left_weapon_primary: { name: 'Test Left Weapon' },
        right_weapon_primary: { name: 'Test Right Weapon' },
        left_weapon_secondary: { name: 'Test Left Secondary' },
        right_weapon_secondary: { name: 'Test Right Secondary' },
      },
    };

    const mockProperties = { health: 100, stamina: 100 };

    mockRepository.findOne.mockResolvedValueOnce(mockCharacter);
    mockPropertiesCalculator.calculate.mockReturnValueOnce(mockProperties);

    const result = await controller.findOne(1);

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: {
        description: true,
        characteristics: true,
        equipment: {
          helmet: true,
          armor: true,
          arms: true,
          legs: true,
          ring1: true,
          ring2: true,
          left_weapon_primary: true,
          right_weapon_primary: true,
          left_weapon_secondary: true,
          right_weapon_secondary: true,
        },
      },
    });
    expect(mockPropertiesCalculator.calculate).toHaveBeenCalledWith(
      mockCharacter,
    );
    expect(result).toEqual({ ...mockCharacter, properties: mockProperties });
  });

  it('should throw exception if didnt found character', async () => {
    await expect(controller.findOne(1)).rejects.toThrow(
      'Character with ID 1 not found',
    );
  });

  it('should correctly convert souls to levels', async () => {
    const mockCharacter = {
      equipment: { souls: 3300 },
      characteristics: { level: 10 },
    };

    mockRepository.findOne.mockResolvedValueOnce(mockCharacter);
    mockPropertiesCalculator.requiredSouls
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(1100)
      .mockReturnValueOnce(1200)
      .mockReturnValueOnce(1300)
      .mockReturnValueOnce(1400);

    const result = await controller.getAvailableLevels(1);
    expect(result).toBe(3);
  });

  it('should return 0 if no souls', async () => {
    const character = {
      equipment: { souls: 0 },
      characteristics: { level: 10 },
    };

    mockPropertiesCalculator.requiredSouls.mockReturnValueOnce(1000);
    mockRepository.findOne.mockResolvedValueOnce(character);

    const result = await controller.getAvailableLevels(1);
    expect(result).toBe(0);
  });

  it('should levelup character', async () => {
    const character = {
      equipment: { souls: 1000 },
      characteristics: { level: 10, attunement: 7 },
    };
    mockRepository.findOne.mockResolvedValueOnce(character);
    mockRepository.save.mockResolvedValueOnce(character);
    const result = await controller.levelup(1, {
      attunement: 8,
    });

    expect(mockRepository.save).toHaveBeenCalledWith({
      ...character,
      characteristics: {
        ...character.characteristics,
        attunement: 8,
        level: 11,
      },
    });
    expect(result).toEqual(character);
  });

  it('should not levelup character', async () => {
    const character = {
      equipment: { souls: 1000 },
      characteristics: { level: 10, attunement: 7 },
    };
    mockRepository.findOne.mockResolvedValueOnce(character);
    mockRepository.save.mockResolvedValueOnce(character);
    const result = await controller.levelup(1, {
      attunement: 7,
    });

    expect(mockRepository.save).toHaveBeenCalledTimes(0);
    expect(result).toEqual(character);
  });

  it('should throw error because of souls', async () => {
    const character = {
      equipment: { souls: 0 },
      characteristics: { level: 10, attunement: 7 },
    };
    mockPropertiesCalculator.requiredSouls.mockResolvedValueOnce(20000);
    mockRepository.findOne.mockResolvedValueOnce(character);
    mockRepository.save.mockResolvedValueOnce(character);
     await expect(controller.levelup(1, {
      attunement: 8,
    })).rejects.toThrow(`Not enough souls, current: 0, needed: 20000`);
  });

  it('should delete character', async () => {
    await controller.remove(1);

    expect(mockRepository.delete).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it('should print character', async () => {
    mockRepository.findOne.mockResolvedValueOnce({
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
    mockCharacterPrinterService.print.mockResolvedValueOnce('print');
    const result = await controller.printCharacterSheet(1, 70);

    expect(result).toEqual('print');
  });

  it('should print character', async () => {
    mockRepository.findOne.mockResolvedValueOnce({
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
    mockCharacterPrinterService.print.mockResolvedValueOnce('print');
    const result = await controller.printCharacterSheet(1);

    expect(result).toEqual('print');
  });
});
