import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  getTrack(): string {
    return 'This is the track service';
  }
}
