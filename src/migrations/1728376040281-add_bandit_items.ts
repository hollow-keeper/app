import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBanditItems1728376040281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Brigand Trousers', 1.8, 0, '{}', '{ "physicalProtection": 14, "crushProtection": 15.4, "slashProtection": 14, "pierceProtection": 12.6, "magicalProtection": 12, "flameProtection": 8, "flashProtection":10, "bleedingResistance": 12, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
              ('Brigand Armor', 3.1, 0, '{}', '{ "physicalProtection": 23, "crushProtection": 25.3, "slashProtection": 23, "pierceProtection": 20.7, "magicalProtection": 20, "flameProtection": 13, "flashProtection":17, "bleedingResistance": 20, "poisonResistance": 20, "curseResistance": 0 }', 'item'),
              ('Brigand Gauntlets', 1.8, 0, '{}', '{ "physicalProtection": 14, "crushProtection": 15.4, "slashProtection": 14, "pierceProtection": 12.6, "magicalProtection": 12, "flameProtection": 8, "flashProtection":10, "bleedingResistance": 12, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
              ('Brigand Hood', 1.2, 0, '{}', '{ "physicalProtection": 9, "crushProtection": 9.9, "slashProtection": 9, "pierceProtection": 8.1, "magicalProtection": 8, "flameProtection": 5, "flashProtection":6, "bleedingResistance": 8, "poisonResistance": 8, "curseResistance": 0 }', 'item'),
              ('Spider Shield', 3, 0, '{}', '{}', 'item'),
              ('Battle Axe', 4, 0, '{}', '{}', 'item')
              `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM items WHERE name in ('Brigand Trousers', 'Brigand Armor', 'Brigand Gauntlets', 'Brigand Hood', 'Spider Shield', 'Battle Axe')`,
    );
  }
}
