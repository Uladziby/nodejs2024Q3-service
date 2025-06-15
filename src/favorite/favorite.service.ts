import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumType } from 'src/album/dto/album.interface';
import { ArtistType } from 'src/artist/dto/artist.interface';
import { DbService } from 'src/db/db.service';
import { TrackType } from 'src/track/dto/track.interface';

@Injectable()
export class FavoriteService {
  constructor(private db: DbService) {}

  getAll() {
    return this.db.favorites;
  }

  addTrackToFavs(id: string) {
    const track: TrackType = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        `The track ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isExistTrack = this.db.favorites.tracks.some(
      (track) => track.id === id,
    );
    if (isExistTrack) {
      throw new Error(`The track ${id} is in favorites`);
    }

    this.db.favorites.tracks.push(track);

    return track;
  }

  addAlbumToFavs(id: string) {
    const albumById: AlbumType = this.db.albums.find(
      (album) => album.id === id,
    );

    if (!albumById) {
      throw new HttpException(
        `The album with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isExistAlbum = this.db.favorites.albums.some(
      (album) => album.id === id,
    );
    if (isExistAlbum) {
      throw new Error(`The album ${id} is in favorites`);
    }

    this.db.favorites.albums.push(albumById);

    return albumById;
  }

  addArtistToFavs(id: string) {
    const artistById: ArtistType = this.db.artists.find(
      (artist) => artist.id === id,
    );

    if (!artistById) {
      throw new HttpException(
        `The artist ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isExistArtist = this.db.favorites.artists.some(
      (artist) => artist.id === id,
    );
    if (isExistArtist) {
      throw new Error(`The album ${id} exists in favorites`);
    }

    this.db.favorites.artists.push(artistById);

    return artistById;
  }

  removeTrackFromFavs(id: string) {
    const track = this.db.favorites.tracks.some((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`The track  ${id} not found`);
    }

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  removeAlbumFromFavs(id: string) {
    const album = this.db.favorites.albums.some((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`The album ${id} not found`);
    }

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }

  removeArtistFromFavs(id: string) {
    const artist = this.db.favorites.artists.some((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`The atist ${id} not found`);
    }

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
