import { page, valueInContainer } from '../utils';
import { CharacterStatsAdapter } from './character-stats.adapter';

export class CharacterStatsPrinter {
  constructor(
    private character: CharacterStatsAdapter,
    private length: number,
  ) {}
  private getNameSector() {
    return [valueInContainer(this.character.name, this.length)];
  }

  private getLevelAndSoulsSector() {
    return [{ key: 'Уровень', value: this.character.level }];
  }

  private getCharacteristicsSector() {
    return [
      { key: 'Здоровье', value: `${this.character.vitality}` },
      { key: 'Ученость', value: `${this.character.attunement}` },
      { key: 'Выносливость', value: `${this.character.endurance}` },
      { key: 'Сила', value: `${this.character.strength}` },
      { key: 'Ловкость', value: `${this.character.dexterity}` },
      { key: 'Сопротив.', value: `${this.character.resistance}` },
      { key: 'Интеллект', value: `${this.character.intelligence}` },
      { key: 'Вера', value: `${this.character.faith}` },
      { key: 'Внимание', value: `${this.character.perception}` },
      { key: 'Харизма', value: `${this.character.charisma}` },
    ];
  }

  private getFirstColumn() {
    return [
      this.getNameSector(),
      this.getLevelAndSoulsSector(),
      this.getCharacteristicsSector(),
    ];
  }
  private getMainPropsSector() {
    return [
      { key: 'Здоровье', value: this.character.health },
      { key: 'Выносливость', value: this.character.stamina },
      {
        key: 'Скорость восстановления выносливости',
        value: this.character.staminaRecoveryRate,
      },
      { key: 'Загруженность', value: this.character.loading },
      {
        key: 'Скорость восстановления баланса',
        value: this.character.balanceRecoveryRate,
      },
      { key: 'Длина шага', value: this.character.stepLength },
      { key: 'Длина бега', value: this.character.runLength },
      { key: 'Стоимость бега', value: this.character.runCost },
      { key: 'Уворот', value: this.character.dodgeChance },
      { key: 'Длина переката', value: this.character.rollLength },
      { key: 'Скорость переката', value: this.character.rollSpeed },
      { key: 'Стоимость переката', value: this.character.rollCost },
      { key: 'Душ до следующего уровня', value: this.character.requiredSouls },
    ];
  }
  private getDamageProp() {
    return [
      { key: 'Пр. оружие 1', value: this.character.rightHand1Damage },
      { key: 'Пр. оружие 2', value: this.character.rightHand2Damage },
      { key: 'Лев. оружие 1', value: this.character.leftHand1Damage },
      { key: 'Лев. оружие 2', value: this.character.leftHand2Damage },
    ];
  }

  private getProtectionProp() {
    return [
      { key: 'Физ. защита', value: this.character.physicalProtection },
      { key: 'От ударов', value: this.character.crushProtection },
      { key: 'От рез. ударов', value: this.character.slashProtection },
      { key: 'От выпадов', value: this.character.pierceProtection },
      { key: 'Защ. от магии', value: this.character.magicalProtection },
      { key: 'Защ. от огня', value: this.character.flameProtection },
      { key: 'Защ. от молнии', value: this.character.flashProtection },
    ];
  }

  private getSecondColumn() {
    return [
      this.getMainPropsSector(),
      this.getDamageProp(),
      this.getProtectionProp(),
    ];
  }

  private getResistanceSector() {
    return [
      { key: 'Баланс', value: this.character.balance },
      {
        key: 'Сопр. к кровотеч.',
        value: this.character.bleedingResistance,
      },
      { key: 'Сопр. к отравлен.', value: this.character.poisonResistance },
      { key: 'Сопр. к проклят.', value: this.character.curseResistance },
    ];
  }

  private getUnfightPropsSector() {
    return [
      { key: 'Угроза', value: this.character.threat },
      { key: 'Убеждение', value: this.character.eloquence },
      { key: 'Внимание', value: this.character.attentiveness },
      { key: 'Поиск предметов', value: this.character.luck },
    ];
  }

  private getThirdColumn() {
    return [this.getResistanceSector(), this.getUnfightPropsSector()];
  }

  print() {
    return page(
      [this.getFirstColumn(), this.getSecondColumn(), this.getThirdColumn()],
      this.length,
    );
  }
}
