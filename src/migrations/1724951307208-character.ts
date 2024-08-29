import { MigrationInterface, QueryRunner } from "typeorm";

export class Character1724951307208 implements MigrationInterface {
    name = 'Character1724951307208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characteristics" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "vitality" integer NOT NULL, "attunement" integer NOT NULL, "endurance" integer NOT NULL, "strength" integer NOT NULL, "dexterity" integer NOT NULL, "resistance" integer NOT NULL, "intelligence" integer NOT NULL, "faith" integer NOT NULL, "perception" integer NOT NULL, "charisma" integer NOT NULL, CONSTRAINT "PK_a64133a287a0f2d735da40fcd89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "descriptions" ("id" SERIAL NOT NULL, "origin" character varying NOT NULL, "name" character varying NOT NULL, "game_class" character varying NOT NULL, CONSTRAINT "PK_5000c6760d45a086993eec92ded" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characters" ("id" SERIAL NOT NULL, "equipment" character varying NOT NULL, "description_id" integer, "characteristics_id" integer, CONSTRAINT "REL_673bfcdca23772844cdcc43e59" UNIQUE ("description_id"), CONSTRAINT "REL_ff58fa2902552abcd04aadd317" UNIQUE ("characteristics_id"), CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_673bfcdca23772844cdcc43e59d" FOREIGN KEY ("description_id") REFERENCES "descriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_ff58fa2902552abcd04aadd317e" FOREIGN KEY ("characteristics_id") REFERENCES "characteristics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_ff58fa2902552abcd04aadd317e"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_673bfcdca23772844cdcc43e59d"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP TABLE "descriptions"`);
        await queryRunner.query(`DROP TABLE "characteristics"`);
    }

}
