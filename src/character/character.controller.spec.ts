import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { PropertiesCalculatorService } from '../properties-calculator';
import { Repository } from 'typeorm';
import { Character } from './entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CharacterPrinterService } from '../character-printer';
import { ItemService } from '../item';

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
      save: jest.fn(),
    };

    mockPropertiesCalculator = {
      calculate: jest.fn(),
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
});
