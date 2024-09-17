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
    equipment: Omit<Equipment, 'id'>;
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
  souls: 0,
  humanity: 0,
};

export const gameClasses: GameClasses = {
  [GameClass.warrior]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 86,
    },
  },
  [GameClass.knight]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 86,
    },
  },
  [GameClass.wanderer]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 86,
    },
  },
  [GameClass.thief]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 86,
    },
  },
  [GameClass.bandit]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 86,
    },
  },
  [GameClass.hunter]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 86,
    },
  },
  [GameClass.sorcerer]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 82,
    },
  },
  [GameClass.pyromancer]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 84,
    },
  },
  [GameClass.cleric]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 84,
    },
  },
  [GameClass.deprived]: {
    equipment: {
      ...defaultEquipment,
      right_weapon_primary: 'noga',
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
      charisma: 88,
    },
  },
};
