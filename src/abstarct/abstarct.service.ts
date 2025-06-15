import { AbstractEntity } from 'src/abstarct/abstarct.entity';
import { Repository } from 'typeorm';

export abstract class AbstractService<T extends AbstractEntity> {
  constructor(protected repository: Repository<T>) {}
}
