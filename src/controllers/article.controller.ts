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
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CreateArticleDto, UpdateArticleDto } from 'src/dtos/ArticleDto';
import { ArticleService } from 'src/services/article.service';
import { storageArticle } from './../utils/utilFunction';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new ValidationPipe )
  @UseInterceptors(
    FilesInterceptor(
      'files', // name of the field being passed
      6,
      { storage: storageArticle },
    ),
  )
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.articleService.create(createArticleDto, files);
  }

  @Post('addimages/:id')
  @UseGuards(JwtAuthenticationGuard)
  @UsePipes(new ValidationPipe )
  @UseInterceptors(
    FilesInterceptor(
      'files', // name of the field being passed
      6,
      { storage: storageArticle },
    ),
  )
  addImage(
    @Param('id', ParseIntPipe) id: number,
     @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.articleService.addImage(id, files);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getArticle() {
    return this.articleService.GetAll();
  }
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getArticleByID(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.GetOne(id);
  }

  @Put('/desable_enable/:id')
  @UseGuards(JwtAuthenticationGuard)
  desableEnable(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.desableEnable(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id', ParseIntPipe) id: number,
  @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id,updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  deleteArticleByID(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.delete(id);
  }

  
  @Delete('/image/:id/:idImage')
  @UseGuards(JwtAuthenticationGuard)
  deleteImageByID(@Param('id', ParseIntPipe) id: number,@Param('idImage', ParseIntPipe) idImage: number) {
    return this.articleService.deleteImage(id,idImage);
  }
}
