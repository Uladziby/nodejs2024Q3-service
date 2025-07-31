import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackEntity } from 'src/entity/track.entity';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), ArtistModule, AlbumModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
