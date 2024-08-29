import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private repository: Repository<Character>,
  ) {}

  create(createCharacterDto: CreateCharacterDto) {
    const char = this.repository.create(createCharacterDto);
    return this.repository.save(char);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.find({
      where: { id },
      relations: { description: true, characteristics: true, equipment: true },
    });
  }

  async getAvailableLevels(id: number) {
    const character = await this.repository.findOne({
      where: { id },
      relations: { equipment: true, characteristics: true },
    });

    const { souls } = character.equipment;

    let soulsNeeded = 0;
    let levels = 0;

    if (!character || !character.equipment || !character.characteristics) {
      throw new NotFoundException(
        `Character with ID ${id} not found or has incomplete data`,
      );
    }

    while (soulsNeeded < souls) {
      let level = character.characteristics.level + levels;
      levels++;

      soulsNeeded -= Math.floor(
        0.02 * Math.pow(level, 3) +
          3.06 * Math.pow(level, 2) +
          105.6 * level -
          895,
      );
    }

    return levels;
  }

  async updateSouls(id: number, souls: number) {
    const character = await this.repository.findOne({
      where: { id },
      relations: { equipment: true },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    if (!character.equipment) {
      throw new NotFoundException(`Character with ID ${id} has no equipment`);
    }

    character.equipment.souls = souls;

    return this.repository.save(character);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
