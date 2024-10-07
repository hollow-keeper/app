import { Character } from 'src/character/entities/character.entity';
import { IProperties } from 'src/properties-calculator/properties-calculator.types';

export type TDiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

function toDice(value: number): TDiceType {
  if (value < 21) {
    return 'd4';
  }
  if (value < 41) {
    return 'd6';
  }
  if (value < 61) {
    return 'd8';
  }
  if (value < 81) {
    return 'd10';
  }
  if (value < 101) {
    return 'd12';
  }
  return 'd20';
}

export class CharacterStatsAdapter {
  get name(): string {
    return this.character.description.name;
  }

  get level(): string {
    return this.character.characteristics.level.toString();
  }
  get souls(): string {
    return this.character.equipment.souls.toString();
  }

  get vitality(): string {
    return `${this.character.characteristics.vitality}(${toDice(this.character.characteristics.vitality)})`;
  }
  get attunement(): string {
    return `${this.character.characteristics.attunement}(${toDice(this.character.characteristics.attunement)})`;
  }
  get endurance(): string {
    return `${this.character.characteristics.endurance}(${toDice(this.character.characteristics.endurance)})`;
  }
  get strength(): string {
    return `${this.character.characteristics.strength}(${toDice(this.character.characteristics.strength)})`;
  }
  get dexterity(): string {
    return `${this.character.characteristics.dexterity}(${toDice(this.character.characteristics.dexterity)})`;
  }
  get resistance(): string {
    return `${this.character.characteristics.resistance}(${toDice(this.character.characteristics.resistance)})`;
  }
  get intelligence(): string {
    return `${this.character.characteristics.intelligence}(${toDice(this.character.characteristics.intelligence)})`;
  }
  get faith(): string {
    return `${this.character.characteristics.faith}(${toDice(this.character.characteristics.faith)})`;
  }
  get perception(): string {
    return `${this.character.characteristics.perception}(${toDice(this.character.characteristics.perception)})`;
  }
  get charisma(): string {
    return `${this.character.characteristics.charisma}(${toDice(this.character.characteristics.charisma)})`;
  }

  get humanity(): string {
    return this.character.equipment.humanity.toString();
  }
  /*

  get health(): string {
    return `${this.character.health}(${this.character.healthPoints} points)`;
  }
  get stamina(): string {
    return `${this.character.stamina}(${this.character.staminaPoints} points)`;
  }
  get loading(): string {
    return `${this.character.loaded.toFixed(
      1
    )}/${this.character.carryingCapacity.toFixed(1)}`;
  }

  get leftHand1Damage(): string {
    return this.character.leftHand1Damage.toString();
  }
  get leftHand2Damage(): string {
    return this.character.leftHand2Damage.toString();
  }
  get rightHand1Damage(): string {
    return this.character.rightHand1Damage.toString();
  }
  get rightHand2Damage(): string {
    return this.character.rightHand2Damage.toString();
  }

  get physicalProtection(): string {
    return `${this.character.physicalProtection}(${this.character.unarmoredPhysicalProtection})(${this.character.physicalProtectionPoints} points)`;
  }
  get crushProtection(): string {
    return `${this.character.crushProtection}()(${this.character.crushProtectionPoints} points)`;
  }
  get slashProtection(): string {
    return `${this.character.slashProtection}()(${this.character.slashProtectionPoints} points)`;
  }
  get pierceProtection(): string {
    return `${this.character.pierceProtection}()(${this.character.pierceProtectionPoints} points)`;
  }
  get magicalProtection(): string {
    return `${this.character.magicalProtection}(${this.character.unarmoredMagicalProtection})(${this.character.magicalProtectionPoints} points)`;
  }
  get flameProtection(): string {
    return `${this.character.flameProtection}(${this.character.unarmoredFlameProtection})(${this.character.flameProtectionPoints} points)`;
  }
  get flashProtection(): string {
    return `${this.character.flashProtection}(${this.character.unarmoredFlashProtection})(${this.character.flashProtectionPoints} points)`;
  }

  get balance(): string {
    return `${this.character.balance}(${this.character.balancePoints} points)`;
  }
  get bleedingResistance(): string {
    return `${this.character.bleedingResistance}(${this.character.bleedingResistancePoints} points)`;
  }
  get poisionResistance(): string {
    return `${this.character.poisionResistance}(${this.character.poisionResistancePoints} points)`;
  }
  get curseResistance(): string {
    return `${this.character.curseResistance}(${this.character.curseResistancePoints} points)`;
  }

  get threat(): string {
    return `${this.character.threat}(${this.character.threatDice})`;
  }
  get eloquence(): string {
    return `${this.character.eloquence}(${this.character.eloquenceDice})`;
  }
  get attentiveness(): string {
    return `${this.character.attentiveness}(${this.character.attentivenessDice})`;
  }
  get luck(): string {
    return `${this.character.luck}(${this.character.luckPercent}%)`;
  }

  get spellSlots(): string {
    return this.character.spellSlots.toString();
  }
  get spells(): {
    key: string;
    value: string;
  }[] {
    return this.character.spells.map(({ name, count }) => ({
      key: name,
      value: count.toString(),
    }));
  }

  get staminaRecoveryRate(): string {
    return this.character.staminaRecoveryRate.toString();
  }

  get balanceRecoveryRate(): string {
    return this.character.balanceRecoveryRate.toString();
  }

  get stepLength(): string {
    return this.character.stepLength.toString();
  }

  get runLength(): string {
    return this.character.runLength.toString();
  }

  get runCost(): string {
    return this.character.runCost.toString();
  }

  get dodgeChance(): string {
    return this.character.dodgeChance;
  }

  get rollLength(): string {
    return this.character.rollLength.toString();
  }

  get rollSpeed(): string {
    return this.character.rollSpeed.toString();
  }

  get rollCost(): string {
    return this.character.rollCost.toString();
  }

  get requiredSouls(): string {
    return this.character.requiredSouls.toString();
  }
*/
  constructor(private character: Character & { properties: IProperties }) {}
}
