/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLogDto } from 'src/dtos/LogDto';
import { Log } from 'src/models/Log';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}

  create(logdto: CreateLogDto) {
    const newLog = this.logRepository.create({
      ...logdto,
    });
    return this.logRepository.save(newLog);
  }
}
