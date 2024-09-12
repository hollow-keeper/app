import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { UpdateCharacteristicsDto } from './dto/update-characteristics.dto';

const calculateSoulsForLevel = (level: number) => {
  const levelsArr = [0, 637, 690, 707, 724, 741, 758, 775, 793, 811, 829];

  if (level < 11) {
    return levelsArr[level];
  }

  return Math.floor(
    0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895,
  );
};

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

  async findAll() {
    const characters = await this.repository.find({
      relations: { description: true },
    });

    if (characters.length === 0) {
      throw new NotFoundException('No characters found');
    }
    return characters;
  }

  async findOne(id: number) {
    if (!this.repository) {
      throw new Error('Repository is not initialized');
    }
    const character = await this.repository.findOne({
      where: { id },
      relations: { description: true, characteristics: true, equipment: true },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    return character;
  }

  async getAvailableLevels(id: number) {
    const character = await this.repository.findOne({
      where: { id },
      relations: { equipment: true, characteristics: true },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    if (
      !character.equipment ||
      !character.characteristics ||
      !character.characteristics.level
    ) {
      throw new NotFoundException(
        `Character with ID ${id} has incomplete data`,
      );
    }

    const { souls } = character.equipment;

    let soulsLeft = souls;
    let levels = 0;
    let soulsNeeded = calculateSoulsForLevel(
      character.characteristics.level + levels,
    );

    while (soulsLeft > soulsNeeded) {
      soulsLeft -= soulsNeeded;

      levels++;
      soulsNeeded = calculateSoulsForLevel(
        character.characteristics.level + levels,
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

    character.equipment.souls += souls;

    return this.repository.save(character);
  }

  async levelup(id: number, newCharacteristics: UpdateCharacteristicsDto) {
    const character = await this.repository.findOne({
      where: { id },
      relations: { characteristics: true, equipment: true },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    if (!character.equipment) {
      throw new NotFoundException(`Character with ID ${id} has no equipment`);
    }

    //TODO: think of removing id more generally
    const {
      id: _,
      level,
      ...characteristicsExceptLevel
    } = character.characteristics;
    let { souls } = character.equipment;

    const calcTotalCharacteristics = (
      characteristics: UpdateCharacteristicsDto,
    ) => Object.values(characteristics).reduce((acc, val) => (acc += val));

    const nextSkillPoints = calcTotalCharacteristics(newCharacteristics);

    const prevSkillPoints = calcTotalCharacteristics(
      characteristicsExceptLevel,
    );

    let soulsToSubtract = 0;

    // const levelsArr = [0, 637, 690, 707, 724, 741, 758, 775, 793, 811, 829];
    for (let i = 0; i < nextSkillPoints - prevSkillPoints; i++) {
      const currentLevel = level + i;
      soulsToSubtract += calculateSoulsForLevel(currentLevel);
    }

    //TODO: could be a problem if somehow we can achieve situation
    // when we decrease some cahracteristic and increase another,
    // but it seems impossible right now
    if (prevSkillPoints === nextSkillPoints || soulsToSubtract === 0) {
      return character;
    }

    if (souls < soulsToSubtract) {
      throw new BadRequestException(
        `Not enough souls, current: ${souls}, needed: ${soulsToSubtract}`,
      );
    }

    character.characteristics = {
      ...character.characteristics,
      level: level + (nextSkillPoints - prevSkillPoints),
      ...newCharacteristics,
    };

    character.equipment.souls -= soulsToSubtract;

    // return character;
    return this.repository.save(character);
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
