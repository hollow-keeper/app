import { MigrationInterface, QueryRunner } from "typeorm";

export class AddThiefItems1728372836031 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Black Leather Boots', 3, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 12.8, "slashProtection": 12, "pierceProtection": 12, "magicalProtection": 19, "flameProtection": 13, "flashProtection":15, "bleedingResistance": 23, "poisonResistance": 31, "curseResistance": 0 }', 'item'),
              ('Black Leather Armor', 3.1, 0, '{}', '{ "physicalProtection": 23, "crushProtection": 24.6, "slashProtection": 23, "pierceProtection": 23, "magicalProtection": 20, "flameProtection": 14, "flashProtection":16, "bleedingResistance": 23, "poisonResistance": 31, "curseResistance": 0 }', 'item'),
              ('Black Leather Gloves', 1.8, 0, '{}', '{ "physicalProtection": 13, "crushProtection": 13.9, "slashProtection": 13, "pierceProtection": 13, "magicalProtection": 12, "flameProtection": 8, "flashProtection":9, "bleedingResistance": 14, "poisonResistance": 18, "curseResistance": 0 }', 'item'),
              ('Thief Mask', 1.2, 0, '{}', '{ "physicalProtection": 9, "crushProtection": 9.6, "slashProtection": 9, "pierceProtection": 9, "magicalProtection": 8, "flameProtection": 5, "flashProtection":6, "bleedingResistance": 9, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
              ('Target Shield', 2, 0, '{}', '{}', 'item'),
              ('Bandit'|| chr(39) ||'s Knife', 1, 0, '{}', '{}', 'item')
              `,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `DELETE FROM items WHERE name in ('Black Leather Boots', 'Black Leather Armor', 'Black Leather Gloves', 'Thief Mask', 'Target Shield', 'Bandit'|| chr(39) ||'s Knife')`,
        );
      }
}
