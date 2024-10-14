import { Injectable, Logger } from '@nestjs/common';
import { UpdateEquipmentDto } from './dto';
import { Equipment } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterService } from '../character';
import { Hand } from './equipment.consts';
import { ItemService } from '../item';

@Injectable()
export class EquipmentService {
  logger = new Logger(EquipmentService.name);

  constructor(
    @InjectRepository(Equipment)
    private repository: Repository<Equipment>,
    private characterService: CharacterService,
    private itemService: ItemService,
  ) {}

  async updateSouls(id: number, souls: number) {
    this.logger.log('updateSouls() has been invoked');

    const character = await this.characterService.findOne(id);

    character.equipment.souls += souls;

    return this.repository.save(character.equipment);
  }

  async updateHumanity(id: number, humanity: number) {
    this.logger.log('updateHumanity() has been invoked');

    const character = await this.characterService.findOne(id);

    character.equipment.humanity += humanity;

    return this.repository.save(character.equipment);
  }

  async equip(id: number, newEquipment: UpdateEquipmentDto) {
    this.logger.log(`equip() has been invoked with ID ${id}`);

    const character = await this.characterService.findOne(id);

    const items = {};
    const itemSlots = Object.keys(newEquipment);
    const itemIds = Object.values(newEquipment).filter(
      (id) => typeof id === 'number',
    );

    const itemDict = await this.itemService.findMany(itemIds);

    for (let slot of itemSlots) {
      items[slot.replace('_id', '')] = itemDict[newEquipment[slot]] ?? null;
    }

    character.equipment = {
      ...character.equipment,
      ...items,
    };

    return this.repository.save(character.equipment);
  }

  async switchHand(id: number, hand: Hand) {
    this.logger.log('switchHand() has been invoked');

    const character = await this.characterService.findOne(id);

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

    return this.repository.save(character.equipment);
  }
}
