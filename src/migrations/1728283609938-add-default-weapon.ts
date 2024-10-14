import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultWeapon1728283609938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES ('noj', 2, 3, '{  "strength": 1,  "dexterity": 3}', '{  "armor": 2,  "balance": 4}', 'item')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM items WHERE name='noj'`);
  }
}
