/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from 'src/controllers/article.controller';
import { Article } from 'src/models/artciles';
import { ArticleCouleurs } from 'src/models/articleCouleurs';
import { Categorie } from 'src/models/categories';
import { FileUploead } from 'src/models/files';
import { Log } from 'src/models/Log';
import { User } from 'src/models/user';
import { ArticleService } from 'src/services/article.service';
import { LogModule } from './log.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/articles',
    }),
    TypeOrmModule.forFeature([
      User,
      Log,
      Article,
      Categorie,
      FileUploead,
      ArticleCouleurs,
    ]),
    LogModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
