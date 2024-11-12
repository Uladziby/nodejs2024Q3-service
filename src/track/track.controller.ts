import { Controller, Get } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTrack(): string {
    return this.trackService.getTrack();
  }
}
