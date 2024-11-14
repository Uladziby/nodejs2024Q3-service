import { v4 as uuidV4 } from 'uuid';
import { Exclude } from 'class-transformer';
import { UserType } from 'src/user/dto/user.interface';

export class User implements UserType {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor({ login, password }: Partial<User>) {
    this.id = uuidV4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
