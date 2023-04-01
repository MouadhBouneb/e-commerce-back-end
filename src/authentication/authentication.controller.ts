/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { CreateUserDto, LoginDto } from 'src/dtos/userDto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localauthentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { User } from 'src/models/user';
 
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthentificationService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }
 
  @HttpCode(200)
  @UsePipes(new ValidationPipe )
  // @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Body() login:LoginDto, @Res() response: Response) {
    const user: User = await this.authenticationService.getAuthenticatedUser(login.email,login.password);
    if(!user){
      throw new HttpException(
        'Email ou bien mot de passe invalide',
        HttpStatus.BAD_REQUEST,
      );
    }
    const cookie = this.authenticationService.getCookieWithJwtToken( user.id);
    response.setHeader('Set-Cookie', cookie);
     user.password = undefined;
    return  response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
