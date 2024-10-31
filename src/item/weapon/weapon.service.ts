import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateWeaponDto, UpdateWeaponDto } from './dto';
import { Weapon } from '../entities';

@Injectable()
export class WeaponService {
  logger = new Logger(WeaponService.name);

  constructor(
    @InjectRepository(Weapon)
    private repository: Repository<Weapon>,
  ) {}

  create(createWeaponDto: CreateWeaponDto) {
    this.logger.log('create() has been invoked');

    const weapon = this.repository.create(createWeaponDto);
    return this.repository.save(weapon);
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

    const weapon = await this.repository.findOne({ where: { id } });

    if (!weapon) {
      throw new NotFoundException(`Weapon with ID ${id} not found`);
    }

    return weapon;
  }

  async findMany(ids: number[]) {
    const weaponsList = await this.repository.find({ where: { id: In(ids) } });

    const weaponMap = weaponsList.reduce((acc, weapon) => {
      acc[weapon.id] = weapon;
      return acc;
    }, {});
    for (const id of ids) {
      if (!weaponMap[id]) {
        throw new NotFoundException(`Weapon with ID ${id} not found`);
      }
    }

    return weaponMap;
  }

  async update(id: number, updateWeaponDto: UpdateWeaponDto) {
    this.logger.log(`update() has been invoked with ID ${id}`);

    const weapon = await this.findOne(id);

    const newWeapon = { ...weapon, ...updateWeaponDto };

    return this.repository.save(newWeapon);
  }

  remove(id: number) {
    this.logger.log(`remove() has been invoked with ID ${id}`);

    return this.repository.delete({ id });
  }
}
