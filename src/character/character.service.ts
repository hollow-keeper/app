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
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { GameClass, gameClasses, Hand } from './character.consts';

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

  create(
    gameClass: GameClass,
    { name, origin, equipment }: CreateCharacterDto,
  ) {
    this.logger.log('create() has been invoked');

    const char = this.repository.create({
      description: {
        name,
        origin,
        game_class: gameClass,
      },
      characteristics: gameClasses[gameClass],
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
    this.logger.log('findOne() has been invoked');

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
    this.logger.log('getAvailableLevels() has been invoked');

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

  async updateSouls(id: number, souls: number) {
    this.logger.log('updateSouls() has been invoked');

    const character = await this.findOne(id);

    character.equipment.souls += souls;

    return this.repository.save(character);
  }

  async updateHumanity(id: number, humanity: number) {
    this.logger.log('updateHumanity() has been invoked');

    const character = await this.findOne(id);

    character.equipment.humanity += humanity;

    return this.repository.save(character);
  }

  async levelup(id: number, newCharacteristics: UpdateCharacteristicsDto) {
    this.logger.log('levelup() has been invoked');

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

  async equip(id: number, newEquipment: UpdateEquipmentDto) {
    this.logger.log('equip() has been invoked');

    const character = await this.findOne(id);

    character.equipment = { ...character.equipment, ...newEquipment };

    return this.repository.save(character);
  }

  async switchHand(id: number, hand: Hand) {
    this.logger.log('switchHand() has been invoked');

    const character = await this.findOne(id);

    switch (hand) {
      case Hand.left:
        [
          character.equipment.left_weapon_primary,
          character.equipment.left_weapon_secondary,
        ] = [
          character.equipment.left_weapon_secondary,
          character.equipment.left_weapon_primary,
        ];
        break;

      case Hand.right:
        [
          character.equipment.right_weapon_primary,
          character.equipment.right_weapon_secondary,
        ] = [
          character.equipment.right_weapon_secondary,
          character.equipment.right_weapon_primary,
        ];
        break;

      default:
        throw new Error("Case haven't been chosen");
    }

    return this.repository.save(character);
  }

  remove(id: number) {
    this.logger.log('remove() has been invoked');

    return this.repository.delete({ id });
  }
}
