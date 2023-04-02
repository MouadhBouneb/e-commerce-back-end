/* eslint-disable prettier/prettier */

import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDto } from 'src/dtos/fileUploadDto';
import { Article } from 'src/models/artciles';
import { ArticleCouleurs } from 'src/models/articleCouleurs';
import { Categorie } from 'src/models/categories';
import { FileUploead } from 'src/models/files';
import {
  ArticleCouleurParams,
  CreateArticleParams,
  CreateArticleParamsWithoutColors,
  getCode,
} from 'src/utils/type';
import { Repository } from 'typeorm';
import { LogService } from './log.service';
import * as fs from 'fs';
@Injectable()
export class ArticleService {
  @Inject(LogService)
  private log: LogService;
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
    @InjectRepository(Article)
    private artcileRepository: Repository<Article>,
    @InjectRepository(ArticleCouleurs)
    private articleCouleursRepository: Repository<ArticleCouleurs>,
    @InjectRepository(FileUploead)
    private FileRepository: Repository<FileUploead>,
  ) {}
  async GetOne(id: number) {
    const article = await this.artcileRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'couleurs',
        'documentDetails',
        'images',
        'votes',
        'categorie',
      ],
    });
    return article;
  }
  async GetAll() {
    const articles = await this.artcileRepository.find({
      where: { a_active: true },
      relations: [
        'couleurs',
        'documentDetails',
        'images',
        'votes',
        'categorie',
      ],
    });
    return articles;
  }
  async create(
    articleParams: CreateArticleParams,
    files: Array<Express.Multer.File>,
  ) {
    try {
      console.log(articleParams);

      const categorie = await this.categorieRepository.findOne({
        where: {
          id: articleParams.categorie,
        },
        relations: ['suc_categories'],
      });
      if (categorie?.suc_categories?.length > 0) {
        throw new HttpException(
          'cette categorie ne peux pas contient des articles',
          HttpStatus.BAD_REQUEST,
        );
      }
      const lastArticle = await this.artcileRepository.findOne({
        where: {
          /* You can leave this empty or add your own conditions */
        },
        order: { id: 'DESC' },
      });

      const createArticleConstructor = new CreateArticleParamsWithoutColors(
        articleParams,
        categorie ? categorie : null,
        lastArticle ? getCode(lastArticle.a_code) : 'ART00001',
      );
      const article = this.artcileRepository.create({
        ...createArticleConstructor,
      });
      await this.artcileRepository.save(article);
      articleParams.couleurs.map(async (couleur) => {
        const articlecouleur = this.articleCouleursRepository.create(
          new ArticleCouleurParams(couleur, article),
        );
        await this.articleCouleursRepository.save(articlecouleur);
      });
      if (files.length != 0) {
        files.forEach(async (file) => {
          const filecreate = this.FileRepository.create(
            new FileDto(
              article,
              file.path,
              file.mimetype,
              file.originalname.split('.').pop(),
              file.filename,
            ),
          );
          await this.FileRepository.save(filecreate);
          console.log(file.path);
        });
      }
      return article;
    } catch (error) {
      // const newlog= new CreateLogDto()
      // newlog.action='Creation Categorie'
      // newlog.description=error
      // newlog.type=1
      // newlog.user=new User()
      // this.log.create(newlog)
      console.log(error);
      if (error) {
        throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: number, articleParams: CreateArticleParams) {
    try {
      const article = await this.artcileRepository.findOneBy({ id: id });
      if (!article) {
        throw new HttpException('Article introuvable', HttpStatus.BAD_REQUEST);
      }
      /********************************update couleurs****************************/
      try {
        await this.articleCouleursRepository
          .createQueryBuilder()
          .delete()
          .where('articleId = :id', { id: id })
          .execute();
        articleParams.couleurs.map(async (couleur) => {
          const articlecouleur = this.articleCouleursRepository.create(
            new ArticleCouleurParams(couleur, article),
          );
          await this.articleCouleursRepository.save(articlecouleur);
        });
      } catch (error) {
        throw new HttpException('erreur : ' + error, HttpStatus.BAD_REQUEST);
      }

      /********************************update couleurs****************************/

      const categorie = await this.categorieRepository.findOneBy({
        id: articleParams.categorie,
      });
      const createArticleConstructor = new CreateArticleParamsWithoutColors(
        articleParams,
        categorie ? categorie : null,
        article.a_code,
      );
      const articleupdate = await this.artcileRepository.update(
        { id },
        { ...createArticleConstructor },
      );
      return articleupdate.affected == 0 ? false : true;
    } catch (error) {
      console.log(error);
      throw new HttpException('qsd', HttpStatus.BAD_REQUEST);
    }
  }
  async desableEnable(id: number) {
    const article = await this.artcileRepository.findOneBy({ id: id });
    if (!article) {
      throw new HttpException('Article introuvable', HttpStatus.BAD_REQUEST);
    }
    const articledesable = await this.artcileRepository.update(
      { id },
      { a_active: !article.a_active },
    );

    return articledesable.affected == 0 ? false : true;
  }
  async delete(id: number) {
    const article = await this.artcileRepository.findOne({
      where: {
        id: id,
      },
      relations: ['images'],
    });
    if (article?.images?.length > 0) {
      article.images.forEach(async (element) => {
        await fs.unlink('uploads/articles/' + element.f_name, (err) => {
          if (err) {
            console.error(err);
            return err;
          }
        });
      });
    }
    const articledeleted = await this.artcileRepository.delete({ id: id });
    return articledeleted.affected == 0 ? false : true;
  }

  async deleteImage( idImage: number) {
    const file = await this.FileRepository.findOneBy({ id: idImage });
    await fs.unlink('uploads/articles/' + file.f_name, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    const filedeleted = await this.FileRepository.delete({ id: idImage });

    return filedeleted.affected == 0 ? false : true;
  }

  async addImage(id: number, files: Array<Express.Multer.File>) {
    const article = await this.artcileRepository.findOneBy({ id: id });

    if (files.length != 0) {
      files.forEach(async (file) => {
        const filecreate = this.FileRepository.create(
          new FileDto(
            article,
            file.path,
            file.mimetype,
            file.originalname.split('.').pop(),
            file.filename,
          ),
        );
        await this.FileRepository.save(filecreate);
      });
    }

    return true;
  }
}
