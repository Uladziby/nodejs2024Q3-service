import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/abstarct/abstarct.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ArtistEntity } from 'src/entity/artist.entity';
import { AlbumEntity } from 'src/entity/album.entity';
import { TrackEntity } from 'src/entity/track.entity';

@Entity({ name: 'favorites' })
export class FavoriteEntity extends AbstractEntity<FavoriteEntity> {
  @Column('uuid')
  @IsUUID(4)
  @IsOptional()
  @Exclude()
  userId: UserEntity['id'];

  @ManyToMany(() => ArtistEntity, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [ArtistEntity] })
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [AlbumEntity] })
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [TrackEntity] })
  tracks: TrackEntity[];
}
