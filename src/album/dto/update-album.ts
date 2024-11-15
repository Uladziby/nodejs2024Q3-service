import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsOptional()
  @IsInt({ message: 'The year must be an integer' })
  year: number;

  @IsOptional()
  @IsUUID('4', {
    message: 'ArtistId must be a UUID v4',
    each: true,
  })
  artistId: string | null;
}
