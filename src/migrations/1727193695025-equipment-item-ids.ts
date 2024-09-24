import { MigrationInterface, QueryRunner } from "typeorm";

export class EquipmentItemIds1727193695025 implements MigrationInterface {
    name = 'EquipmentItemIds1727193695025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "helmet"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "armor"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "arms"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "legs"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "ring1"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "ring2"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "left_weapon_primary"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "left_weapon_secondary"`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "helmet_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_b44caad575a8a8e79b862118f7e" UNIQUE ("helmet_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "armor_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_07374c077af07d2795c2eb3b88a" UNIQUE ("armor_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "arms_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_be4a9a5b4b694b80e667d2c245d" UNIQUE ("arms_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "legs_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_08f676a199ecf6f9a4b9f18e677" UNIQUE ("legs_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "ring1_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_7ea7fdeefb3b03fc9c98aa5668a" UNIQUE ("ring1_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "ring2_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_0b991c548e826bc5efd40d05fd1" UNIQUE ("ring2_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "left_weapon_primary_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_f2e0794043bae9ac69a4414042d" UNIQUE ("left_weapon_primary_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "left_weapon_secondary_id" integer`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "UQ_13ddb0a93578523b19a2408b453" UNIQUE ("left_weapon_secondary_id")`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_b44caad575a8a8e79b862118f7e" FOREIGN KEY ("helmet_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_07374c077af07d2795c2eb3b88a" FOREIGN KEY ("armor_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_be4a9a5b4b694b80e667d2c245d" FOREIGN KEY ("arms_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_08f676a199ecf6f9a4b9f18e677" FOREIGN KEY ("legs_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_7ea7fdeefb3b03fc9c98aa5668a" FOREIGN KEY ("ring1_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_0b991c548e826bc5efd40d05fd1" FOREIGN KEY ("ring2_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_f2e0794043bae9ac69a4414042d" FOREIGN KEY ("left_weapon_primary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD CONSTRAINT "FK_13ddb0a93578523b19a2408b453" FOREIGN KEY ("left_weapon_secondary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_13ddb0a93578523b19a2408b453"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_f2e0794043bae9ac69a4414042d"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_0b991c548e826bc5efd40d05fd1"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_7ea7fdeefb3b03fc9c98aa5668a"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_08f676a199ecf6f9a4b9f18e677"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_be4a9a5b4b694b80e667d2c245d"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_07374c077af07d2795c2eb3b88a"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "FK_b44caad575a8a8e79b862118f7e"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_13ddb0a93578523b19a2408b453"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "left_weapon_secondary_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_f2e0794043bae9ac69a4414042d"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "left_weapon_primary_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_0b991c548e826bc5efd40d05fd1"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "ring2_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_7ea7fdeefb3b03fc9c98aa5668a"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "ring1_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_08f676a199ecf6f9a4b9f18e677"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "legs_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_be4a9a5b4b694b80e667d2c245d"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "arms_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_07374c077af07d2795c2eb3b88a"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "armor_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP CONSTRAINT "UQ_b44caad575a8a8e79b862118f7e"`);
        await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "helmet_id"`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "left_weapon_secondary" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "left_weapon_primary" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "ring2" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "ring1" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "legs" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "arms" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "armor" character varying`);
        await queryRunner.query(`ALTER TABLE "equipment" ADD "helmet" character varying`);
    }

}
