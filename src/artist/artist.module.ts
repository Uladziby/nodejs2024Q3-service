import { Module } from '@nestjs/common';
import { ArtistController } from 'src/artist/artist.controller';
import { ArtistService } from 'src/artist/artist.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
