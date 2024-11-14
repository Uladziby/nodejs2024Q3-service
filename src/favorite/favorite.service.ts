import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoriteService {
  addTrackToFavs(id: string) {
    throw new Error('Method not implemented.');
  }
  addAlbumToFavs(id: string) {
    throw new Error('Method not implemented.');
  }
  addArtistToFavs(id: string) {
    throw new Error('Method not implemented.');
  }
  removeTrackFromFavs(id: string) {
    throw new Error('Method not implemented.');
  }
  removeAlbumFromFavs(id: string) {
    throw new Error('Method not implemented.');
  }
  removeArtistFromFavs(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private db: DbService) {}

  getAll() {
    return this.db.favorites;
  }
}
