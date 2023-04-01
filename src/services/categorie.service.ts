/* eslint-disable prettier/prettier */

import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLogDto } from 'src/dtos/LogDto';
import { Article } from 'src/models/artciles';
import { Categorie } from 'src/models/categories';
import { User } from 'src/models/user';
import { CreatecategorieParams } from 'src/utils/type';
import { Repository } from 'typeorm';
import { LogService } from './log.service';

@Injectable()
export class CategorieService {
  @Inject(LogService)
  private log: LogService;
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
    @InjectRepository(Article)
    private artcileRepository: Repository<Article>,
  ) {}

  async create(categorieParams: CreatecategorieParams) {
    try {
      const categoriepere = await this.categorieRepository.findOneBy({
        id: categorieParams.c_categoriePere,
      });
      const categorie = this.categorieRepository.create({
        ...categorieParams,
        categorie: categoriepere,
      });
      return this.categorieRepository.save(categorie);
    } catch (error) {
      // const newlog= new CreateLogDto()
      // newlog.action='Creation Categorie'
      // newlog.description=error
      // newlog.type=1
      // newlog.user=new User()
      // this.log.create(newlog)
      throw new HttpException('qsd', HttpStatus.BAD_REQUEST);
    }
  }

  async GetOne(id: number) {
    const categorie = await this.categorieRepository.findOne({
      where: { id: id },
      relations: [
        'suc_categories',
        'suc_categories.suc_categories',
        'suc_categories.suc_categories.suc_categories',
        'suc_categories.suc_categories.suc_categories.suc_categories',
        'suc_categories.suc_categories.suc_categories.suc_categories.suc_categories',
      ],
    });
    return categorie;
  }

  async GetAll() {
    const categorie = await this.categorieRepository.find({
      where: { c_active: true, c_categoriePere: 0 },
      relations: [
        'suc_categories',
        'suc_categories.suc_categories',
        'suc_categories.suc_categories.suc_categories',
        'suc_categories.suc_categories.suc_categories.suc_categories',
        'suc_categories.suc_categories.suc_categories.suc_categories.suc_categories',
      ],
    });
    return categorie;
  }

  async update(id: number, createcategorieParams: CreatecategorieParams) {
    const categorie = await this.categorieRepository.findOne({
      where: {
        id: id,
      },
      relations: ['article'],
    });
    if (!categorie) {
      throw new HttpException('Categorie introuvable', HttpStatus.BAD_REQUEST);
    }
    const categoriepere = await this.categorieRepository.findOneBy({
      id: createcategorieParams.c_categoriePere,
    });
    const categorieupdate = await this.categorieRepository.update(
      { id },
      { ...createcategorieParams, categorie: categoriepere },
    );
    return categorieupdate.affected == 0 ? false : true;
  }

  async delete(id: number) {
    const categorie = await this.categorieRepository.findOne({
      where: {
        id: id,
      },
      relations: ['article'],
    });
    if (categorie.article.length != 0) {
      console.log(categorie.article);
      throw new HttpException(
        'Cette categorie contient des produit',
        HttpStatus.BAD_REQUEST,
      );
    }
    const categoriedeleted = await this.categorieRepository.delete({ id: id });
    return categoriedeleted.affected == 0 ? false : true;
  }

  async desableEnable(id: number) {
    const categorie = await this.categorieRepository.findOneBy({ id: id });
    if (!categorie) {
      throw new HttpException('Categorie introuvable', HttpStatus.BAD_REQUEST);
    }
    const categoriedesable = await this.categorieRepository.update(
      { id },
      { c_active: !categorie.c_active },
    );
    await this.artcileRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        a_active: !categorie.id,
      })
      .where('categorie = :id', { id: id })
      .execute();
    return categoriedesable.affected == 0 ? false : true;
  }
}
