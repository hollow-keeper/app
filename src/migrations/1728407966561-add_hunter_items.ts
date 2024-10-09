import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHunterItems1728407966561 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Leather Boots', 2.8, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 12.7, "slashProtection": 12, "pierceProtection": 12, "magicalProtection": 12, "flameProtection": 6, "flashProtection":13, "bleedingResistance": 13, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
              ('Leather Armor', 4.7, 0, '{}', '{ "physicalProtection": 24, "crushProtection": 25.4, "slashProtection": 24, "pierceProtection": 24, "magicalProtection": 20, "flameProtection": 12, "flashProtection":23, "bleedingResistance": 21, "poisonResistance": 20, "curseResistance": 0 }', 'item'),
              ('Leather Gloves', 2.8, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 12.7, "slashProtection": 12, "pierceProtection": 12, "magicalProtection": 12, "flameProtection": 6, "flashProtection":13, "bleedingResistance": 13, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
              ('Large Leather Shield', 1.5, 0, '{}', '{}', 'item'),
              ('Shortsword', 2, 0, '{}', '{}', 'item'),
              ('Short Bow', 0.5, 0, '{}', '{}', 'item')
              `,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `DELETE FROM items WHERE name in ('Leather Boots', 'Leather Armor', 'Leather Gloves', 'Large Leather Shield', 'Shortsword', 'Short Bow')`,
        );
      }
}
