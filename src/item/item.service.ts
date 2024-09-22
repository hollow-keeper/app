import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  logger = new Logger(ItemService.name);

  constructor(
    @InjectRepository(Item)
    private repository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    this.logger.log('create() has been invoked');

    const item = this.repository.create(createItemDto);
    return this.repository.save(item);
  }

  findAll() {
    this.logger.log('findAll() has been invoked');

    return this.repository.find();
  }

  async findOne(id: number) {
    this.logger.log('findOne() has been invoked');

    if (!this.repository) {
      throw new Error('Repository is not initialized');
    }

    const item = await this.repository.find({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    this.logger.log('update() has been invoked');

    const item = await this.findOne(id);

    const newItem = { ...item, ...updateItemDto };

    return this.repository.save(newItem);
  }

  remove(id: number) {
    this.logger.log('remove() has been invoked');

    return this.repository.delete({ id });
  }
}
