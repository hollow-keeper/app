import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWarriorItems1728326214313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
      ('Hard Leather Boots', 3.5, 0, '{}', '{ "physicalProtection": 13, "crushProtection": 13.8, "slashProtection": 13, "pierceProtection": 13, "magicalProtection": 12, "flameProtection": 7, "flashProtection":13, "bleedingResistance": 14, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
      ('Hard Leather Armor', 5.9, 0, '{}', '{ "physicalProtection": 26, "crushProtection": 27.6, "slashProtection": 26, "pierceProtection": 26, "magicalProtection": 20, "flameProtection": 13, "flashProtection":23, "bleedingResistance": 23, "poisonResistance": 20, "curseResistance": 0 }', 'item'),
      ('Hard Leather Gauntlets', 3.5, 0, '{}', '{ "physicalProtection": 13, "crushProtection": 13.8, "slashProtection": 13, "pierceProtection": 13, "magicalProtection": 12, "flameProtection": 7, "flashProtection":13, "bleedingResistance": 14, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
      ('Standart Helm', 3.5, 5, '{}', '{ "physicalProtection": 14, "crushProtection": 8, "slashProtection": 16, "pierceProtection": 14, "magicalProtection": 8, "flameProtection": 8, "flashProtection":6, "bleedingResistance": 9, "poisonResistance": 8, "curseResistance": 0 }', 'item'),
      ('Heater Shield', 2, 0, '{}', '{}', 'item'),
      ('Longsword', 3, 0, '{}', '{}', 'item')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM items WHERE name in ('Hard Leather Boots', 'Hard Leather Gauntlets', 'Hard Leather Armor', 'Standart Helm', 'Heater Shield', 'Longsword')`);
  }
}