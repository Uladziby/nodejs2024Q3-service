import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { AlbumEntity } from './src/entity/album.entity';
import { ArtistEntity } from './src/entity/artist.entity';
import { FavoriteEntity } from './src/entity/favorite.entity';
import { TrackEntity } from './src/entity/track.entity';
import { UserEntity } from './src/entity/user.entity';

const HOST =
  process.env.NODE_ENV === 'docker'
    ? process.env.POSTGRES_HOST_DOCKER
    : process.env.POSTGRES_HOST;

config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;
const DB_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

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
  url: DB_URL,
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(options);
export default dataSource;
