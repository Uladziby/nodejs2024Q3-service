import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  getArtist(): string {
    return 'This is the AlbumService';
  }
}
