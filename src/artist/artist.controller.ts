import { Controller, Get } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtist(): string {
    return this.artistService.getArtist();
  }
}
