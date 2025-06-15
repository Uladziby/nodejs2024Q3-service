import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album';

@Injectable()
export class AlbumService {
  getAll(): string {
    return 'This EP return all albums!';
  }

  getById(id: number): string {
    return `This EP returns album with id: ${id}`;
  }

  create(createAlbumDto: CreateAlbumDto): string {
    return 'This EP creates a new album';
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This EP updates album with id: ${id}`;
  }

  remove(id: number) {
    return `This EP removes album with id: ${id}`;
  }
}
