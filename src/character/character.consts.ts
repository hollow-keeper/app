import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Characteristics } from './entities/characteristics.entity';

export enum GameClass {
  warrior = 'warrior',
  knight = 'knight',
  wanderer = 'wanderer',
  thief = 'thief',
  bandit = 'bandit',
  hunter = 'hunter',
  sorcerer = 'sorcerer',
  pyromancer = 'pyromancer',
  cleric = 'cleric',
  deprived = 'deprived',
}

export type GameClasses = {
  [key in GameClass]: {
    characteristics: Omit<Characteristics, 'id'>;
    equipment: Record<
      keyof Omit<Equipment, 'id' | 'souls' | 'humanity'>,
      string | null
    >;
  };
};

const defaultEquipment = {
  helmet: null,
  armor: null,
  arms: null,
  legs: null,
  ring1: null,
  ring2: null,
  left_weapon_primary: null,
  right_weapon_primary: null,
  left_weapon_secondary: null,
  right_weapon_secondary: null,
};

const weapon = {
  id: 1,
  name: 'noj',
  weight: 2,
  balance: 3,
  characteristics_bonus: {
    strength: 1,
    dexterity: 3,
  },
  properties_bonus: {
    armor: 2,
    balance: 4,
  },
};

export const gameClasses: GameClasses = {
  [GameClass.warrior]: {
    equipment: {
      ...defaultEquipment,
      legs: 'Hard Leather Boots',
      armor: 'Hard Leather Armor',
      arms: 'Hard Leather Gauntlets',
      helmet: 'Standart Helm',
      left_weapon_primary: 'Heater Shield',
      right_weapon_primary: 'Longsword',
    },
    characteristics: {
      level: 4,
      vitality: 11,
      attunement: 8,
      endurance: 12,
      strength: 13,
      dexterity: 13,
      resistance: 11,
      intelligence: 9,
      faith: 9,
      perception: 0,
      charisma: 9,
    },
  },
  [GameClass.knight]: {
    equipment: {
      ...defaultEquipment,
      legs: 'Knight Leggings',
      armor: 'Knight Armor',
      arms: 'Knight Gauntlets',
      helmet: 'Knight Helm',
      left_weapon_primary: 'Tower Kite Shield',
      right_weapon_primary: 'Broadsword',
    },
    characteristics: {
      level: 5,
      vitality: 14,
      attunement: 10,
      endurance: 10,
      strength: 11,
      dexterity: 11,
      resistance: 10,
      intelligence: 9,
      faith: 11,
      perception: 0,
      charisma: 11,
    },
  },
  [GameClass.wanderer]: {
    equipment: {
      ...defaultEquipment,
      legs: 'Wanderer Boots',
      armor: 'Wanderer Coat',
      arms: 'Wanderer Manchette',
      helmet: 'Wanderer Hood',
      left_weapon_primary: 'Leather Shield',
      right_weapon_primary: 'Scimitar',
    },
    characteristics: {
      level: 3,
      vitality: 10,
      attunement: 11,
      endurance: 10,
      strength: 10,
      dexterity: 14,
      resistance: 12,
      intelligence: 11,
      faith: 8,
      perception: 0,
      charisma: 10,
    },
  },
  [GameClass.thief]: {
    equipment: {
      ...defaultEquipment,
      legs: 'Black Leather Boots',
      armor: 'Black Leather Armor',
      arms: 'Black Leather Gloves',
      helmet: 'Thief Mask',
      left_weapon_primary: 'Target Shield',
      right_weapon_primary: "Bandit's Knife",
    },
    characteristics: {
      level: 5,
      vitality: 9,
      attunement: 11,
      endurance: 9,
      strength: 9,
      dexterity: 15,
      resistance: 10,
      intelligence: 12,
      faith: 11,
      perception: 0,
      charisma: 11,
    },
  },
  [GameClass.bandit]: {
    equipment: {
      ...defaultEquipment,
      legs: 'Brigand Trousers',
      armor: 'Brigand Armor',
      arms: 'Brigand Gauntlets',
      helmet: 'Brigand Hood',
      left_weapon_primary: 'Spider Shield',
      right_weapon_primary: 'Battle Axe',
    },
    characteristics: {
      level: 4,
      vitality: 12,
      attunement: 8,
      endurance: 14,
      strength: 14,
      dexterity: 9,
      resistance: 11,
      intelligence: 8,
      faith: 10,
      perception: 0,
      charisma: 10,
    },
  },
  [GameClass.hunter]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: weapon.name,
    },
    characteristics: {
      level: 4,
      vitality: 11,
      attunement: 9,
      endurance: 11,
      strength: 12,
      dexterity: 14,
      resistance: 11,
      intelligence: 9,
      faith: 9,
      perception: 0,
      charisma: 9,
    },
  },
  [GameClass.sorcerer]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: weapon.name,
    },
    characteristics: {
      level: 3,
      vitality: 8,
      attunement: 15,
      endurance: 8,
      strength: 9,
      dexterity: 11,
      resistance: 8,
      intelligence: 15,
      faith: 8,
      perception: 0,
      charisma: 12,
    },
  },
  [GameClass.pyromancer]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: weapon.name,
    },
    characteristics: {
      level: 1,
      vitality: 10,
      attunement: 12,
      endurance: 11,
      strength: 12,
      dexterity: 9,
      resistance: 12,
      intelligence: 10,
      faith: 8,
      perception: 0,
      charisma: 9,
    },
  },
  [GameClass.cleric]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: weapon.name,
    },
    characteristics: {
      level: 2,
      vitality: 11,
      attunement: 11,
      endurance: 9,
      strength: 12,
      dexterity: 8,
      resistance: 11,
      intelligence: 8,
      faith: 14,
      perception: 0,
      charisma: 11,
    },
  },
  [GameClass.deprived]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: weapon.name,
    },
    characteristics: {
      level: 6,
      vitality: 11,
      attunement: 11,
      endurance: 11,
      strength: 11,
      dexterity: 11,
      resistance: 11,
      intelligence: 11,
      faith: 11,
      perception: 0,
      charisma: 8,
    },
  },
};
