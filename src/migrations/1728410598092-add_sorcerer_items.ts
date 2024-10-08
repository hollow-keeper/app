import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSorcererItems1728410598092 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Sorcerer Boots', 1.4, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 13, "slashProtection": 12.5, "pierceProtection": 12, "magicalProtection": 16, "flameProtection": 8, "flashProtection":10, "bleedingResistance": 9, "poisonResistance": 7, "curseResistance": 0 }', 'item'),
              ('Sorcerer Cloak', 2.3, 0, '{}', '{ "physicalProtection": 20, "crushProtection": 21.6, "slashProtection": 20.8, "pierceProtection": 20, "magicalProtection": 27, "flameProtection": 13, "flashProtection":17, "bleedingResistance": 16, "poisonResistance": 12, "curseResistance": 0 }', 'item'),
              ('Sorcerer Gauntlets', 1.4, 0, '{}', '{ "physicalProtection": 12, "crushProtection": 13, "slashProtection": 12.5, "pierceProtection": 12, "magicalProtection": 16, "flameProtection": 8, "flashProtection":10, "bleedingResistance": 9, "poisonResistance": 7, "curseResistance": 0 }', 'item'),
              ('Sorcerer Hat', 0.9, 0, '{}', '{ "physicalProtection": 8, "crushProtection": 8.6, "slashProtection": 8.3, "pierceProtection": 8.0, "magicalProtection": 10, "flameProtection": 5, "flashProtection":6, "bleedingResistance": 6, "poisonResistance": 5, "curseResistance": 0 }', 'item'),
              ('Small Leather Shield', 0.5, 0, '{}', '{}', 'item'),
              ('Sorcerer'|| chr(39) ||'s Catalyst', 2, 0, '{}', '{}', 'item'),
              ('Dagger', 0.5, 0, '{}', '{}', 'item')
              `,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `DELETE FROM items WHERE name in ('Sorcerer Boots', 'Sorcerer Cloak', 'Sorcerer Gauntlets', 'Sorcerer Hat', 'Small Leather Shield', 'Sorcerer'|| chr(39) ||'s Catalyst', 'Dagger')`,
        );
      }
}
