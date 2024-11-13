import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'The Grammy can be true or false.' })
  grammy: boolean;
}
