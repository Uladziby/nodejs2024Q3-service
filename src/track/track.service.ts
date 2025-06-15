import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

@Injectable()
export class TrackService {
  getTrack(): string {
    return 'Hello Track';
  }
  getAll(): string {
    return 'This EP return all tracks!';
  }

  getById(id: number): string {
    return `This EP return track with id: ${id}`;
  }

  create(createTrackDto: CreateTrackDto): string {
    return 'This EP creates a ne track';
  }

  update(id: number, updateTrackto: UpdateTrackDto) {
    return `This EP update track with id: ${id}`;
  }

  remove(id: number) {
    return `This EP remove track with id: ${id}`;
  }
}
