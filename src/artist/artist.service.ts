import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return ' all users!';
  }

  getById(id: number) {
    return `id: ${id}`;
  }

  create(createArtistDto: CreateArtistDto) {
    return ' new artist!';
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `updated ${id}`;
  }

  remove(id: number) {
    return `removed ${id}`;
  }
}
