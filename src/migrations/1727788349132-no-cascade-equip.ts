import { MigrationInterface, QueryRunner } from "typeorm";

export class NoCascadeEquip1727788349132 implements MigrationInterface {
    name = 'NoCascadeEquip1727788349132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "equipments_id_seq" OWNED BY "equipments"."id"`);
        await queryRunner.query(`ALTER TABLE "equipments" ALTER COLUMN "id" SET DEFAULT nextval('"equipments_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`);
        await queryRunner.query(`ALTER TABLE "equipments" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "equipments_id_seq"`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
