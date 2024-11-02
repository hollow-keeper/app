import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { ItemService, Item } from '../../item';
import { CharacterPrinterService } from '../character-printer';
import { CharacterService } from '../character.service';
import { Character } from '../entities';
import { Equipment } from './entities';
import { PropertiesCalculatorService } from '../properties-calculator';

describe('EquipmentController', () => {
  let controller: EquipmentController;
  let mockEquipmentRepository: Partial<
    Record<keyof Repository<Equipment>, jest.Mock>
  >;
  let mockCharacterRepository: Partial<
    Record<keyof Repository<Character>, jest.Mock>
  >;
  let mockItemRepository: Partial<Record<keyof Repository<Item>, jest.Mock>>;
  let mockPropertiesCalculator: Partial<
    Record<keyof PropertiesCalculatorService, jest.Mock>
  >;
  let mockCharacterPrinterService: Partial<
    Record<keyof CharacterPrinterService, jest.Mock>
  >;

  beforeEach(async () => {
    mockEquipmentRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    mockCharacterRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    mockItemRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    mockPropertiesCalculator = {
      calculate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentController],
      providers: [
        EquipmentService,
        CharacterService,
        ItemService,
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
          provide: PropertiesCalculatorService,
          useValue: mockPropertiesCalculator,
        },
        {
          provide: CharacterPrinterService,
          useValue: mockCharacterPrinterService,
        },
      ],
    }).compile();

    controller = module.get<EquipmentController>(EquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
