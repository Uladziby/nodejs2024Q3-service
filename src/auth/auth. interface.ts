import { UserEntity } from 'src/entity/user.entity';

export interface JwtPayload {
  sub: UserEntity['id'];
  userId: UserEntity['id'];
  login: UserEntity['login'];
}
