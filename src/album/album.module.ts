import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumEntity } from 'src/entity/album.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [ArtistModule, TypeOrmModule.forFeature([AlbumEntity])],
  exports: [AlbumService],
})
export class AlbumModule {}
