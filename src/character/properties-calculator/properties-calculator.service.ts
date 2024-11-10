import { Injectable } from '@nestjs/common';

import { Item } from '../../item';
import { Character, Characteristics } from '../entities';
import { Equipment } from '../equipment/entities';

const vitalityToHealthMap = [
  0, 400, 415, 433, 451, 471, 490, 511, 530, 552, 573, 594, 616, 638, 658, 682,
  698, 718, 742, 766, 792, 821, 849, 878, 908, 938, 970, 1001, 1034, 1066, 1100,
  1123, 1147, 1170, 1193, 1216, 1239, 1261, 1283, 1304, 1325, 1346, 1366, 1386,
  1405, 1424, 1442, 1458, 1474, 1489, 1500, 1508, 1517, 1526, 1535, 1544, 1553,
  1562, 1571, 1580, 1588, 1597, 1606, 1615, 1623, 1632, 1641, 1649, 1658, 1666,
  1675, 1683, 1692, 1700, 1709, 1717, 1725, 1734, 1742, 1750, 1758, 1767, 1775,
  1783, 1791, 1799, 1807, 1814, 1822, 1830, 1837, 1845, 1852, 1860, 1867, 1874,
  1881, 1888, 1894, 1900,
];
const enduranceToStaminaMap = [
  0, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 93, 95, 97, 98, 100, 102, 104, 106,
  108, 110, 112, 115, 117, 119, 121, 124, 126, 129, 131, 133, 136, 139, 141,
  144, 146, 149, 152, 154, 157, 160, 160, 160, 160, 160, 160, 160, 160, 160,
  160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
  160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
  160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
  160, 160, 160, 160, 160, 160,
];
const bleedingResistanceMap = [
  0, 10, 13, 17, 20, 23, 27, 30, 33, 37, 40, 44, 48, 52, 56, 60, 63, 65, 68, 71,
  73, 76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 101, 101, 102, 103, 104, 104,
  106, 106, 107, 107, 108, 109, 109, 110, 111, 112, 112, 113, 114, 114, 115,
  116, 117, 117, 118, 119, 120, 120, 121, 122, 122, 123, 124, 125, 126, 128,
  127, 128, 128, 129, 130, 130, 131, 132, 133, 133, 134, 135, 136, 136, 137,
  138, 138, 139, 140, 141, 141, 142, 143, 143, 144, 145, 146, 146, 147, 148,
  149, 149, 150,
];
const poisonResistanceMap = [
  0, 5, 8, 11, 14, 17, 20, 23, 26, 28, 30, 36, 42, 48, 54, 60, 63, 65, 67, 69,
  71, 73, 76, 79, 82, 85, 88, 91, 94, 97, 100, 101, 102, 103, 103, 104, 105,
  105, 106, 106, 107, 108, 109, 110, 110, 111, 111, 112, 113, 113, 114, 115,
  116, 117, 118, 119, 120, 120, 121, 121, 122, 123, 123, 124, 124, 125, 125,
  126, 126, 127, 128, 129, 130, 131, 132, 133, 133, 134, 134, 135, 135, 136,
  136, 137, 138, 139, 140, 141, 141, 142, 142, 143, 143, 144, 145, 146, 147,
  148, 149, 149, 150, 150,
];

@Injectable()
export class PropertiesCalculatorService {
  health(characteristics: Characteristics, equipment: Equipment) {
    return (
      vitalityToHealthMap[characteristics.vitality] +
      (this.propertiesBonus(equipment).health ?? 0)
    );
  }

  stamina(characteristics: Characteristics, equipment: Equipment) {
    return (
      enduranceToStaminaMap[characteristics.endurance] +
      (this.propertiesBonus(equipment).stamina ?? 0)
    );
  }

  carryingCapacity(characteristics: Characteristics, equipment: Equipment) {
    return (
      40 +
      characteristics.endurance +
      (this.propertiesBonus(equipment).carryingCapacity ?? 0)
    );
  }

  unarmoredPhysicalProtection(characteristics: Characteristics): number {
    return 19 + Math.floor(characteristics.level);
  }
  physicalProtection(characteristics: Characteristics, equipment: Equipment) {
    return (
      this.unarmoredPhysicalProtection(characteristics) +
      (this.propertiesBonus(equipment).physicalProtection ?? 0)
    );
  }
  crushProtection(characteristics: Characteristics, equipment: Equipment) {
    return (
      this.unarmoredPhysicalProtection(characteristics) +
      (this.propertiesBonus(equipment).crushProtection ?? 0)
    );
  }
  slashProtection(characteristics: Characteristics, equipment: Equipment) {
    return (
      this.unarmoredPhysicalProtection(characteristics) +
      (this.propertiesBonus(equipment).slashProtection ?? 0)
    );
  }
  pierceProtection(characteristics: Characteristics, equipment: Equipment) {
    return (
      this.unarmoredPhysicalProtection(characteristics) +
      (this.propertiesBonus(equipment).pierceProtection ?? 0)
    );
  }

  unarmoredMagicalProtection(characteristics: Characteristics) {
    return 4 + characteristics.level + characteristics.faith;
  }
  magicalProtection(characteristics: Characteristics, equipment: Equipment) {
    return (
      this.unarmoredMagicalProtection(characteristics) +
      (this.propertiesBonus(equipment).magicalProtection ?? 0)
    );
  }

  unarmoredFlameProtection(characteristics: Characteristics) {
    return 9 + characteristics.resistance;
  }
  flameProtection(characteristics: Characteristics, equipment: Equipment) {
    return (
      this.unarmoredFlameProtection(characteristics) +
      (this.propertiesBonus(equipment).flameProtection ?? 0)
    );
  }

  unarmoredFlashProtection() {
    return 16;
  }
  flashProtection(equipment: Equipment) {
    return (
      this.unarmoredFlashProtection() +
      (this.propertiesBonus(equipment).flashProtection ?? 0)
    );
  }

  bleedingResistance(characteristics: Characteristics, equipment: Equipment) {
    return (
      bleedingResistanceMap[characteristics.endurance] +
      (this.propertiesBonus(equipment).bleedingResistance ?? 0)
    );
  }

  poisonResistance(characteristics: Characteristics, equipment: Equipment) {
    return (
      poisonResistanceMap[characteristics.resistance] +
      (this.propertiesBonus(equipment).poisonResistance ?? 0)
    );
  }

  curseResistance(equipment: Equipment) {
    return 30 + (this.propertiesBonus(equipment).curseResistance ?? 0);
  }

  threat(characteristics: Characteristics, equipment: Equipment) {
    return (
      Math.floor(
        (characteristics.charisma *
          (characteristics.strength + characteristics.dexterity)) /
          200,
      ) + (this.propertiesBonus(equipment).threat ?? 0)
    );
  }

  eloquence(characteristics: Characteristics, equipment: Equipment) {
    return (
      Math.floor(
        (characteristics.charisma *
          (characteristics.attunement + characteristics.intelligence)) /
          200,
      ) + (this.propertiesBonus(equipment).eloquence ?? 0)
    );
  }

  attentiveness(characteristics: Characteristics, equipment: Equipment) {
    return (
      characteristics.perception +
      (this.propertiesBonus(equipment).attentiveness ?? 0)
    );
  }

  luck(equipment: Equipment) {
    return 100 + (this.propertiesBonus(equipment).luck ?? 0);
  }

  spellSlots(characteristics: Characteristics, equipment: Equipment) {
    return (
      (() => {
        if (characteristics.attunement >= 50) {
          return 10;
        }
        if (characteristics.attunement >= 41) {
          return 9;
        }
        if (characteristics.attunement >= 34) {
          return 8;
        }
        if (characteristics.attunement >= 28) {
          return 7;
        }
        if (characteristics.attunement >= 23) {
          return 6;
        }
        if (characteristics.attunement >= 19) {
          return 5;
        }
        if (characteristics.attunement >= 16) {
          return 4;
        }
        if (characteristics.attunement >= 14) {
          return 3;
        }
        if (characteristics.attunement >= 12) {
          return 2;
        }
        if (characteristics.attunement > 10) {
          return 1;
        }

        return 0;
      })() + (this.propertiesBonus(equipment).spellSlots ?? 0)
    );
  }

  items(equipment: Equipment): Item[];
  items<K extends keyof Item>(equipment: Equipment, key: K): Item[K][];
  items<K extends keyof Item>(
    equipment: Equipment,
    key?: K,
  ): Item[K][] | Item[] {
    const items = [
      equipment.helmet,
      equipment.armor,
      equipment.arms,
      equipment.legs,
      equipment.ring1,
      equipment.ring2,
      equipment.left_weapon_primary,
      equipment.right_weapon_primary,
    ].filter((item) => !!item);
    if (!key) {
      return items;
    }
    return items.map((item) => item[key]);
  }

  weight(equipment: Equipment) {
    return this.items(equipment).reduce((acc, val) => acc + val.weight, 0);
  }

  balance(equipment: Equipment) {
    return this.items(equipment).reduce((acc, val) => acc + val.balance, 0);
  }

  propertiesBonus(equipment: Equipment) {
    return this.items(equipment, 'properties_bonus').reduce((acc, item) => {
      for (const [key, value] of Object.entries(item)) {
        acc[key] = (acc[key] ?? 0) + value;
      }
      return acc;
    }, {});
  }

  staminaRecoveryRate(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      45 *
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  balanceRecoveryRate(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      25 *
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  runLength(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      8 *
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  stepLength(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(this.runLength(characteristics, equipment) / 2);
  }

  runCost(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      8 /
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  rollLength(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      6 *
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  dodgeChance(characteristics: Characteristics) {
    return characteristics.dexterity;
  }

  rollCost(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      8 /
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  rollTime(characteristics: Characteristics, equipment: Equipment) {
    return Math.floor(
      1 /
        (1 -
          0.9 *
            (this.weight(equipment) /
              this.carryingCapacity(characteristics, equipment))),
    );
  }

  requiredSouls(level: number) {
    const levelsArr = [0, 637, 690, 707, 724, 741, 758, 775, 793, 811, 829];

    if (level < 11) {
      return levelsArr[level - 1];
    }

    return Math.floor(
      0.02 * Math.pow(level, 3) +
        3.06 * Math.pow(level, 2) +
        105.6 * level -
        895,
    );
  }

  calculate(character: Character) {
    const { equipment, characteristics } = character;

    return {
      health: this.health(characteristics, equipment),
      stamina: this.stamina(characteristics, equipment),
      carryingCapacity: this.carryingCapacity(characteristics, equipment),
      unarmoredPhysicalProtection:
        this.unarmoredPhysicalProtection(characteristics),
      physicalProtection: this.physicalProtection(characteristics, equipment),
      crushProtection: this.crushProtection(characteristics, equipment),
      slashProtection: this.slashProtection(characteristics, equipment),
      pierceProtection: this.pierceProtection(characteristics, equipment),
      unarmoredMagicalProtection:
        this.unarmoredMagicalProtection(characteristics),
      magicalProtection: this.magicalProtection(characteristics, equipment),
      unarmoredFlameProtection: this.unarmoredFlameProtection(characteristics),
      flameProtection: this.flameProtection(characteristics, equipment),
      unarmoredFlashProtection: this.unarmoredFlashProtection(),
      flashProtection: this.flashProtection(equipment),
      bleedingResistance: this.bleedingResistance(characteristics, equipment),
      poisonResistance: this.poisonResistance(characteristics, equipment),
      curseResistance: this.curseResistance(equipment),
      threat: this.threat(characteristics, equipment),
      eloquence: this.eloquence(characteristics, equipment),
      attentiveness: this.attentiveness(characteristics, equipment),
      luck: this.luck(equipment),
      spellSlots: this.spellSlots(characteristics, equipment),
      staminaRecoveryRate: this.staminaRecoveryRate(characteristics, equipment),
      balanceRecoveryRate: this.balanceRecoveryRate(characteristics, equipment),
      balance: this.balance(equipment),
      runLength: this.runLength(characteristics, equipment),
      stepLength: this.stepLength(characteristics, equipment),
      runCost: this.runCost(characteristics, equipment),
      rollLength: this.rollLength(characteristics, equipment),
      dodgeChance: this.dodgeChance(characteristics),
      rollCost: this.rollCost(characteristics, equipment),
      rollTime: this.rollTime(characteristics, equipment),
      requiredSouls: this.requiredSouls(characteristics.level),
      loaded: this.weight(equipment),
    };
  }
}
