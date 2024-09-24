import { Injectable, Logger } from '@nestjs/common';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterService } from 'src/character/character.service';
import { Hand } from './equipment.consts';
import { ItemService } from 'src/item/item.service';

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
    const itemSlots = Object.keys(newEquipment).filter((key) =>
      key.endsWith('_id'),
    );

    // pbbl should use smth like Promise.all
    // nut looks like it wouldnt save much
    // but will reduce readability
    for (let slot of itemSlots) {
      const item = await this.itemService.findOne(newEquipment[`${slot}`]);
      items[slot.replace('_id', '')] = item;
    }

    character.equipment = {
      ...character.equipment,
      ...newEquipment,
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

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }
}
