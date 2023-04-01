/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CreatecategorieDto, UpdateCategorieDto } from 'src/dtos/CategorieDto';
import { CategorieService } from 'src/services/categorie.service';

@Controller('categories')
export class CategorieController {
  constructor(private categorieService: CategorieService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createCategorie(@Body() createcategorieDto: CreatecategorieDto) {
    return this.categorieService.create(createcategorieDto);
  }
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getCategorie() {
    // TODO with sub category
    return this.categorieService.GetAll();
  }
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getCategorieByID(@Param('id', ParseIntPipe) id: number) {
    // TODO with sub category
    return this.categorieService.GetOne(id);
  }

  @Put('/desable_enable/:id')
  @UseGuards(JwtAuthenticationGuard)
  desableEnable(@Param('id', ParseIntPipe) id: number) {
    return this.categorieService.desableEnable(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Body() updateCategorieDto: UpdateCategorieDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categorieService.update(id, updateCategorieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  deleteCategorieByID(@Param('id', ParseIntPipe) id: number) {
    return this.categorieService.delete(id);
  }
}
