import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWeaponDto } from './dto';
import { EDamageType, Weapon } from '../entities';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';

describe('WeaponController', () => {
  let controller: WeaponController;
  let mockRepository: Partial<Record<keyof Repository<Weapon>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponController],
      providers: [
        WeaponService,
        {
          provide: getRepositoryToken(Weapon),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<WeaponController>(WeaponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create weapon', async () => {
    const createWeaponDto: CreateWeaponDto = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
      damage: 1,
      damage_type: EDamageType.crush,
    };

    const createdWeapon = { id: 1, createWeaponDto };
    mockRepository.create.mockReturnValue(createdWeapon);
    mockRepository.save.mockResolvedValue(createdWeapon);

    const result = await controller.create(createWeaponDto);
    expect(mockRepository.create).toHaveBeenCalledWith(createWeaponDto);
    expect(mockRepository.save).toHaveBeenCalledWith(createdWeapon);
    expect(result).toEqual(createdWeapon);
  });

  it('should find all weapons', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.find.mockReturnValue([weapon]);

    const result = await controller.findAll();
    expect(mockRepository.find).toHaveBeenCalledWith();
    expect(result).toEqual([weapon]);
  });

  it('should find weapon by id', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(weapon);

    const result = await controller.findOne(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(weapon);
  });

  it('should update weapon by id', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(weapon);
    mockRepository.save.mockReturnValue({ ...weapon, name: 'wrong' });

    const result = await controller.update(1, {
      name: 'tttest',
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...weapon,
      name: 'tttest',
    });
    expect(result).toEqual({ ...weapon, name: 'wrong' });
  });

  it('should remove weapon by id', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.delete.mockReturnValue(weapon);

    const result = await controller.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(weapon);
  });
});
