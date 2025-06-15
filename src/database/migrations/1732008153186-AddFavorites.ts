import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavorites1732008153186 implements MigrationInterface {
  name = 'AddFavorites1732008153186';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        CONSTRAINT "PK_Favorites" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_artists" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "favoritesId" uuid NOT NULL,
        "artistsId" uuid NOT NULL,
        CONSTRAINT "PK_Favorites_artists" PRIMARY KEY ("favoritesId", "artistsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_FavoritesId_artists" ON "favorites_artists" ("favoritesId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_Favorites_artistsId" ON "favorites_artists" ("artistsId")`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_albums" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "favoritesId" uuid NOT NULL,
        "albumsId" uuid NOT NULL,
        CONSTRAINT "PK_Favorites_albums" PRIMARY KEY ("favoritesId", "albumsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_FavoritesId_albums" ON "favorites_albums" ("favoritesId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_Favorites_albumsId" ON "favorites_albums" ("albumsId")`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_tracks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "favoritesId" uuid NOT NULL,
        "tracksId" uuid NOT NULL,
        CONSTRAINT "PK_Favorites_tracks" PRIMARY KEY ("favoritesId", "tracksId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_FavoritesId_tracks" ON "favorites_tracks" ("favoritesId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_Favorites_tracksId" ON "favorites_tracks" ("tracksId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_albums_artistId" 
        FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_tracks_artistId" 
        FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_tracks_albumId" 
        FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48" 
        FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_660eecabb197df0e6b0835554f6" 
        FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_caee2f2437cd634201109549c20" 
        FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94" 
        FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_cdb702f7ae63243bc8ffda8e0aa" 
        FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_a68f39bdfc7688558ab5a2f3892" 
        FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_a68f39bdfc7688558ab5a2f3892"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_cdb702f7ae63243bc8ffda8e0aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_caee2f2437cd634201109549c20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_660eecabb197df0e6b0835554f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_tracks_albumId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_tracks_artistId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_albums_artistId`,
    );
    await queryRunner.query(`DROP INDEX "IDX_Favorites_tracksId"`);
    await queryRunner.query(`DROP INDEX "IDX_FavoritesId_tracks"`);
    await queryRunner.query(`DROP INDEX "IDX_Favorites_albumsId"`);
    await queryRunner.query(`DROP INDEX "IDX_FavoritesId_albums"`);
    await queryRunner.query(`DROP INDEX "IDX_Favorites_artistsId"`);
    await queryRunner.query(`DROP INDEX "IDX_FavoritesId_artists"`);
    await queryRunner.query(`DROP TABLE "favorites_artists"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
}
