import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album';

@Injectable()
export class AlbumService {
  getAlbum(): string {
    return 'Hello Album!';
  }
  getAll(): string {
    return 'All albums!';
  }

  getById(id: number): string {
    return `id: ${id}`;
  }

  create(createAlbumDto: CreateAlbumDto): string {
    return 'The album was created';
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `The album was updated ${id}`;
  }

  remove(id: number) {
    return `The album was removed ${id}`;
  }
}
