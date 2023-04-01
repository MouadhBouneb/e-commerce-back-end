/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  
  @IsNotEmpty()
  a_desgination: string;

  a_desciption: string;

  @IsNotEmpty()
  a_prix: number;

  @IsNotEmpty()
  a_tva: number;

  @IsNotEmpty()
  a_remise: number;

  @IsNotEmpty()
  a_qts: number;

  categorie: number;

  couleurs: Array<string>;
}

export class UpdateArticleDto {
  
  @IsNotEmpty()
  a_desgination: string;

  a_desciption: string;

  @IsNotEmpty()
  a_prix: number;

  @IsNotEmpty()
  a_tva: number;

  @IsNotEmpty()
  a_remise: number;

  @IsNotEmpty()
  a_qts: number;

  categorie: number;

  couleurs: Array<string>;
}


