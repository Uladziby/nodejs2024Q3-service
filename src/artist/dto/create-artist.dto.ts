import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ARTIST_MESSAGES } from 'src/utils/constants';

export class CreateArtistDto {
  @IsNotEmpty({ message: ARTIST_MESSAGES.name_empty })
  @IsString({ message: ARTIST_MESSAGES.name_string })
  name: string;

  @IsNotEmpty({ message: ARTIST_MESSAGES.grammy_boolean })
  @IsBoolean({ message: ARTIST_MESSAGES.grammy_boolean })
  grammy: boolean;
}
