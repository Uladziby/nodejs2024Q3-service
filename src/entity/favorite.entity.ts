import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from '../abstract/abstract.entity';
import { UserEntity } from '../entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ArtistEntity } from '../entity/artist.entity';
import { AlbumEntity } from '../entity/album.entity';
import { TrackEntity } from '../entity/track.entity';

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
