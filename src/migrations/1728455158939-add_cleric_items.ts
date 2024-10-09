import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClericItems1728455158939 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Holy Trousers', 2, 0, '{}', '{ "physicalProtection": 14, "crushProtection": 16.5, "slashProtection": 14, "pierceProtection": 14, "magicalProtection": 15, "flameProtection": 8, "flashProtection":12, "bleedingResistance": 15, "poisonResistance": 13, "curseResistance": 0 }', 'item'),
              ('Holy Robe', 4, 0, '{}', '{ "physicalProtection": 22, "crushProtection": 26, "slashProtection": 22, "pierceProtection": 22, "magicalProtection": 23, "flameProtection": 14, "flashProtection":19, "bleedingResistance": 24, "poisonResistance": 20, "curseResistance": 0 }', 'item'),
              ('Traveling Gloves', 0.7, 0, '{}', '{ "physicalProtection": 5, "crushProtection": 5.9, "slashProtection": 5, "pierceProtection": 5, "magicalProtection": 4, "flameProtection": 3, "flashProtection":4, "bleedingResistance": 5, "poisonResistance": 4, "curseResistance": 0 }', 'item'),
              ('Priest'|| chr(39) ||'s Hat', 1.2, 0, '{}', '{ "physicalProtection": 8, "crushProtection": 9.4, "slashProtection": 8, "pierceProtection": 8, "magicalProtection": 9, "flameProtection": 5, "flashProtection":7, "bleedingResistance": 9, "poisonResistance": 8, "curseResistance": 0 }', 'item'),
              ('East-West Shield', 1, 0, '{}', '{}', 'item'),
              ('Mace', 4, 0, '{}', '{}', 'item')
              `,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `DELETE FROM items WHERE name in ('Holy Trousers', 'Holy Robe', 'Traveling Gloves', 'Priest'|| chr(39) ||'s Hat', 'East-West Shield', 'Mace')`,
        );
      }
}
