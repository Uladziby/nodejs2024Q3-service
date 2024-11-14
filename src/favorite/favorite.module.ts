import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { FavoriteService } from 'src/favorite/favorite.service';

@Module({
  imports: [DbModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
