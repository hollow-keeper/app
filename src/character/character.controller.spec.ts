import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { PropertiesCalculatorService } from '../properties-calculator/properties-calculator.service';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CharacterController', () => {
  let controller: CharacterController;
  let mockRepository: Partial<Record<keyof Repository<Character>, jest.Mock>>;
  let mockPropertiesCalculator: Partial<
    Record<keyof PropertiesCalculatorService, jest.Mock>
  >;

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
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
