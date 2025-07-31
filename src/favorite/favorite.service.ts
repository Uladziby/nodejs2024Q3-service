import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstarct/abstarct.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoriteEntity } from 'src/entity/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class FavoriteService extends AbstractService<FavoriteEntity> {
  protected services: {
    artists: ArtistService;
    albums: AlbumService;
    tracks: TrackService;
  };
  constructor(
    @InjectRepository(FavoriteEntity) repository: Repository<FavoriteEntity>,
    artistService: ArtistService,
    albumService: AlbumService,
    trackService: TrackService,
  ) {
    super(repository);
    this.services = {
      artists: artistService,
      albums: albumService,
      tracks: trackService,
    };
  }

  create(createDto: Partial<FavoriteEntity>) {
    const entity = new FavoriteEntity({
      artists: [],
      albums: [],
      tracks: [],
      ...createDto,
    });
    validate(entity, { forbidUnknownValues: true });

    return this.repository.save(entity);
  }

  async getFavsByUser(
    userId: FavoriteEntity['userId'],
  ): Promise<FavoriteEntity> {
    return (
      (await this.repository.findOne({ where: { userId } })) ||
      (await this.create({ userId }))
    );
  }

  async addTrackToFavs(favs: FavoriteEntity, id: string) {
    const trackById = await this.services.tracks.findOne(id);

    if (!trackById) {
      throw new HttpException(
        `The track with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favs.tracks) {
      favs.tracks = [];
    }

    const alreadyTrackInFavs = favs.tracks.some((track) => track.id === id);
    if (alreadyTrackInFavs) {
      throw new Error(`The track with ID ${id} is already in favorites`);
    }

    favs.tracks.push(trackById);

    return this.repository.save(favs);
  }

  async addAlbumToFavs(favs: FavoriteEntity, id: string) {
    const albumById = await this.services.albums.findOne(id);

    if (!albumById) {
      throw new HttpException(
        `The album with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favs.albums) {
      favs.albums = [];
    }

    const alreadyAlbumInFavs = favs.albums.some((album) => album.id === id);
    if (alreadyAlbumInFavs) {
      throw new Error(`The album with ID ${id} is already in favorites`);
    }

    favs.albums.push(albumById);

    return this.repository.save(favs);
  }

  async addArtistToFavs(favs: FavoriteEntity, id: string) {
    const artistById = await this.services.artists.findOne(id);

    if (!artistById) {
      throw new HttpException(
        `The artist with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favs.artists) {
      favs.artists = [];
    }

    const alreadyArtistInFavs = favs.artists.some((artist) => artist.id === id);
    if (alreadyArtistInFavs) {
      throw new Error(`The album with ID ${id} is already in favorites`);
    }

    favs.artists.push(artistById);

    return this.repository.save(favs);
  }

  async removeTrackFromFavs(favs: FavoriteEntity, id: string) {
    const index = favs.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `The track with ID ${id} not found in favorites`,
      );
    }

    favs.tracks.splice(index, 1);

    return this.repository.save(favs);
  }

  async removeAlbumFromFavs(favs: FavoriteEntity, id: string) {
    const index = favs.albums.findIndex((album) => album.id === id);

    if (index !== -1) {
      throw new NotFoundException(`Album with ID ${id} not found in favorites`);
    }

    favs.albums.splice(index, 1);

    return this.repository.save(favs);
  }

  async removeArtistFromFavs(favs: FavoriteEntity, id: string) {
    const index = favs.artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      throw new NotFoundException(`Artist with ID ${id} not found in favorite`);
    }

    favs.artists.splice(index, 1);

    return this.repository.save(favs);
  }
}
