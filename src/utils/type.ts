/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Article } from 'src/models/artciles';
import { Categorie } from './../models/categories';

export class CreatecategorieParams {
  @IsNotEmpty()
  c_desgination: string;
  c_desciption: string;
  c_icon: string;
  // si cette cartegorie appartient a une autre categotrie
  c_categoriePere: number;
}

export class CreateArticleParams {
  a_desgination: string;
  a_desciption: string;
  @IsNumber()
  a_prix: number;
  @IsNumber()
  a_tva: number;
  @IsNumber()
  a_remise: number;
  @IsNumber()
  a_qts: number;
  categorie: number;
  couleurs: Array<string>;
}
export class CreateArticleParamsWithoutColors {
  constructor(
    createArticleParams: CreateArticleParams,
    categorie: Categorie,
    a_code: string,
  ) {
    this.a_code = a_code;
    this.a_desgination = createArticleParams.a_desgination;
    this.a_desciption = createArticleParams.a_desciption;
    this.a_prix = createArticleParams.a_prix;
    this.a_tva = createArticleParams.a_tva;
    this.a_remise = createArticleParams.a_remise;
    this.a_qts = createArticleParams.a_qts;
    this.categorie = categorie;
  }
  a_code: string;
  a_desgination: string;
  a_desciption: string;
  @IsNumber()
  a_prix: number;
  @IsNumber()
  a_tva: number;
  @IsNumber()
  a_remise: number;
  @IsNumber()
  a_qts: number;
  categorie: Categorie;
}

export class ArticleCouleurParams {
  constructor(codecss: string, article: Article) {
    this.ac_codeCss = codecss;
    this.article = article;
  }
  ac_codeCss: string;
  article: Article;
}
export function getCode(code: string): string {
  let partieNumber = parseInt(code.substring(3, code.length));
  partieNumber++;
  let zero: string;
  zero = '';
  if (partieNumber < 10) {
    zero = 'ART0000';
  } else {
    if (partieNumber < 100) {
      zero = 'ART000';
    } else {
      if (partieNumber < 1000) {
        zero = 'ART00';
      } else {
        if (partieNumber < 10000) {
          zero = 'ART0';
        }
      }
    }
  }
  return zero + partieNumber;
}

export class CreateUserParams {
  fullName: string;
  email: string;
  role: string;
  adresse: string;
  tel: string;
  vip: boolean;
  password: string;
}
