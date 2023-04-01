import { AuthentificationModule } from './authentication/authentification.module';
import { UserModule } from './modules/user.module';
import { ArticleModule } from './modules/article.module';
import { LogModule } from './modules/log.module';
import { CategorieModule } from './modules/categorie.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './models/artciles';
import { ArticleCouleurs } from './models/articleCouleurs';
import { Categorie } from './models/categories';
import { FileUploead } from './models/files';
import { User } from './models/user';
import { Log } from './models/Log';
import { Codes } from './models/codes';
import { Document } from './models/documents';
import { DocumentDetail } from './models/documentDetail';
import { UserVotes } from './models/userVote';
import { Parametre } from './models/parametres';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    // AuthentificationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mouadh123**',
      database: 'ecommerce',
      entities: [
        Article,
        ArticleCouleurs,
        Categorie,
        FileUploead,
        User,
        Log,
        Codes,
        Document,
        DocumentDetail,
        UserVotes,
        Parametre,
      ],
      synchronize: true,
      // migrationsRun: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UserModule,
    CategorieModule,
    ArticleModule,
    LogModule,
    AuthentificationModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
