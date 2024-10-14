import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyEquipsToOneItem1727787184007 implements MigrationInterface {
  name = 'ManyEquipsToOneItem1727787184007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_6d8c34c560abd1cce8b35b19749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_9228b1db0a3da337ca54df141f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_b44caad575a8a8e79b862118f7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_07374c077af07d2795c2eb3b88a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_be4a9a5b4b694b80e667d2c245d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_08f676a199ecf6f9a4b9f18e677"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_7ea7fdeefb3b03fc9c98aa5668a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_0b991c548e826bc5efd40d05fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_f2e0794043bae9ac69a4414042d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_13ddb0a93578523b19a2408b453"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "equipments_id_seq" OWNED BY "equipments"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ALTER COLUMN "id" SET DEFAULT nextval('"equipments_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_b44caad575a8a8e79b862118f7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_07374c077af07d2795c2eb3b88a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_be4a9a5b4b694b80e667d2c245d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_08f676a199ecf6f9a4b9f18e677"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_7ea7fdeefb3b03fc9c98aa5668a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_0b991c548e826bc5efd40d05fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_f2e0794043bae9ac69a4414042d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_6d8c34c560abd1cce8b35b19749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_13ddb0a93578523b19a2408b453"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "UQ_9228b1db0a3da337ca54df141f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_0546d5df6ffcf139e7a40106417" FOREIGN KEY ("helmet_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_e8bc47d2d64f5a6a0321f9aeddf" FOREIGN KEY ("armor_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_f0704fe3f6ca3cc07b49e3f20d5" FOREIGN KEY ("arms_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_e65d8ea98d37d244c0430994112" FOREIGN KEY ("legs_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_5438751117eaaea3b91252a0e67" FOREIGN KEY ("ring1_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_84ca043bbeb7a1b166d75c0125e" FOREIGN KEY ("ring2_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_21f4d36ed290e0f79006fb38f6e" FOREIGN KEY ("left_weapon_primary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_4bc35a49ebdc5b844e83e44d296" FOREIGN KEY ("right_weapon_primary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_62ce3d9b6a9248d7b0c919efe79" FOREIGN KEY ("left_weapon_secondary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_886c1c009c984f6c5d9efcbfc33" FOREIGN KEY ("right_weapon_secondary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_394708d752da9765a502d5049a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_886c1c009c984f6c5d9efcbfc33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_62ce3d9b6a9248d7b0c919efe79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_4bc35a49ebdc5b844e83e44d296"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_21f4d36ed290e0f79006fb38f6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_84ca043bbeb7a1b166d75c0125e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_5438751117eaaea3b91252a0e67"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_e65d8ea98d37d244c0430994112"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_f0704fe3f6ca3cc07b49e3f20d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_e8bc47d2d64f5a6a0321f9aeddf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" DROP CONSTRAINT "FK_0546d5df6ffcf139e7a40106417"`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_9228b1db0a3da337ca54df141f7" UNIQUE ("right_weapon_secondary_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_13ddb0a93578523b19a2408b453" UNIQUE ("left_weapon_secondary_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_6d8c34c560abd1cce8b35b19749" UNIQUE ("right_weapon_primary_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_f2e0794043bae9ac69a4414042d" UNIQUE ("left_weapon_primary_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_0b991c548e826bc5efd40d05fd1" UNIQUE ("ring2_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_7ea7fdeefb3b03fc9c98aa5668a" UNIQUE ("ring1_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_08f676a199ecf6f9a4b9f18e677" UNIQUE ("legs_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_be4a9a5b4b694b80e667d2c245d" UNIQUE ("arms_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_07374c077af07d2795c2eb3b88a" UNIQUE ("armor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "UQ_b44caad575a8a8e79b862118f7e" UNIQUE ("helmet_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ALTER COLUMN "id" SET DEFAULT nextval('equipment_id_seq')`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "equipments_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_394708d752da9765a502d5049a5" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_13ddb0a93578523b19a2408b453" FOREIGN KEY ("left_weapon_secondary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_f2e0794043bae9ac69a4414042d" FOREIGN KEY ("left_weapon_primary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_0b991c548e826bc5efd40d05fd1" FOREIGN KEY ("ring2_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_7ea7fdeefb3b03fc9c98aa5668a" FOREIGN KEY ("ring1_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_08f676a199ecf6f9a4b9f18e677" FOREIGN KEY ("legs_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_be4a9a5b4b694b80e667d2c245d" FOREIGN KEY ("arms_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_07374c077af07d2795c2eb3b88a" FOREIGN KEY ("armor_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_b44caad575a8a8e79b862118f7e" FOREIGN KEY ("helmet_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_9228b1db0a3da337ca54df141f7" FOREIGN KEY ("right_weapon_secondary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipments" ADD CONSTRAINT "FK_6d8c34c560abd1cce8b35b19749" FOREIGN KEY ("right_weapon_primary_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
