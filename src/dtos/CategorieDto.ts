/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreatecategorieDto {
  @IsNotEmpty()
  c_desgination: string;

  c_desciption: string;

  c_icon: string;

  // si cette cartegorie appartient a une autre categotrie
  c_categoriePere: number;
}
export class UpdateCategorieDto {
  @IsNotEmpty()
  c_desgination: string;

  c_desciption: string;

  c_icon: string;

  // si cette cartegorie appartient a une autre categotrie
  c_categoriePere: number;
}
