import { Module } from '@nestjs/common';
import { ArtistController } from 'src/artist/artist.controller';
import { ArtistService } from 'src/artist/artist.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DbModule],
})
export class ArtistModule {}
