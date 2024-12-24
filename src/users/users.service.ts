import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '@/users/users.entity';
import { CreateUsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<any>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where({ isDeleted: 0 })
      .getMany();
  }

  async findOne(account: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOne({
      where: [
        {
          phoneNumber: account,
          isDeleted: 0,
        },
        {
          email: account,
          isDeleted: 0,
        },
      ],
    });
  }

  async getUserInfoByPhoneNumber(
    phoneNumber: string,
  ): Promise<UsersEntity | null> {
    return await this.usersRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  async getUserInfoByUserId(id: Number | string): Promise<Omit<UsersEntity, 'password' | 'isDeleted'> | null> {
    const userInfo: UsersEntity | null = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (userInfo) {
      const { password, isDeleted, ...reset } = userInfo;
      return reset;
    } else {
      throw '该用户不存在';
    }
  }

  async create(data: CreateUsersDto): Promise<any> {
    const userInfo = await this.getUserInfoByPhoneNumber(data.phoneNumber);
    if (!userInfo) {
      this.usersRepository
        .insert(data)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          throw new HttpException(
            { message: '账号注册失败！' },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    } else {
      throw new HttpException(
        { message: '该手机号已被使用！' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(data): Promise<any> {
    const result = this.usersRepository.update(data.id, data);
    return result;
  }

  async delete(data): Promise<any> {
    const result = this.usersRepository.update(data.id, {
      isDeleted: 1,
    });
    return result;
  }
}
