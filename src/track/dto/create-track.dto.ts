import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty({ message: 'The Name cannot be empty.' })
  @IsString({ message: 'The Name must be a string.' })
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

  @IsNotEmpty({ message: 'The duration cannot be empty' })
  @IsInt({ message: 'The duration must be an integer' })
  duration: number;
}
