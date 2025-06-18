import { Injectable } from '@nestjs/common';
import { TDbEntities } from 'src/database/database.interface';
import { DbEntities } from 'src/db/db.service';
import { AlbumEntity } from 'src/entity/album.entity';
import { ArtistEntity } from 'src/entity/artist.entity';
import { FavoriteEntity } from 'src/entity/favorite.entity';
import { TrackEntity } from 'src/entity/track.entity';
import { UserEntity } from 'src/entity/user.entity';

@Injectable()
export class DatabaseService {
  users: Array<UserEntity> = [];
  albums: Array<AlbumEntity> = [];
  artists: Array<ArtistEntity> = [];
  tracks: Array<TrackEntity> = [];
  favorites: FavoriteEntity;

  checkEntity(entityId: string, dbEntityType: DbEntities): boolean {
    const dbEntity: TDbEntities = this[dbEntityType];
    const existEntityId = dbEntity.find((entity) => entity.id === entityId);

    return existEntityId ? true : false;
  }
}
