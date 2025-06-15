import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1731915576170 implements MigrationInterface {
  name = 'createUsers1731915576170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4() ,
        "login" character varying NOT NULL,
        "password" character varying NOT NULL,
        "version" integer NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
