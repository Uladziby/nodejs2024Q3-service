import { Exclude, Transform } from 'class-transformer';
import { UserType } from 'src/user/dto/user.interface';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HashService } from '../common/hash.service';

@Entity({ name: 'user' })
export class UserEntity implements UserType {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await HashService.hash(this.password);
  }

  async checkPassword(password) {
    return await HashService.compare(password, this.password);
  }

  @Column()
  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @ApiProperty({ writeOnly: true })
  password: string;

  @VersionColumn()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ minimum: 1 })
  version: number;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  createdAt: Date;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  updatedAt: Date;

  constructor(user: Partial<UserEntity>) {
    this.login = user?.login;
    this.password = user?.password;
    this.version = 1;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export class UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.login = user.login;
    this.version = user.version;
    this.createdAt = +user.createdAt;
    this.updatedAt = +user.updatedAt;
  }
}
