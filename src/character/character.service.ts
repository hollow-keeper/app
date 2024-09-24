import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { UpdateCharacteristicsDto } from './dto/update-characteristics.dto';
import { GameClass, gameClasses } from './character.consts';

const calculateSoulsForLevel = (level: number) => {
  const levelsArr = [0, 637, 690, 707, 724, 741, 758, 775, 793, 811, 829];

  if (level < 11) {
    return levelsArr[level];
  }

  return Math.floor(
    0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895,
  );
};

const calcTotalCharacteristics = (characteristics: UpdateCharacteristicsDto) =>
  Object.values(characteristics).reduce((acc, val) => (acc += val));

@Injectable()
export class CharacterService {
  logger = new Logger(CharacterService.name);

  constructor(
    @InjectRepository(Character)
    private repository: Repository<Character>,
  ) {}

  create(gameClass: GameClass, { name, origin }: CreateCharacterDto) {
    this.logger.log('create() has been invoked');

    const { equipment, characteristics } = gameClasses[gameClass];

    const char = this.repository.create({
      description: {
        name,
        origin,
        game_class: gameClass,
      },
      characteristics,
      equipment,
    });

    return this.repository.save(char);
  }

  async findAll() {
    this.logger.log('findAll() has been invoked');

    const characters = await this.repository.find({
      relations: { description: true },
    });

    return characters.map((ch) => ({ ...ch.description, id: ch.id }));
  }

  async findOne(id: number) {
    this.logger.log(`findOne() has been invoked with ID ${id}`);

    if (!this.repository) {
      throw new Error('Repository is not initialized');
    }

    const character = await this.repository.findOne({
      where: { id },
      relations: {
        description: true,
        characteristics: true,
        equipment: {
          helmet: true,
          armor: true,
          arms: true,
          legs: true,
          ring1: true,
          ring2: true,
          left_weapon_primary: true,
          right_weapon_primary: true,
          left_weapon_secondary: true,
          right_weapon_secondary: true,
        },
      },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    return character;
  }

  async getAvailableLevels(id: number) {
    this.logger.log(`getAvailableLevels() has been invoked with ID ${id}`);

    const character = await this.findOne(id);

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

  async levelup(id: number, newCharacteristics: UpdateCharacteristicsDto) {
    this.logger.log(`levelup() has been invoked with ID ${id}`);

    const character = await this.findOne(id);

    const {
      id: _,
      level,
      ...characteristicsExceptLevel
    } = character.characteristics;
    let { souls } = character.equipment;

    const nextSkillPoints = calcTotalCharacteristics(newCharacteristics);

    const prevSkillPoints = calcTotalCharacteristics(
      characteristicsExceptLevel,
    );

    let soulsToSubtract = 0;

    for (let i = 0; i < nextSkillPoints - prevSkillPoints; i++) {
      const currentLevel = level + i;
      soulsToSubtract += calculateSoulsForLevel(currentLevel);
    }

    // could be a problem if somehow we decrease some
    // cahracteristic and increase another,
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

    return this.repository.save(character);
  }

  remove(id: number) {
    this.logger.log('remove() has been invoked');

    return this.repository.delete({ id });
  }
}
