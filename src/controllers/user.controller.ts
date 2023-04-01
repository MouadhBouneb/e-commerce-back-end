/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/userDto';
import { UserService } from './../services/user.service';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getUsers() {
    return this.userService.GetAll();
  }
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getUserByID(@Param('id', ParseIntPipe) id: number) {
    return this.userService.GetOne(id);
  }
  @Get(':email')
  @UseGuards(JwtAuthenticationGuard)
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new ValidationPipe())
  updateUser(
    @Body() userDto: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, userDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  deleteUserByID(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
