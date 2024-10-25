import { Character, IProperties } from '../../character';

export class CharacterEquipAdapter {
  get level(): string {
    return this.character.characteristics.level.toString();
  }
  get souls(): string {
    return this.character.equipment.souls.toString();
  }
  get humanity(): string {
    return this.character.equipment.humanity.toString();
  }

  get helmet(): string {
    return this.character.equipment.helmet?.name ?? '';
  }
  get armor(): string {
    return this.character.equipment.armor?.name ?? '';
  }
  get arms(): string {
    return this.character.equipment.arms?.name ?? '';
  }
  get legs(): string {
    return this.character.equipment.legs?.name ?? '';
  }
  get ring1(): string {
    return this.character.equipment.ring1?.name ?? '';
  }
  get ring2(): string {
    return this.character.equipment.ring2?.name ?? '';
  }
  get leftWeapon1(): string {
    return this.character.equipment.left_weapon_primary?.name ?? '';
  }
  get rightWeapon1(): string {
    return this.character.equipment.right_weapon_primary?.name ?? '';
  }
  get leftWeapon2(): string {
    return this.character.equipment.left_weapon_secondary?.name ?? '';
  }
  get rightWeapon2(): string {
    return this.character.equipment.right_weapon_secondary?.name ?? '';
  }

  get spellSlots(): string {
    return this.character.properties.spellSlots.toString();
  }
  //TODO: use spells
  get spells(): {
    key: string;
    value: string;
  }[] {
    return []; /*
    this.character.equipment.spells.map(({ name, count }) => ({
      key: name,
      value: count.toString(),
    }));
  */
  }

  constructor(private character: Character & { properties: IProperties }) {}
}
