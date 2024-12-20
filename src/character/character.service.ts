import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CharacterPrinterService } from './character-printer';
import { GameClass, gameClasses } from './character.consts';
import { CreateCharacterDto, UpdateCharacteristicsDto } from './dto';
import { Character } from './entities';
import { ItemService } from '../item';
import { Equipment } from './equipment/entities';
import { PropertiesCalculatorService } from './properties-calculator';
//TODO: Fix circular deps with equip
const calcTotalCharacteristics = (characteristics: UpdateCharacteristicsDto) =>
  Object.values(characteristics).reduce((acc, val) => (acc += val));

@Injectable()
export class CharacterService {
  logger = new Logger(CharacterService.name);

  constructor(
    @InjectRepository(Character)
    private repository: Repository<Character>,
    private propertiesCalculator: PropertiesCalculatorService,
    private printService: CharacterPrinterService,
    private itemService: ItemService,
  ) {}

  async create(gameClass: GameClass, { name, origin }: CreateCharacterDto) {
    this.logger.log('create() has been invoked');

    const { equipment, characteristics } = gameClasses[gameClass];

    const realEquipment = new Equipment();

    for (const key in equipment) {
      if (equipment[key]) {
        realEquipment[key] = await this.itemService.findByName(equipment[key]);
      }
    }

    // NOTE:
    // check if item actually exist?
    // got db err (FK constr) when generate char
    // with default weapon
    // after dropping all tables

    const char = this.repository.create({
      description: {
        name,
        origin,
        game_class: gameClass,
      },
      characteristics,
      equipment: realEquipment,
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

    const properties = this.propertiesCalculator.calculate(character);

    return { ...character, properties };
  }

  async getAvailableLevels(id: number) {
    this.logger.log(`getAvailableLevels() has been invoked with ID ${id}`);

    const character = await this.findOne(id);

    const { souls } = character.equipment;

    let soulsLeft = souls;
    let levels = 0;
    let soulsNeeded = this.propertiesCalculator.requiredSouls(
      character.characteristics.level + levels,
    );

    while (soulsLeft >= soulsNeeded) {
      soulsLeft -= soulsNeeded;
      levels++;

      soulsNeeded = this.propertiesCalculator.requiredSouls(
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
    const { souls } = character.equipment;

    const nextSkillPoints = calcTotalCharacteristics(newCharacteristics);

    const prevSkillPoints = calcTotalCharacteristics(
      characteristicsExceptLevel,
    );

    let soulsToSubtract = 0;

    for (let i = 0; i < nextSkillPoints - prevSkillPoints; i++) {
      const currentLevel = level + i;
      const sbs = await this.propertiesCalculator.requiredSouls(currentLevel);
      soulsToSubtract += sbs;
    }

    // could be a problem if somehow we decrease some
    // cahracteristic and increase another,
    // but it seems impossible right now
    if (prevSkillPoints === nextSkillPoints) {
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

  async printCharacterSheet(id: number, length: number) {
    const character = await this.findOne(id);
    return this.printService.print(character, length);
  }
}
