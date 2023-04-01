/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/utils/type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async GetOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }
  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
  async GetAll() {
    const users = await this.userRepository.find();
    return users;
  }
  async create(userParams: CreateUserParams) {
    try {
      const verifemail = await this.userRepository.findOneBy({
        email: userParams.email,
      });
      if (verifemail) {
        console.log(verifemail)
        throw new HttpException('Email Utilisé', HttpStatus.BAD_REQUEST);
      }

      const user = this.userRepository.create({
        ...userParams,
      });
      await this.userRepository.save(user);
      return user;    
    } catch (error) {
      // const newlog= new CreateLogDto()
      // newlog.action='Creation Categorie'
      // newlog.description=error
      // newlog.type=1
      // newlog.user=new User()
      // this.log.create(newlog)
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: number, userParams: CreateUserParams) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new HttpException('user introuvable', HttpStatus.BAD_REQUEST);
      }
      const verifemail = await this.userRepository
        .createQueryBuilder('user')
        .where('email = :email', { email: userParams.email })
        .andWhere('id != :id', { id: id })
        .getOne();
      if (verifemail) {
        throw new HttpException('Email Utilisé', HttpStatus.BAD_REQUEST);
      }
      const userupdate = await this.userRepository.update(
        { id },
        { ...userParams },
      );
      return userupdate.affected == 0 ? false : true;
    } catch (error) {
      console.log(error);
      throw new HttpException('qsd', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const userdeleted = await this.userRepository.delete({ id: id });
      return userdeleted.affected == 0 ? false : true;
    } catch (error) {
      console.log(error);
      throw new HttpException('qsd', HttpStatus.BAD_REQUEST);
    }
  }
}
