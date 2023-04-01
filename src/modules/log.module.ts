/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/models/Log';
import { User } from 'src/models/user';
import { LogService } from 'src/services/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log])],
  controllers: [],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
