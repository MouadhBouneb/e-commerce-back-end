/* eslint-disable prettier/prettier */
import { UserController } from './../controllers/user.controller';
import { UserService } from './../services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Log } from 'src/models/Log';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
