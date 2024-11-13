import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password';

@Injectable()
export class UserService {
  getAll() {
    return ' all users!';
  }

  getById(id: number) {
    return ` id: ${id}`;
  }

  create(createUserDto: CreateUserDto) {
    return 'This EP creates a new user!';
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return ` id: ${id}`;
  }

  remove(id: number) {
    return ` id: ${id}`;
  }
}
