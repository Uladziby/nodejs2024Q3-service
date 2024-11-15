import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ALBUM_MESSAGES } from 'src/utils/constants';

export class CreateAlbumDto {
  @IsNotEmpty({ message: ALBUM_MESSAGES.name_empty })
  @IsString({ message: ALBUM_MESSAGES.name_string })
  name: string;

  @IsNotEmpty({ message: ALBUM_MESSAGES.name_empty })
  @IsInt({ message: ALBUM_MESSAGES.year_number })
  year: number;

  @IsOptional()
  @IsUUID('4', {
    message: ALBUM_MESSAGES.year_empty,
    each: true,
  })
  artistId: string | null;
}
