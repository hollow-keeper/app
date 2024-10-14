import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKnightItems1728367719922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
          ('Knight Leggings', 6.4, 12, '{}', '{ "physicalProtection": 22, "crushProtection": 20.9, "slashProtection": 25.5, "pierceProtection": 21.6, "magicalProtection": 10, "flameProtection": 11, "flashProtection":8, "bleedingResistance": 14, "poisonResistance": 9, "curseResistance": 0 }', 'item'),
          ('Knight Armor', 10.9, 20, '{}', '{ "physicalProtection": 37, "crushProtection": 35.1, "slashProtection": 42.9, "pierceProtection": 36.3, "magicalProtection": 16, "flameProtection": 18, "flashProtection":13, "bleedingResistance": 23, "poisonResistance": 16, "curseResistance": 0 }', 'item'),
          ('Knight Gauntlets', 3.5, 6, '{}', '{ "physicalProtection": 17, "crushProtection": 16.2, "slashProtection": 19.7, "pierceProtection": 19.7, "magicalProtection": 7, "flameProtection": 8, "flashProtection":4, "bleedingResistance": 8, "poisonResistance": 5, "curseResistance": 0 }', 'item'),
          ('Knight Helm', 4.2, 8, '{}', '{ "physicalProtection": 14, "crushProtection": 13.3, "slashProtection": 16.2, "pierceProtection": 13.7, "magicalProtection": 6, "flameProtection": 8, "flashProtection":5, "bleedingResistance": 9, "poisonResistance": 6, "curseResistance": 0 }', 'item'),
          ('Tower Kite Shield', 3, 0, '{}', '{}', 'item'),
          ('Broadsword', 3, 0, '{}', '{}', 'item')
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM items WHERE name in ('Knight Leggings', 'Knight Armor', 'Knight Gauntlets', 'Knight Helm', 'Tower Kite Shield', 'Broadsword')`,
    );
  }
}
