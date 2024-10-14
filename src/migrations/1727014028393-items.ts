import { MigrationInterface, QueryRunner } from 'typeorm';

export class Items1727014028393 implements MigrationInterface {
  name = 'Items1727014028393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "weight" integer NOT NULL, "balance" double precision NOT NULL, "characteristics_bonus" jsonb, "properties_bonus" jsonb, "damage" integer, "damage_type" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_08b27979745f1f9d89f3bc21df" ON "items" ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_08b27979745f1f9d89f3bc21df"`,
    );
    await queryRunner.query(`DROP TABLE "items"`);
  }
}
