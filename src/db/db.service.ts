import { Injectable } from '@nestjs/common';
import { AlbumType } from 'src/album/dto/album.interface';
import { ArtistType } from 'src/artist/dto/artist.interface';
import { FavoriteType } from 'src/favorite/favorite.interface';
import { TrackType } from 'src/track/dto/track.interface';
import { UserType } from 'src/user/dto/user.interface';

export type TDbEntities = (AlbumType | ArtistType | TrackType | UserType)[];
export enum DbEntities {
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
  favorites: FavoriteType = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkEntity(entityId: string, dbEntityType: DbEntities): boolean {
    const dbEntity: TDbEntities = this[dbEntityType];
    const existEntityId = dbEntity.find((entity) => entity.id === entityId);

    return existEntityId ? true : false;
  }
}
