import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateItemDto } from './dto';
import { Item } from './entities';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;
  let mockRepository: Partial<Record<keyof Repository<Item>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create item', async () => {
    const createItemDto: CreateItemDto = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    const createdItem = { id: 1, createItemDto };
    mockRepository.create.mockReturnValue(createdItem);
    mockRepository.save.mockResolvedValue(createdItem);

    const result = await controller.create(createItemDto);
    expect(mockRepository.create).toHaveBeenCalledWith(createItemDto);
    expect(mockRepository.save).toHaveBeenCalledWith(createdItem);
    expect(result).toEqual(createdItem);
  });

  it('should find all items', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.find.mockReturnValue([item]);

    const result = await controller.findAll();
    expect(mockRepository.find).toHaveBeenCalledWith();
    expect(result).toEqual([item]);
  });

  it('should find item by id', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(item);

    const result = await controller.findOne(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(item);
  });

  it('should update item by id', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(item);
    mockRepository.save.mockReturnValue({ ...item, name: 'wrong' });

    const result = await controller.update(1, {
      name: 'tttest',
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...item,
      name: 'tttest',
    });
    expect(result).toEqual({ ...item, name: 'wrong' });
  });

  it('should remove item by id', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.delete.mockReturnValue(item);

    const result = await controller.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(item);
  });
});
