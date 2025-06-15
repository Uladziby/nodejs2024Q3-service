import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  getFavorite(): string {
    return 'Hello Favorite!';
  }
  getAll() {
    return 'This EP return all all favorite records!';
  }

  getById(id: number) {
    return `This EP returns artist with id: ${id}`;
  }

  addTrackToFavs(id: number) {
    return `This EP add the track with ${id} to the favorites!`;
  }

  addAlbumToFavs(id: number) {
    return `This EP add the album with ${id} to the favorites!`;
  }

  addArtistToFavs(id: number) {
    return `This EP add the artist with ${id} to the favorites!`;
  }

  removeTrackFromFavs(id: number) {
    return `This EP remove the track with ${id} from  the favorites!`;
  }

  removeAlbumFromFavs(id: number) {
    return `This EP remove the album with ${id} from the favorites!`;
  }

  removeArtistFromFavs(id: number) {
    return `This EP remove the artist with ${id} from the favorites!`;
  }
}
