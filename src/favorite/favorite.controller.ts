import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { FavoriteService } from 'src/favorite/favorite.service';

@Controller('favs')
export class FavoriteController {
  protected blank_user: UserEntity['id'] =
    'd323327d-cea8-4f42-8730-5221222361de';
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getAll() {
    return this.favoriteService.getAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addTrackToFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addAlbumToFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addArtistToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  removeTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeTrackFromFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  removeAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeAlbumFromFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  removeArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeArtistFromFavs(id);
  }
}
