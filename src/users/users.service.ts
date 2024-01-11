import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { UsersEntity } from '@/users/users.entity';
import { CreateUsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<any>,
  ) { }

  async findOne(account: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({
      where: [{
        phoneNumber: account,
        isDelete: 0,
      }, {
        email: account,
        isDelete: 0,
      }],
    });
  }

  async getUserTotal(): Promise<number> {
    try {
      const query = this.usersRepository
        .createQueryBuilder('UsersEntity')
        .where({
          isDelete: 0,
        });
      const total: number = await query.getCount();
      return total;
    } catch (err) {
      return err;
    }
  }

  async getUserInfoOnPhoneNumber(
    phoneNumber: string,
  ): Promise<UsersEntity | null> {
    return await this.usersRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  async getUserInfoByUserId(params): Promise<UsersEntity | null> {
    try {
      console.log('getUserInfoByUserId', params.id);
      const result = await this.usersRepository.findOne({
        where: {
          id: params.id,
        },
      });
      console.log('getUserInfoByUserId', result);
      if (result) {
        const userInfo: UsersEntity = result;
        Reflect.deleteProperty(userInfo, 'password');
        Reflect.deleteProperty(userInfo, 'isDelete');
        userInfo.createTime = dayjs(userInfo.createTime).format(
          'YYYY年MM月DD日 HH:mm:ss',
        );
        userInfo.updateTime = dayjs(userInfo.updateTime).format(
          'YYYY年MM月DD日 HH:mm:ss',
        );
        return result;
      } else {
        throw '该用户不存在';
      }
    } catch (err) {
      console.log('getUserInfoByUserId', err);
      return err;
    }
  }

  async create(data: CreateUsersDto): Promise<any> {
    const user = await this.getUserInfoOnPhoneNumber(data.phoneNumber);
    if (!user) {
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
    try {
      const result = this.usersRepository.update(data.id, data);
      return result;
    } catch (err) {
      return err;
    }
  }

  async delete(data): Promise<any> {
    try {
      const result = this.usersRepository.update(data.id, {
        isDelete: 1,
      });
      return result;
    } catch (err) {
      return err;
    }
  }
}
