import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWandererItems1728370350751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
          ('Wanderer Boots', 2.1, 0, '{}', '{ "physicalProtection": 14, "crushProtection": 15, "slashProtection": 15, "pierceProtection": 14, "magicalProtection": 12, "flameProtection": 15, "flashProtection":13, "bleedingResistance": 13, "poisonResistance": 13, "curseResistance": 0 }', 'item'),
          ('Wanderer Coat', 3.5, 0, '{}', '{ "physicalProtection": 23, "crushProtection": 24.6, "slashProtection": 24.6, "pierceProtection": 23.0, "magicalProtection": 21, "flameProtection": 26, "flashProtection":23, "bleedingResistance": 21, "poisonResistance": 21, "curseResistance": 0 }', 'item'),
          ('Wanderer Manchette', 2.1, 0, '{}', '{ "physicalProtection": 14, "crushProtection": 15, "slashProtection": 15, "pierceProtection": 14, "magicalProtection": 12, "flameProtection": 15, "flashProtection":13, "bleedingResistance": 13, "poisonResistance": 13, "curseResistance": 0 }', 'item'),
          ('Wanderer Hood', 1.4, 0, '{}', '{ "physicalProtection": 9, "crushProtection": 9.6, "slashProtection": 9.6, "pierceProtection": 9, "magicalProtection": 8, "flameProtection": 10, "flashProtection":9, "bleedingResistance": 8, "poisonResistance": 8, "curseResistance": 0 }', 'item'),
          ('Leather Shield', 1, 0, '{}', '{}', 'item'),
          ('Scimitar', 3, 0, '{}', '{}', 'item')
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM items WHERE name in ('Wanderer Boots', 'Wanderer Coat', 'Wanderer Manchette', 'Wanderer Hood', 'Leather Shield', 'Scimitar')`,
    );
  }
}
