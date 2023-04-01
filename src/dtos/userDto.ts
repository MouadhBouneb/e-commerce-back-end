/* eslint-disable prettier/prettier */

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  fullName: string;

  @MinLength(20)
  @MaxLength(150)
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(150)
  @IsString()
  role: string;

  @MinLength(3)
  @MaxLength(150)
  @IsString()
  adresse: string;

  @MinLength(8)
  @MaxLength(15)
  @IsString()
  tel: string;
  @IsBoolean()
  vip: boolean;
  @MinLength(8)
  password: string;
}

export class LoginDto {

  @MinLength(10)
  @MaxLength(150)
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
