import { MigrationInterface, QueryRunner } from 'typeorm';

export class Equipment1724953175794 implements MigrationInterface {
  name = 'Equipment1724953175794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "characters" RENAME COLUMN "equipment" TO "equipment_id"`,
    );
    await queryRunner.query(
      `CREATE TABLE "equipment" ("id" SERIAL NOT NULL, "helmet" character varying NOT NULL, "armor" character varying NOT NULL, "arms" character varying NOT NULL, "legs" character varying NOT NULL, "ring1" character varying NOT NULL, "ring2" character varying NOT NULL, "left_weapon_primary" character varying NOT NULL, "right_weapon_primary" character varying NOT NULL, "left_weapon_secondary" character varying NOT NULL, "right_weapon_secondary" character varying NOT NULL, "souls" integer NOT NULL, "humanity" integer NOT NULL, CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP COLUMN "equipment_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD "equipment_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "UQ_394708d752da9765a502d5049a5" UNIQUE ("equipment_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "UQ_394708d752da9765a502d5049a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP COLUMN "equipment_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD "equipment_id" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "equipment"`);
    await queryRunner.query(
      `ALTER TABLE "characters" RENAME COLUMN "equipment_id" TO "equipment"`,
    );
  }
}
