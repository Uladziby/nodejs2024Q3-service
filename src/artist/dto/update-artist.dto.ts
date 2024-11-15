import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ARTIST_MESSAGES } from 'src/utils/constants';

export class UpdateArtistDto {
  @IsOptional()
  @IsString({ message: ARTIST_MESSAGES.name_string })
  name: string;

  @IsOptional()
  @IsBoolean({ message: ARTIST_MESSAGES.grammy_boolean })
  grammy: boolean;
}
