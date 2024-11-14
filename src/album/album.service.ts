import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumType } from 'src/album/dto/album.interface';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album';
import { DbService, Entites } from 'src/db/db.service';
import { AlbumEntity } from 'src/entity/album.entity';
import { TrackType } from 'src/track/dto/track.interface';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  getAll() {
    return this.db.albums;
  }

  getById(id: string) {
    const albumById = this.db.albums.find((album) => album.id === id);

    if (!albumById) {
      throw new NotFoundException(`Album with id ${id} not exist`);
    }

    return albumById;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const existArtist = this.db.checkEntity(
      createAlbumDto.artistId,
      Entites.ARTISTS,
    );

    if (!existArtist && createAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${createAlbumDto.artistId} not exist`,
      );
    }
    const album = new AlbumEntity(createAlbumDto);
    this.db.albums.push(album);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumById = this.getById(id);
    const existArtist = this.db.checkEntity(
      updateAlbumDto.artistId,
      Entites.ARTISTS,
    );
    if (!existArtist && updateAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${updateAlbumDto.artistId} not exist`,
      );
    }
    albumById.artistId = updateAlbumDto.artistId;
    albumById.name = updateAlbumDto.name;
    albumById.year = updateAlbumDto.year;

    return albumById;
  }

  remove(id: string) {
    this.getById(id);
    this.db.tracks.forEach((track: TrackType) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (album: AlbumType) => album.id !== id,
    );
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }
}
