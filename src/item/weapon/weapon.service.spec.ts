import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateWeaponDto } from './dto';
import { WeaponService } from './weapon.service';
import { EDamageType, Weapon } from '../entities';

describe('WeaponService', () => {
  let service: WeaponService;
  let mockRepository: Partial<Record<keyof Repository<Weapon>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponService,
        {
          provide: getRepositoryToken(Weapon),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<WeaponService>(WeaponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const result = await service.create(createWeaponDto);
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

    const result = await service.findAll();
    expect(mockRepository.find).toHaveBeenCalledWith();
    expect(result).toEqual([weapon]);
  });

  it('should find weapon by name', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOneBy.mockReturnValue(weapon);

    const result = await service.findByName('name');
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ name: 'name' });
    expect(result).toEqual(weapon);
  });

  it('should find weapon by id', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(weapon);

    const result = await service.findOne(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(weapon);
  });

  it('should throw exception about empty repo while finding weapon by id', async () => {
    const emptyService = new WeaponService(undefined as any);
    expect(() => emptyService.findOne(1)).rejects.toThrow(
      'Repository is not initialized',
    );
  });

  it('should return empty weapon while finding weapon by nullable id', async () => {
    const result = await service.findOne(null);
    expect(result).toBeNull();
  });

  it('should return empty weapon while finding weapon by undefined id', async () => {
    const result = await service.findOne(undefined);
    expect(result).toBeNull();
  });

  it('should  throw exception while finding weapon by Nan id', async () => {
    expect(() => service.findOne(NaN)).rejects.toThrow(
      'Invalid id: id must be a positive integer',
    );
  });

  it('should  throw exception while finding empty weapon', async () => {
    mockRepository.findOneBy.mockReturnValue(undefined);
    expect(() => service.findOne(1)).rejects.toThrow(
      'Weapon with ID 1 not found',
    );
  });

  it('should find many weapons by ids', async () => {
    const weapon = {
      id: 1,
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.find.mockReturnValue([weapon]);

    const result = await service.findMany([1]);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id: In([1]) },
    });
    expect(result).toEqual({ '1': weapon });
  });

  it('should find many weapons by ids but throw exception', async () => {
    mockRepository.find.mockReturnValue([]);

    expect(() => service.findMany([1])).rejects.toThrow(
      'Weapon with ID 1 not found',
    );
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id: In([1]) },
    });
  });

  it('should update weapon by id', async () => {
    const weapon = {
      name: 'Test Weapon',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(weapon);
    mockRepository.save.mockReturnValue({ ...weapon, name: 'wrong' });

    const result = await service.update(1, {
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

    const result = await service.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(weapon);
  });
});
