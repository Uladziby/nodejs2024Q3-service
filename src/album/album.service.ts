import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album';
import { AlbumEntity } from 'src/entity/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  @InjectRepository(AlbumEntity)
  declare repository: Repository<AlbumEntity>;

  protected deleteEvent = new Subject<AlbumEntity['id']>();
  public delete$ = this.deleteEvent.asObservable();

  async getAll() {
    return this.repository.find();
  }

  async findOne(id: string): Promise<AlbumEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async getById(id: string) {
    const albumById = await this.repository.findOneBy({ id });

    if (!albumById) {
      throw new NotFoundException(`Album with id ${id} not exist`);
    }

    return albumById;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntity(createAlbumDto);
    await this.repository.save(newAlbum);

    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.getById(id);

    return this.repository.preload({ id, ...updateAlbumDto }).then((album) => {
      return album ? this.repository.save(album) : album;
    });
  }

  async remove(id: string) {
    await this.getById(id);

    return this.findOne(id).then(async (album) => {
      this.deleteEvent.next(id);
      return album ? !!(await this.repository.remove(album)) : false;
    });
  }
}
