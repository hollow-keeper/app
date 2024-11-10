import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Equipment } from './entities';
import { EquipmentService } from './equipment.service';
import { ItemService, Item } from '../../item';
import { CharacterPrinterService } from '../character-printer';
import { CharacterService } from '../character.service';
import { Character } from '../entities';
import { PropertiesCalculatorService } from '../properties-calculator';
import { Hand } from './equipment.consts';

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
  let mockCharacterService: Partial<Record<keyof CharacterService, jest.Mock>>;
  let mockItemService: Partial<Record<keyof ItemService, jest.Mock>>;

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

    mockCharacterService = {
      findOne: jest.fn(),
    };

    mockItemService = {
      findMany: jest.fn(),
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
        {
          provide: CharacterService,
          useValue: mockCharacterService,
        },
        {
          provide: ItemService,
          useValue: mockItemService,
        },
      ],
    }).compile();

    service = module.get<EquipmentService>(EquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update souls', async () => {
    const equipment = {
      souls: 100,
    };
    mockCharacterService.findOne.mockImplementationOnce(() => ({
      equipment,
    }));
    mockEquipmentRepository.save.mockImplementationOnce((a) => a);
    const result = await service.updateSouls(1, 200);

    expect(mockCharacterService.findOne).toHaveBeenCalledWith(1);
    expect(mockEquipmentRepository.save).toHaveBeenCalledWith({
      souls: 300,
    });
    expect(result).toEqual({
      souls: 300,
    });
  });

  it('should update humanity', async () => {
    const equipment = {
      humanity: 100,
    };
    mockCharacterService.findOne.mockImplementationOnce(() => ({
      equipment,
    }));
    mockEquipmentRepository.save.mockImplementationOnce((a) => a);
    const result = await service.updateHumanity(1, 200);

    expect(mockCharacterService.findOne).toHaveBeenCalledWith(1);
    expect(mockEquipmentRepository.save).toHaveBeenCalledWith({
      humanity: 300,
    });
    expect(result).toEqual({
      humanity: 300,
    });
  });

  it('should update equipment', async () => {
    const equipment = {
      helmet_id: 1,
      armor_id: 2,
      arms_id: 3,
      legs_id: 4,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primary_id: 7,
      right_weapon_primary_id: 8,
      left_weapon_secondary_id: 9,
      right_weapon_secondary_id: 10,
    };
    mockCharacterService.findOne.mockImplementationOnce(() => ({
      equipment,
    }));
    mockItemService.findMany.mockImplementationOnce(() => [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 66,
      },
      {
        id: 7,
      },
      {
        id: 77,
      },
      {
        id: 10,
      },
    ]);
    mockEquipmentRepository.save.mockImplementationOnce((a) => a);
    const result = await service.equip(1, {
      helmet_id: 1,
      armor_id: 2,
      arms_id: 3,
      legs_id: 66,
      ring1_id: 5,
      ring2_id: null,
      left_weapon_primary_id: 7,
      left_weapon_secondary_id: 77,
      right_weapon_secondary_id: 10,
    });

    expect(mockCharacterService.findOne).toHaveBeenCalledWith(1);
    expect(mockItemService.findMany).toHaveBeenCalledWith([
      1, 2, 3, 66, 5, 7, 77, 10,
    ]);
    expect(mockEquipmentRepository.save).toHaveBeenCalledWith({
      armor: { id: 3 },
      armor_id: 2,
      arms: { id: 66 },
      arms_id: 3,
      helmet: { id: 2 },
      helmet_id: 1,
      left_weapon_primary: null,
      left_weapon_primary_id: 7,
      left_weapon_secondary: null,
      left_weapon_secondary_id: 9,
      legs: null,
      legs_id: 4,
      right_weapon_primary_id: 8,
      right_weapon_secondary: null,
      right_weapon_secondary_id: 10,
      ring1: { id: 77 },
      ring1_id: 5,
      ring2: null,
      ring2_id: 6,
    });
    expect(result).toEqual({
      armor: { id: 3 },
      armor_id: 2,
      arms: { id: 66 },
      arms_id: 3,
      helmet: { id: 2 },
      helmet_id: 1,
      left_weapon_primary: null,
      left_weapon_primary_id: 7,
      left_weapon_secondary: null,
      left_weapon_secondary_id: 9,
      legs: null,
      legs_id: 4,
      right_weapon_primary_id: 8,
      right_weapon_secondary: null,
      right_weapon_secondary_id: 10,
      ring1: { id: 77 },
      ring1_id: 5,
      ring2: null,
      ring2_id: 6,
    });
  });

  it('should switch left hand', async () => {
    const equipment = {
      helmet_id: 1,
      armor_id: 2,
      arms_id: 3,
      legs_id: 4,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primaryd: 7,
      right_weapon_primary: 8,
      left_weapon_secondary: 9,
      right_weapon_secondary: 10,
    };
    mockCharacterService.findOne.mockImplementationOnce(() => ({
      equipment,
    }));
    mockEquipmentRepository.save.mockImplementationOnce((a) => a);
    const result = await service.switchHand(1, Hand.left);

    expect(mockCharacterService.findOne).toHaveBeenCalledWith(1);
    expect(mockEquipmentRepository.save).toHaveBeenCalledWith({
      armor_id: 2,
      arms_id: 3,
      helmet_id: 1,
      legs_id: 4,
      right_weapon_primary: 8,
      right_weapon_secondary: 10,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primary: 9,
      left_weapon_primaryd: 7,
    });
    expect(result).toEqual({
      armor_id: 2,
      arms_id: 3,
      helmet_id: 1,
      legs_id: 4,
      right_weapon_primary: 8,
      right_weapon_secondary: 10,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primary: 9,
      left_weapon_primaryd: 7,
    });
  });

  it('should switch right hand', async () => {
    const equipment = {
      helmet_id: 1,
      armor_id: 2,
      arms_id: 3,
      legs_id: 4,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primaryd: 7,
      right_weapon_primary: 8,
      left_weapon_secondary: 9,
      right_weapon_secondary: 10,
    };
    mockCharacterService.findOne.mockImplementationOnce(() => ({
      equipment,
    }));
    mockEquipmentRepository.save.mockImplementationOnce((a) => a);
    const result = await service.switchHand(1, Hand.right);

    expect(mockCharacterService.findOne).toHaveBeenCalledWith(1);
    expect(mockEquipmentRepository.save).toHaveBeenCalledWith({
      armor_id: 2,
      arms_id: 3,
      helmet_id: 1,
      legs_id: 4,
      right_weapon_primary: 10,
      right_weapon_secondary: 8,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primaryd: 7,
      left_weapon_secondary: 9,
    });
    expect(result).toEqual({
      armor_id: 2,
      arms_id: 3,
      helmet_id: 1,
      legs_id: 4,
      right_weapon_primary: 10,
      right_weapon_secondary: 8,
      ring1_id: 5,
      ring2_id: 6,
      left_weapon_primaryd: 7,
      left_weapon_secondary: 9,
    });
  });

  it('should throw error while switch wrong hand', async () => {
    await expect(service.switchHand(1, 'Hand.right' as any)).rejects.toThrow(
      "Case haven't been chosen",
    );
  });
});
