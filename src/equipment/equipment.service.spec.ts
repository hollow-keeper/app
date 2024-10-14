import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentService } from './equipment.service';
import { Repository } from 'typeorm';
import { Equipment } from './entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character, CharacterService } from '../character';
import { ItemService, Item } from '../item';
import { PropertiesCalculatorService } from '../properties-calculator';
import { CharacterPrinterService } from '../character-printer';

describe('EquipmentService', () => {
  let service: EquipmentService;

  let mockEquipmentRepository: Partial<
    Record<keyof Repository<Equipment>, jest.Mock>
  >;
  let mockCharacterRepository: Partial<
    Record<keyof Repository<Character>, jest.Mock>
  >;
  let mockItemRepository: Partial<Record<keyof Repository<Item>, jest.Mock>>;
  let mockCharacterPrinterService: Partial<
    Record<keyof CharacterPrinterService, jest.Mock>
  >;

  beforeEach(async () => {
    mockEquipmentRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    mockCharacterRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    mockItemRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentService,
        CharacterService,
        ItemService,
        PropertiesCalculatorService,
        {
          provide: getRepositoryToken(Equipment),
          useValue: mockEquipmentRepository,
        },
        {
          provide: getRepositoryToken(Character),
          useValue: mockCharacterRepository,
        },
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
        {
          provide: CharacterPrinterService,
          useValue: mockCharacterPrinterService,
        },
      ],
    }).compile();

    service = module.get<EquipmentService>(EquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
