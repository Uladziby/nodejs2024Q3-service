import { IsNotEmpty, IsString } from 'class-validator';
import { USER_MESSAGES } from 'src/utils/constants';

export class CreateUserDto {
  @IsNotEmpty({ message: USER_MESSAGES.login_empty })
  @IsString({ message: USER_MESSAGES.login_string })
  login: string;

  @IsNotEmpty({ message: USER_MESSAGES.password_empty })
  @IsString({ message: USER_MESSAGES.password_string })
  password: string;
}
