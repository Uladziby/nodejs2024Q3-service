import { Injectable } from '@nestjs/common';
import { AlbumType } from 'src/album/dto/album.interface';
import { ArtistType } from 'src/artist/dto/artist.interface';
import { FavoriteType } from 'src/favorite/favorite.interface';
import { TrackType } from 'src/track/dto/track.interface';
import { UserType } from 'src/user/dto/user.interface';

export type DbEntities = (AlbumType | ArtistType | TrackType | UserType)[];
export enum Entites {
  ALBUMS = 'albums',
  ARTISTS = 'artists',
  TRACKS = 'tracks',
  USERS = 'users',
}

@Injectable()
export class DbService {
  users: Array<UserType> = [];
  albums: Array<AlbumType> = [];
  artists: Array<ArtistType> = [];
  tracks: Array<TrackType> = [];
  favorites: FavoriteType;

  checkEntity(entityId: string, dbEntityType: Entites): boolean {
    const dbEntity: DbEntities = this[dbEntityType];
    const existEntityId = dbEntity.find((entity) => entity.id === entityId);

    return existEntityId ? true : false;
  }
}
