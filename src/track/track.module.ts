import { Module } from '@nestjs/common';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
