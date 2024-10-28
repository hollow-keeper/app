import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateWeaponDto, UpdateWeaponDto } from './dto';
import { Item } from './entities';

@Injectable()
export class ItemService {
  logger = new Logger(ItemService.name);

  constructor(
    @InjectRepository(Item)
    private repository: Repository<Item>,
  ) {}

  create(createItemDto: CreateWeaponDto) {
    this.logger.log('create() has been invoked');

    const item = this.repository.create(createItemDto);
    return this.repository.save(item);
  }

  findAll() {
    this.logger.log('findAll() has been invoked');

    return this.repository.find();
  }

  async findByName(name: string) {
    this.logger.log('findByName() has been invoked');

    return this.repository.findOneBy({
      name,
    });
  }

  async findOne(id: number) {
    this.logger.log(`findOne() has been invoked with id: ${id}`);

    if (!this.repository) {
      throw new Error('Repository is not initialized');
    }

    if (id === null || id === undefined) {
      return null;
    }

    if (isNaN(id) || !Number.isInteger(+id) || +id <= 0) {
      throw new BadRequestException(
        'Invalid id: id must be a positive integer',
      );
    }

    const item = await this.repository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async findMany(ids: number[]) {
    const itemsList = await this.repository.find({ where: { id: In(ids) } });

    const itemMap = itemsList.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    for (const id of ids) {
      if (!itemMap[id]) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
    }

    return itemMap;
  }

  async update(id: number, updateItemDto: UpdateWeaponDto) {
    this.logger.log(`update() has been invoked with ID ${id}`);

    const item = await this.findOne(id);

    const newItem = { ...item, ...updateItemDto };

    return this.repository.save(newItem);
  }

  remove(id: number) {
    this.logger.log(`remove() has been invoked with ID ${id}`);

    return this.repository.delete({ id });
  }
}
