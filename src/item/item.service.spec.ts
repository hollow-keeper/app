import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { In, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';

describe('ItemService', () => {
  let service: ItemService;
  let mockRepository: Partial<Record<keyof Repository<Item>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const result = await service.create(createItemDto);
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

    const result = await service.findAll();
    expect(mockRepository.find).toHaveBeenCalledWith();
    expect(result).toEqual([item]);
  });

  it('should find item by name', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOneBy.mockReturnValue(item);

    const result = await service.findByName('name');
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ name: 'name' });
    expect(result).toEqual(item);
  });

  it('should find item by id', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(item);

    const result = await service.findOne(1);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(item);
  });

  it('should find many items by ids', async () => {
    const item = {
      id: 1,
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.find.mockReturnValue([item]);

    const result = await service.findMany([1]);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { id: In([1]) },
    });
    expect(result).toEqual({ '1': item });
  });

  it('should update item by id', async () => {
    const item = {
      name: 'Test Item',
      weight: 1,
      balance: 2,
    };

    mockRepository.findOne.mockReturnValue(item);
    mockRepository.save.mockReturnValue({ ...item, name: 'wrong' });

    const result = await service.update(1, {
      name: 'tttest',
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.save).toHaveBeenCalledWith({ ...item, name: 'tttest' });
    expect(result).toEqual({ ...item, name: 'wrong' });
  });
});
