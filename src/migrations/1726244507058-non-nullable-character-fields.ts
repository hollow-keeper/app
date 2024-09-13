import { MigrationInterface, QueryRunner } from "typeorm";

export class NonNullableCharacterFields1726244507058 implements MigrationInterface {
    name = 'NonNullableCharacterFields1726244507058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "helmet" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "armor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "arms" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "legs" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "ring1" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "ring2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "left_weapon_primary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "right_weapon_primary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "left_weapon_secondary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "right_weapon_secondary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "souls" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "humanity" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_673bfcdca23772844cdcc43e59d"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_ff58fa2902552abcd04aadd317e"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`);
        await queryRunner.query(`ALTER TABLE "characters" ALTER COLUMN "description_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ALTER COLUMN "characteristics_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ALTER COLUMN "equipment_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_673bfcdca23772844cdcc43e59d" FOREIGN KEY ("description_id") REFERENCES "descriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_ff58fa2902552abcd04aadd317e" FOREIGN KEY ("characteristics_id") REFERENCES "characteristics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_ff58fa2902552abcd04aadd317e"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_673bfcdca23772844cdcc43e59d"`);
        await queryRunner.query(`ALTER TABLE "characters" ALTER COLUMN "equipment_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ALTER COLUMN "characteristics_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ALTER COLUMN "description_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_ff58fa2902552abcd04aadd317e" FOREIGN KEY ("characteristics_id") REFERENCES "characteristics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_673bfcdca23772844cdcc43e59d" FOREIGN KEY ("description_id") REFERENCES "descriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "humanity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "souls" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "right_weapon_secondary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "left_weapon_secondary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "right_weapon_primary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "left_weapon_primary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "ring2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "ring1" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "legs" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "arms" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "armor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipment" ALTER COLUMN "helmet" SET NOT NULL`);
    }

}
