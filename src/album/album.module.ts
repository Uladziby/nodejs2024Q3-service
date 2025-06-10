import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';
import { ArtistModule } from 'src/artist/artist.module';
import { DbModule } from 'src/db/db.module';
import { AlbumEntity } from 'src/entity/album.entity';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    ArtistModule,
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
