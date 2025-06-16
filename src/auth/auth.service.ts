import { UserEntity } from 'src/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/auth. interface';

@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: UserService,
    protected readonly jwtService: JwtService,
  ) {}

  verifyToken(token: string): UserEntity['id'] | null {
    try {
      const payload = this.jwtService.verify(token);
      return payload.sub;
    } catch (error) {
      return null;
    }
  }

  generateToken(user: UserEntity): string {
    return this.jwtService.sign(this.generatePayload(user), {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '60m',
    });
  }

  generateRefreshToken(user: UserEntity): string {
    return this.jwtService.sign(this.generatePayload(user), {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '1h',
    });
  }

  private generatePayload(user: UserEntity): JwtPayload {
    return { sub: user.id, userId: user.id, login: user.login };
  }

  revokeToken(_: string) {
    return _;
    //  ToDo
  }
}
