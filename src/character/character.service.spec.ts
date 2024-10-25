import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PropertiesCalculatorService } from './properties-calculator';
import { GameClass, gameClasses } from './character.consts';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto';
import { CharacterPrinterService } from './character-printer';
import { ItemService } from '../item';
import { Character } from './entities/character.entity';

describe('CharacterService', () => {
  let service: CharacterService;
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
    };

    mockPropertiesCalculator = {
      calculate: jest.fn(),
      requiredSouls: jest.fn(),
    };

    mockItemService = {
      findByName: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        PropertiesCalculatorService,
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

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    mockRepository.create.mockReturnValue(createdCharacter);
    mockRepository.save.mockResolvedValue(createdCharacter);

    const result = await service.create(gameClass, createCharacterDto);

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

    const result = await service.findAll();

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

    mockRepository.findOne.mockResolvedValue(mockCharacter);
    mockPropertiesCalculator.calculate.mockReturnValue(mockProperties);

    const result = await service.findOne(1);

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

  it('should correctly convert souls to levels', async () => {
    const mockCharacter = {
      equipment: { souls: 3300 },
      characteristics: { level: 10 },
    };

    mockRepository.findOne.mockResolvedValue(mockCharacter);
    mockPropertiesCalculator.requiredSouls
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(1100)
      .mockReturnValueOnce(1200)
      .mockReturnValueOnce(1300)
      .mockReturnValueOnce(1400);

    const result = await service.getAvailableLevels(1);
    expect(result).toBe(3);
  });

  it('should return 0 if no souls', async () => {
    const character = {
      equipment: { souls: 0 },
      characteristics: { level: 10 },
    };

    mockPropertiesCalculator.requiredSouls.mockReturnValueOnce(1000);
    mockRepository.findOne.mockResolvedValue(character);

    const result = await service.getAvailableLevels(1);
    expect(result).toBe(0);
  });
});
