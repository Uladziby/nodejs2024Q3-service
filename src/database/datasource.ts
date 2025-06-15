import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { UserEntity } from 'src/entity/user.entity';
import { AlbumEntity } from 'src/entity/album.entity';
import { ArtistEntity } from 'src/entity/artist.entity';
import { FavoriteEntity } from 'src/entity/favorite.entity';
import { TrackEntity } from 'src/entity/track.entity';

const HOST =
  process.env.NODE_ENV === 'docker'
    ? process.env.POSTGRES_HOST_DOCKER
    : process.env.POSTGRES_HOST;

const options: DataSourceOptions = {
  type: 'postgres',
  host: HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB_NAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    UserEntity,
    TrackEntity,
    AlbumEntity,
    ArtistEntity,
    FavoriteEntity,
  ],
  logging: true,
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(options);
export default dataSource;
