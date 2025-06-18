import { AlbumType } from 'src/album/dto/album.interface';
import { ArtistType } from 'src/artist/dto/artist.interface';
import { TrackType } from 'src/track/dto/track.interface';

export type FavoriteType = {
  artists: ArtistType[];
  albums: AlbumType[];
  tracks: TrackType[];
};
