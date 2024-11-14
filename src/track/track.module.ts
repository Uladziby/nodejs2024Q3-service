import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [DbModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
