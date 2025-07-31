import { v4 as uuidV4 } from 'uuid';
import { TrackType } from '../track/dto/track.interface';

export class TrackEntity implements TrackType {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor({ name, artistId, albumId, duration }: Partial<TrackEntity>) {
    this.id = uuidV4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
