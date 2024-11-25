import { Module } from '@nestjs/common';
import { ArtistModule } from 'src/artist/artist.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { DbModule } from 'src/db/db.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    FavoriteModule,
    ArtistModule,
    AlbumModule,
    DbModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
