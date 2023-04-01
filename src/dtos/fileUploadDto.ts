/* eslint-disable prettier/prettier */

import { Article } from 'src/models/artciles';

export class FileDto {
  constructor(
    article: Article,
    path: string,
    typeFile: string,
    extension: string,
    f_name: string,
  ) {
    this.article = article;
    this.f_path = path;
    this.f_typeFile = typeFile;
    this.f_extension = extension;
    this.f_name = f_name;
  }
  f_name: string;
  f_path: string;
  f_typeFile: string;
  f_extension: string;
  article: Article;
}
