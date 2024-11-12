import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getArtist(): string {
    return 'This is the artist service';
  }
}
