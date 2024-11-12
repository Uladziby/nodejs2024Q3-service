import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

@Injectable()
export class AlbumService {
  getAlbum(): string {
    return 'Hello Album!';
  }
  getAll(): string {
    return 'This EP return all albums!';
  }

  getById(id: number): string {
    return `This EP returns album with id: ${id}`;
  }

  create(createAlbumDto: CreateAlbumDto): string {
    return 'this ep create service';
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This EP updates album with id: ${id}`;
  }

  remove(id: number) {
    return `This EP removes album with id: ${id}`;
  }
}
