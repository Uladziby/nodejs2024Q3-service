import { Module } from '@nestjs/common';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
