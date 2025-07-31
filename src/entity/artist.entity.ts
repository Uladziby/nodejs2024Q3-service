import { ArtistType } from 'src/artist/dto/artist.interface';
import { v4 as uuidV4 } from 'uuid';

export class ArtistEntity implements ArtistType {
  id: string;
  name: string;
  grammy: boolean;

  constructor({ name, grammy }: Partial<ArtistEntity>) {
    this.id = uuidV4();
    this.name = name;
    this.grammy = grammy;
  }
}
