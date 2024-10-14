import { page } from '../utils';
import { CharacterEquipAdapter } from './character-equip.adapter';

export class CharacterEquipPrinter {
  constructor(
    private character: CharacterEquipAdapter,
    private length: number,
  ) {}
  private getLevelAndSoulsSector() {
    return [
      { key: 'Уровень', value: this.character.level },
      { key: 'Души', value: this.character.souls },
      { key: 'Человечность', value: this.character.humanity },
    ];
  }

  private getEquipSector() {
    return [
      { key: 'Шлем', value: this.character.helmet },
      { key: 'Доспех', value: this.character.armor },
      { key: 'Руки', value: this.character.arms },
      { key: 'Ноги', value: this.character.legs },
      { key: 'Кольцо', value: this.character.ring1 },
      { key: 'Кольцо', value: this.character.ring2 },
      { key: 'Активное левое оружие', value: this.character.leftWeapon1 },
      { key: 'Активное правое оружие', value: this.character.rightWeapon1 },
      { key: 'Не активное левое оружие', value: this.character.leftWeapon2 },
      { key: 'Не активное правое оружие', value: this.character.rightWeapon2 },
    ];
  }

  private getMagicSector() {
    return [
      { key: 'Ячеек магии', value: this.character.spellSlots },
      ...this.character.spells.map(({ key, value }) => ({
        key: `   ${key}`,
        value,
      })),
    ];
  }
  
  private getFirstColumn() {
    return [
      this.getLevelAndSoulsSector(),
      this.getEquipSector(),
      this.getMagicSector(),
    ];
  }

  print() {
    return page([this.getFirstColumn()], this.length);
  }
}
