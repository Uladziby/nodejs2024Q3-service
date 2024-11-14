import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  getAll() {
    return this.db.users;
  }

  getById(id: string) {
    const userById = this.db.users.find((user) => user.id === id);

    if (!userById) {
      throw new NotFoundException(`User with id ${id} not exist`);
    }

    return userById;
  }

  create(createUserDto: CreateUserDto) {
    const existUser = this.db.users.find(
      (user) => user.login === createUserDto.login,
    );
    if (existUser) {
      throw new HttpException(
        `User with login ${createUserDto.login} already exist!`,
        HttpStatus.CONFLICT,
      );
    }
    const newUser = new User(createUserDto);
    this.db.users.push(newUser);

    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userById = this.getById(id);
    if (userById.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Old password does not match existing password',
        HttpStatus.FORBIDDEN,
      );
    }
    userById.password = updatePasswordDto.newPassword;
    userById.version = userById.version + 1;
    userById.updatedAt = Date.now();

    return userById;
  }

  remove(id: string) {
    this.getById(id);

    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
