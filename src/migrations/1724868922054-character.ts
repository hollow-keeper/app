import { MigrationInterface, QueryRunner } from "typeorm";

export class Character1724868922054 implements MigrationInterface {
    name = 'Character1724868922054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characters" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "characteristics" character varying NOT NULL, "equipment" character varying NOT NULL, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "characters"`);
    }

}
