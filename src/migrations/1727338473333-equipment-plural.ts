import { MigrationInterface, QueryRunner } from 'typeorm';

export class EquipmentPlural1727338473333 implements MigrationInterface {
  name = 'EquipmentPlural1727338473333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER  TABLE equipment RENAME TO equipments;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER  TABLE equipments RENAME TO equipment;`);
  }
}
