import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Repository } from 'typeorm';
import { Item } from './entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateItemDto } from './dto';

describe('ItemController', () => {
  let controller: ItemController;
  let mockRepository: Partial<Record<keyof Repository<Item>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      create: jest.fn(),
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
});
