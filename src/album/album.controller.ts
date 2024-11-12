import { Controller, Get } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';

@Controller('artist')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getArtist(): string {
    return this.albumService.getArtist();
  }
}
