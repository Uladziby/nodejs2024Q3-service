import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { DbService } from 'src/db/db.service';
import { ArtistEntity } from 'src/entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  getAll() {
    return this.db.artists;
  }

  getById(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(`Artist doesnot exist`);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = new ArtistEntity(createArtistDto);
    this.db.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistById = this.getById(id);
    artistById.name = updateArtistDto.name;
    artistById.grammy = updateArtistDto.grammy;

    return artistById;
  }

  remove(id: string) {
    this.getById(id);

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artist) => artist.id !== id,
    );

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }
}
