import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { UserEntity, UserResponse } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  declare repository: Repository<UserEntity>;

  async getAll() {
    return this.repository.find();
  }

  async getById(id: string) {
    const userById = await this.repository.findOneBy({ id });

    if (!userById) {
      throw new NotFoundException(`User ${id} doesn't exist`);
    }

    return userById;
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = this.repository.findOne({
      where: { login: createUserDto.login },
    });

    if (existUser) {
      throw new HttpException(
        `User ${createUserDto.login} already exist!`,
        HttpStatus.CONFLICT,
      );
    }
    const newUser = new UserEntity(createUserDto as UserEntity);
    validate(newUser, { forbidUnknownValues: true });

    return new UserResponse(newUser);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userById = await this.getById(id);
    if (userById.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Old password does not match existing password',
        HttpStatus.FORBIDDEN,
      );
    }
    userById.password = updatePasswordDto.newPassword;
    userById.version = userById.version + 1;
    userById.updatedAt = new Date();

    await this.repository.save(userById);

    return new UserResponse(userById);
  }

  async remove(id: string) {
    const removedUser = await this.getById(id);

    await this.repository.delete(id);

    return removedUser;
  }
}
