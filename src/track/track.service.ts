import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService, Entites } from 'src/db/db.service';
import { TrackEntity } from 'src/entity/track.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { TrackType } from 'src/track/dto/track.interface';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  getAll() {
    return this.db.tracks;
  }

  getById(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not exist`);
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const isExistArtist = this.db.checkEntity(
      createTrackDto.artistId,
      Entites.ARTISTS,
    );
    if (!isExistArtist && createTrackDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${createTrackDto.artistId} not exist`,
      );
    }

    const existAlbumId = this.db.checkEntity(
      createTrackDto.albumId,
      Entites.ALBUMS,
    );
    if (!existAlbumId && createTrackDto.albumId) {
      throw new NotFoundException(
        `Album with id ${createTrackDto.albumId} not exist`,
      );
    }

    const track = new TrackEntity(createTrackDto);

    this.db.tracks.push(track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackById = this.getById(id);
    const existArtistId = this.db.checkEntity(
      updateTrackDto.artistId,
      Entites.ARTISTS,
    );
    if (!existArtistId && updateTrackDto.artistId) {
      throw new NotFoundException(
        `the artist  ${updateTrackDto.artistId}does not exist`,
      );
    }

    const existAlbumId = this.db.checkEntity(
      updateTrackDto.albumId,
      Entites.ALBUMS,
    );
    if (!existAlbumId && updateTrackDto.albumId) {
      throw new NotFoundException(
        `The album ${updateTrackDto.albumId} not exist`,
      );
    }

    trackById.artistId = updateTrackDto.artistId;
    trackById.albumId = updateTrackDto.albumId;
    trackById.name = updateTrackDto.name;
    trackById.duration = updateTrackDto.duration;

    return trackById;
  }

  remove(id: string) {
    const trackById = this.getById(id);

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (track: TrackType) => track.id !== trackById.id,
    );

    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
  }
}
