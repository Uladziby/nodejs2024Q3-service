import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsOptional()
  @IsUUID('4', {
    message: 'The artistId must be a UUID v4',
    each: true,
  })
  artistId: string | null;

  @IsOptional()
  @IsUUID('4', {
    message: 'The albumId must be a UUID v4',
    each: true,
  })
  albumId: string | null;

  @IsOptional()
  @IsInt({ message: 'The duration must be an integer' })
  duration: number;
}
