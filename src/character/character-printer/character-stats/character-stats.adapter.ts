import { Character } from "../../entities";
import { IProperties } from "../..//properties-calculator";

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
function healthToPoints(health: number) {
  return Math.floor(health / 19);
}

function staminaToPoints(stamina: number) {
  return Math.floor(stamina / 1.6);
}

export function protectionToPoints(protection: number) {
  return Math.floor(protection / 5.42);
}

export function balanceToBalancePoints(balance: number) {
  return Math.floor(balance / 1.21);
}

export function resistanceToPoints(resistance: number) {
  return Math.floor(resistance / 3);
}

export function luckToPercentage(luck: number) {
  return Math.floor(luck / 17);
}

export class CharacterStatsAdapter {
  get name(): string {
    return this.character.description.name;
  }

  get level(): string {
    return this.character.characteristics.level.toString();
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

  get health(): string {
    return `${this.character.properties.health}(${healthToPoints(this.character.properties.health)} points)`;
  }
  get stamina(): string {
    return `${this.character.properties.stamina}(${staminaToPoints(this.character.properties.stamina)} points)`;
  }

  get staminaRecoveryRate(): string {
    return this.character.properties.staminaRecoveryRate.toString();
  }

  get loading(): string {
    return `${this.character.properties.loaded.toFixed(
      1,
    )}/${this.character.properties.carryingCapacity.toFixed(1)}`;
  }

  get balanceRecoveryRate(): string {
    return this.character.properties.balanceRecoveryRate.toString();
  }

  get stepLength(): string {
    return this.character.properties.stepLength.toString();
  }

  get runLength(): string {
    return this.character.properties.runLength.toString();
  }

  get runCost(): string {
    return this.character.properties.runCost.toString();
  }

  get dodgeChance(): string {
    return this.character.properties.dodgeChance.toString();
  }

  get rollLength(): string {
    return this.character.properties.rollLength.toString();
  }

  get rollSpeed(): string {
    return this.character.properties.rollTime.toString();
  }

  get rollCost(): string {
    return this.character.properties.rollCost.toString();
  }

  get requiredSouls(): string {
    return this.character.properties.requiredSouls.toString();
  }
  //TODO: implement damage
  get rightHand1Damage(): string {
    return '0';
    // return this.character.rightHand1Damage.toString();
  }

  get rightHand2Damage(): string {
    return '0';
    //return this.character.rightHand2Damage.toString();
  }

  get leftHand1Damage(): string {
    return '0';
    //return this.character.leftHand1Damage.toString();
  }

  get leftHand2Damage(): string {
    return '0';
    //return this.character.leftHand2Damage.toString();
  }

  get physicalProtection(): string {
    return `${this.character.properties.physicalProtection}(${this.character.properties.unarmoredPhysicalProtection})(${protectionToPoints(this.character.properties.physicalProtection)} points)`;
  }
  get crushProtection(): string {
    return `${this.character.properties.crushProtection}()(${protectionToPoints(this.character.properties.crushProtection)} points)`;
  }
  get slashProtection(): string {
    return `${this.character.properties.slashProtection}()(${protectionToPoints(this.character.properties.slashProtection)} points)`;
  }
  get pierceProtection(): string {
    return `${this.character.properties.pierceProtection}()(${protectionToPoints(this.character.properties.pierceProtection)} points)`;
  }
  get magicalProtection(): string {
    return `${this.character.properties.magicalProtection}(${this.character.properties.unarmoredMagicalProtection})(${protectionToPoints(this.character.properties.magicalProtection)} points)`;
  }
  get flameProtection(): string {
    return `${this.character.properties.flameProtection}(${this.character.properties.unarmoredFlameProtection})(${protectionToPoints(this.character.properties.flameProtection)} points)`;
  }
  get flashProtection(): string {
    return `${this.character.properties.flashProtection}(${this.character.properties.unarmoredFlashProtection})(${protectionToPoints(this.character.properties.flashProtection)} points)`;
  }

  get balance(): string {
    return `${this.character.properties.balance}(${balanceToBalancePoints(this.character.properties.balance)} points)`;
  }

  get bleedingResistance(): string {
    return `${this.character.properties.bleedingResistance}(${resistanceToPoints(this.character.properties.bleedingResistance)} points)`;
  }

  get poisonResistance(): string {
    return `${this.character.properties.poisonResistance}(${resistanceToPoints(this.character.properties.poisonResistance)} points)`;
  }

  get curseResistance(): string {
    return `${this.character.properties.curseResistance}(${resistanceToPoints(this.character.properties.curseResistance)} points)`;
  }

  get threat(): string {
    return `${this.character.properties.threat}(${toDice(this.character.properties.threat)})`;
  }
  get eloquence(): string {
    return `${this.character.properties.eloquence}(${toDice(this.character.properties.eloquence)})`;
  }
  get attentiveness(): string {
    return `${this.character.properties.attentiveness}(${toDice(this.character.properties.attentiveness)})`;
  }
  get luck(): string {
    return `${this.character.properties.luck}(${luckToPercentage(this.character.properties.luck)}%)`;
  }

  constructor(private character: Character & { properties: IProperties }) {}
}
