import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { DbService } from 'src/db/db.service';
import { ArtistEntity } from 'src/entity/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  @InjectRepository(ArtistEntity)
  declare repository: Repository<ArtistEntity>;

  protected deleteEvent = new Subject<ArtistEntity['id']>();
  public delete$ = this.deleteEvent.asObservable();

  constructor(private db: DbService) {}

  getAll() {
    return this.repository.find();
  }

  async findOne(id: string): Promise<ArtistEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async getById(id: string) {
    const artistById = await this.repository.findOneBy({ id });

    if (!artistById) {
      throw new NotFoundException(`Artist with id ${id} not exist`);
    }

    return artistById;
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new ArtistEntity(createArtistDto);
    await this.repository.save(newArtist);

    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.getById(id);

    return this.repository
      .preload({ id, ...updateArtistDto })
      .then((artist) => {
        return artist ? this.repository.save(artist) : artist;
      });
  }

  async remove(id: string): Promise<boolean> {
    await this.getById(id);

    return this.repository.findOneBy({ id }).then(async (artist) => {
      this.deleteEvent.next(id);
      return artist ? !!(await this.repository.remove(artist)) : false;
    });
  }
}
