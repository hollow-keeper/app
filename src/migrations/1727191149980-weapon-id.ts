import { MigrationInterface, QueryRunner } from 'typeorm';

export class WeaponId1727191149980 implements MigrationInterface {
  name = 'WeaponId1727191149980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP COLUMN "right_weapon_primary"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP COLUMN "right_weapon_secondary"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "right_weapon_primary_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "UQ_6d8c34c560abd1cce8b35b19749" UNIQUE ("right_weapon_primary_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "right_weapon_secondary_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "UQ_9228b1db0a3da337ca54df141f7" UNIQUE ("right_weapon_secondary_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "FK_6d8c34c560abd1cce8b35b19749" FOREIGN KEY ("right_weapon_primary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "FK_9228b1db0a3da337ca54df141f7" FOREIGN KEY ("right_weapon_secondary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "FK_9228b1db0a3da337ca54df141f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "FK_6d8c34c560abd1cce8b35b19749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "UQ_9228b1db0a3da337ca54df141f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP COLUMN "right_weapon_secondary_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "UQ_6d8c34c560abd1cce8b35b19749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP COLUMN "right_weapon_primary_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "right_weapon_secondary" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "right_weapon_primary" character varying`,
    );
  }
}
