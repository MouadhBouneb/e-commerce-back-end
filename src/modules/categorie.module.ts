/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieController } from 'src/controllers/categorie.controller';
import { Article } from 'src/models/artciles';
import { Categorie } from 'src/models/categories';
import { Log } from 'src/models/Log';
import { User } from 'src/models/user';
import { CategorieService } from 'src/services/categorie.service';
import { LogModule } from './log.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log, Categorie,Article]),LogModule],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}
