import { UserType } from '../user/dto/user.interface';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/entity/user.entity';

export class FavoriteEntity implements UserType {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(user: Partial<UserEntity>) {
    this.login = user?.login;
    this.password = user?.password;
    this.version = 1;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
