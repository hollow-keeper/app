import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ItemService', () => {
  let service: ItemService;
  let mockRepository: Partial<Record<keyof Repository<Item>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
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
});
