import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Subject } from 'rxjs';
import { DbService, Entites } from 'src/db/db.service';
import { TrackEntity } from 'src/entity/track.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { TrackType } from 'src/track/dto/track.interface';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class TrackService {
  @InjectRepository(TrackEntity)
  declare repository: Repository<TrackEntity>;

  protected deleteEvent = new Subject<TrackEntity['id']>();
  public delete$ = this.deleteEvent.asObservable();

  async getAll(): Promise<TrackEntity[] | null> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<TrackEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async getById(id: string): Promise<TrackEntity | null> {
    const trackById = await this.repository.findOneBy({ id });
    if (!trackById) {
      throw new NotFoundException(`Track with id ${id} not exist`);
    }

    return trackById;
  }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = new TrackEntity(createTrackDto as TrackEntity);

    validate(newTrack, { forbidUnknownValues: true });

    return this.repository.save(newTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.getById(id);

    return this.repository
      .preload({ id, ...updateTrackDto } as DeepPartial<TrackEntity>)
      .then((track) => {
        return track ? this.repository.save(track) : track;
      });
  }

  async remove(id: string) {
    await this.getById(id);

    return this.findOne(id).then(async (track) => {
      this.deleteEvent.next(id);
      return track ? !!(await this.repository.remove(track)) : false;
    });
  }
}
