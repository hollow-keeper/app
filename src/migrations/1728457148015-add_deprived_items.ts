import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeprivedItems1728457148015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO items (name, weight, balance, characteristics_bonus, properties_bonus, type) VALUES 
              ('Plank Shield', 1.5, 0, '{}', '{}', 'item'),
              ('Club', 3, 0, '{}', '{}', 'item')
              `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM items WHERE name in ('Plank Shield', 'Club')`,
    );
  }
}
