import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArtists1731927936989 implements MigrationInterface {
  name = 'AddArtists1731927936989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "artists" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "grammy" boolean NOT NULL, 
      PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artists"`);
  }
}
