import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatacterQwepment1724943221697 implements MigrationInterface {
    name = 'ChatacterQwepment1724943221697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" ADD "qwepment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "qwepment"`);
    }

}
