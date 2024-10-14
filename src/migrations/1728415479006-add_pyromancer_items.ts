import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPyromancerItems1728415479006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Heavy Boots', 1.6, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 13.3, "slashProtection": 12, "pierceProtection": 12, "magicalProtection": 14, "flameProtection": 18, "flashProtection":10, "bleedingResistance": 14, "poisonResistance": 35, "curseResistance": 1 }', 'item'),
              ('Tattered Cloth Robe', 2.7, 0, '{}', '{ "physicalProtection": 21, "crushProtection": 23.3, "slashProtection": 21, "pierceProtection": 21, "magicalProtection": 23, "flameProtection": 30, "flashProtection":17, "bleedingResistance": 23, "poisonResistance": 59, "curseResistance": 2 }', 'item'),
              ('Tattered Cloth Manchette', 1.6, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 13.3, "slashProtection": 12, "pierceProtection": 12, "magicalProtection": 14, "flameProtection": 18, "flashProtection":10, "bleedingResistance": 14, "poisonResistance": 35, "curseResistance": 1 }', 'item'),
              ('Tattered Cloth Hood', 1.1, 0, '{}', '{ "physicalProtection": 8, "crushProtection": 8.9, "slashProtection": 8, "pierceProtection": 8, "magicalProtection": 9, "flameProtection": 12, "flashProtection":6, "bleedingResistance": 9, "poisonResistance": 23, "curseResistance": 1 }', 'item'),
              ('Cracked Round Shield', 1, 0, '{}', '{}', 'item'),
              ('Hand Axe', 2, 0, '{}', '{}', 'item'),
              ('Pyromancy Flame', 0, 0, '{}', '{}', 'item')
              `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM items WHERE name in ('Heavy Boots', 'Tattered Cloth Robe', 'Tattered Cloth Manchette', 'Tattered Cloth Hood', 'Cracked Round Shield', 'Hand Axe', 'Pyromancy Flame')`,
    );
  }
}
