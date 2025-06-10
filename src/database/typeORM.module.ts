import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { AlbumEntity } from 'src/entity/album.entity';
import { ArtistEntity } from 'src/entity/artist.entity';
import { FavoriteEntity } from 'src/entity/favorite.entity';
import { TrackEntity } from 'src/entity/track.entity';
import { UserEntity } from 'src/entity/user.entity';
import 'dotenv/config';

const HOST =
  process.env.NODE_ENV === 'docker'
    ? process.env.POSTGRES_HOST_DOCKER
    : process.env.POSTGRES_HOST;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ' HOST',
      port: Number(env.POSTGRES_PORT),
      database: env.POSTGRES_DB_NAME,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      entities: [
        UserEntity,
        TrackEntity,
        AlbumEntity,
        ArtistEntity,
        FavoriteEntity,
      ],
      synchronize: false,
      logging: false,
    }),
  ],
})
export class TypeOrmOptionsModule {}
