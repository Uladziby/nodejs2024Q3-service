import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from './auth.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto, RefreshTokenDto, TokenDto } from 'src/auth/dto/auth.dto';

@Public()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    protected authService: AuthService,
    protected userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'User Sign Up' })
  @ApiResponse({ status: 201, description: 'Registered' })
  @ApiResponse({ status: 400, description: 'Invalid DTO' })
  async sign(@Body() createUserDto: CreateUserDto) {
    return (
      (await this.userService.getByLogin(createUserDto.login)) ||
      this.userService.create(createUserDto)
    );
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User Sign In' })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: 'Invalid DTO' })
  @ApiResponse({ status: 403, description: 'Wrong Credentials' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<TokenDto> {
    const user = await this.userService.getByLogin(loginUserDto.login);
    if (!user || !(await user.checkPassword(loginUserDto.password))) {
      throw new ForbiddenException();
    }

    return {
      accessToken: this.authService.generateToken(user),
      refreshToken: this.authService.generateRefreshToken(user),
    };
  }

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: 401,
      groups: ['unauthorized'],
    }),
  )
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 401, description: 'Invalid DTO' })
  @ApiResponse({ status: 403, description: 'Wrong Credentials' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenDto> {
    const id = this.authService.verifyToken(refreshTokenDto.refreshToken);

    if (id) {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new ForbiddenException();
      }
      this.authService.revokeToken(refreshTokenDto.refreshToken);

      return {
        accessToken: this.authService.generateToken(user),
        refreshToken: this.authService.generateRefreshToken(user),
      };
    }

    throw new ForbiddenException();
  }
}
