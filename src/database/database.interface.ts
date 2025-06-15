import { AlbumEntity } from 'src/entity/album.entity';
import { ArtistEntity } from 'src/entity/artist.entity';
import { TrackEntity } from 'src/entity/track.entity';
import { UserEntity } from 'src/entity/user.entity';

export const enum DbEntities {
  ALBUMS = 'albums',
  ARTISTS = 'artists',
  TRACKS = 'tracks',
  USERS = 'users',
}

export type TDbEntities = (
  | AlbumEntity
  | ArtistEntity
  | TrackEntity
  | UserEntity
)[];
