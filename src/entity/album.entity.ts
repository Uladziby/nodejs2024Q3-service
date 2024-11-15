import { v4 as uuidV4 } from 'uuid';
import { AlbumType } from '../album/dto/album.interface';

export class AlbumEntity implements AlbumType {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ name, year, artistId }: Partial<AlbumEntity>) {
    this.id = uuidV4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
