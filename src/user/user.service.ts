import {
  ForbiddenException,
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
      throw new NotFoundException(`User with id ${id} not exist`);
    }
    return userById;
  }

  async getByLogin(login: UserEntity['login']) {
    const userByLogin = await this.repository.findOne({ where: { login } });

    return userByLogin;
  }

  async create(createUserDto: CreateUserDto) {
    await this.repository.findOne({
      where: { login: createUserDto.login },
    });
    const newUser = new UserEntity(createUserDto as UserEntity);
    validate(newUser, { forbidUnknownValues: true });
    await this.repository.save(newUser);
    return new UserResponse(newUser);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userById = await this.getById(id);

    if (!(await userById.checkPassword(updatePasswordDto.oldPassword))) {
      throw new ForbiddenException();
    }

    userById.password = updatePasswordDto.newPassword;
    userById.version = userById.version + 1;
    userById.updatedAt = new Date();
    await this.repository.save(userById);
    return new UserResponse(userById);
  }

  async remove(id: string) {
    const removedUser = await this.getById(id);
    await this.repository.remove(removedUser);
    return removedUser;
  }
}
