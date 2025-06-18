import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
