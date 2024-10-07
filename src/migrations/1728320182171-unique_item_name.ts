import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueItemName1728320182171 implements MigrationInterface {
    name = 'UniqueItemName1728320182171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "UQ_213736582899b3599acaade2cd1" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "UQ_213736582899b3599acaade2cd1"`);
    }

}
