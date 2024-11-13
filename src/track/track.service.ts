import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

@Injectable()
export class TrackService {
  getAll(): string {
    return 'all tracks!';
  }

  getById(id: number): string {
    return `track ${id}`;
  }

  create(createTrackDto: CreateTrackDto): string {
    return 'created new track!';
  }

  update(id: number, updateTrackto: UpdateTrackDto) {
    return `the track was updated id: ${id}`;
  }

  remove(id: number) {
    return `the track was removed  id: ${id}`;
  }
}
